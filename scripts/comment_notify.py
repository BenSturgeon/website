#!/usr/bin/env python3
"""Email a digest when new comments land in the moderation queue.

Comments submitted on the site go to pending/ in the Realtime Database,
which is not publicly readable, so this needs admin credentials. Firebase
is on the Spark plan (no billing), so Cloud Functions are unavailable and
this runs as a cron job instead.

Required env vars:
  GOOGLE_APPLICATION_CREDENTIALS  path to a service account JSON key
  GMAIL_ADDRESS                   sender, also the recipient
  GMAIL_APP_PASSWORD              Gmail app password
Optional:
  NOTIFY_STATE_FILE               seen-ids file (default ~/.comment_notify_seen)

Exits quietly when the queue is empty, so it is safe to run often.
"""
import json
import os
import smtplib
import sys
import urllib.request
from email.message import EmailMessage
from pathlib import Path

DB = "https://personal-f9db9-default-rtdb.europe-west1.firebasedatabase.app"
SCOPES = [
    "https://www.googleapis.com/auth/firebase.database",
    "https://www.googleapis.com/auth/userinfo.email",
]
STATE = Path(os.environ.get("NOTIFY_STATE_FILE", Path.home() / ".comment_notify_seen"))


def access_token():
    from google.auth.transport.requests import Request
    from google.oauth2 import service_account

    key = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not key:
        sys.exit("GOOGLE_APPLICATION_CREDENTIALS is not set")
    creds = service_account.Credentials.from_service_account_file(key, scopes=SCOPES)
    creds.refresh(Request())
    return creds.token


def fetch_pending(token):
    url = f"{DB}/pending.json?access_token={token}"
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.loads(r.read().decode()) or {}


def seen_ids():
    return set(STATE.read_text().split()) if STATE.exists() else set()


def send(new):
    body = [f"{len(new)} new comment(s) awaiting review.\n"]
    for page, cid, c in new:
        body += [
            f"page: {page}",
            f"from: {c.get('name', '?')}",
            f"when: {c.get('dateTime', '?')}",
            "",
            c.get("comment", ""),
            "",
            f"approve: ./scripts/moderate.sh approve {page} {cid}",
            f"reject:  ./scripts/moderate.sh reject {page} {cid}",
            "-" * 50,
        ]

    msg = EmailMessage()
    msg["Subject"] = f"{len(new)} new comment(s) on benjaminsturgeon.com"
    msg["From"] = os.environ["GMAIL_ADDRESS"]
    msg["To"] = os.environ["GMAIL_ADDRESS"]
    msg.set_content("\n".join(body))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
        s.login(os.environ["GMAIL_ADDRESS"], os.environ["GMAIL_APP_PASSWORD"])
        s.send_message(msg)


def main():
    pending = fetch_pending(access_token())
    already = seen_ids()

    new = [
        (page, cid, c)
        for page, comments in pending.items()
        for cid, c in (comments or {}).items()
        if cid not in already
    ]
    if not new:
        return

    send(new)
    STATE.write_text("\n".join(already | {cid for _, cid, _ in new}))
    print(f"notified about {len(new)} comment(s)")


if __name__ == "__main__":
    main()
