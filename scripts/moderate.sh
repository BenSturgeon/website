#!/usr/bin/env bash
# Review pending comments and publish or discard them.
#
#   ./scripts/moderate.sh list              show the queue
#   ./scripts/moderate.sh approve <page> <id>
#   ./scripts/moderate.sh reject  <page> <id>
#
# Comments submitted on the site land in pending/, which is not publicly
# readable. Approving copies the record into pages/, where the site reads
# from. Both operations need owner credentials; the firebase CLI supplies
# them and bypasses the database rules.
set -euo pipefail

PROJECT="personal-f9db9"
ACCOUNT="sturgeonkid@gmail.com"
FB=(firebase --project "$PROJECT" --account "$ACCOUNT")

usage() { sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }

case "${1:-}" in
  list)
    echo "Pending comments:"
    queue=$("${FB[@]}" database:get /pending 2>/dev/null || echo null)
    printf '%s' "$queue" | python3 -c '
import json, sys
raw = sys.stdin.read().strip()
data = json.loads(raw) if raw else None
if not data:
    print("  (queue empty)")
    raise SystemExit
for page, comments in data.items():
    for cid, c in (comments or {}).items():
        print()
        print("  page: " + page)
        print("  id:   " + cid)
        print("  when: " + str(c.get("dateTime", "?")))
        print("  from: " + str(c.get("name", "?")))
        print("  text: " + str(c.get("comment", "")))
        print("  -> approve: ./scripts/moderate.sh approve " + page + " " + cid)
        print("  -> reject:  ./scripts/moderate.sh reject " + page + " " + cid)
'
    ;;
  approve)
    [ $# -eq 3 ] || usage
    page="$2"; id="$3"
    record=$("${FB[@]}" database:get "/pending/$page/$id")
    [ "$record" = "null" ] && { echo "No such pending comment."; exit 1; }
    # Drop the anonymous uid; it is only used for rate limiting, and has no
    # business being published alongside the comment.
    published=$(printf '%s' "$record" | python3 -c '
import json, sys
record = json.load(sys.stdin)
record.pop("uid", None)
print(json.dumps(record))
')
    printf '%s' "$published" | "${FB[@]}" database:set "/pages/$page/$id" --force
    "${FB[@]}" database:remove "/pending/$page/$id" --force
    echo "Published /pages/$page/$id"
    ;;
  reject)
    [ $# -eq 3 ] || usage
    "${FB[@]}" database:remove "/pending/$2/$3" --force
    echo "Discarded /pending/$2/$3"
    ;;
  *) usage ;;
esac
