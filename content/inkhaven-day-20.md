# Being in the AI Safety End Game

*Day 20 of Inkhaven: 30 Days of Posts*

Written quickly during Inkhaven.

With the release of Claude Mythos, it feels like we are approaching the end-game of AI safety, where the number of parties that can make a real impact shrinks down to the handful of labs at the frontier, a few companies too critical to exclude from the conversation, and the governments of China and the US.

Given this, it feels really hard to figure out how to actually make a difference on the problem of AI safety. Many research agendas have expected payoffs years down the line, or have unclear mechanisms regarding how they will actually impact what the model is doing.

However, this feeling may actually be misleading. In the Mythos system card, it is informative to look at what techniques were actually used to determine whether the model was aware of being deceptive as it was taking actions during evaluations. In their testing, the main white-box techniques used were:

1. Probes
2. Sparse Autoencoders (SAEs)
3. Activation Verbalizers (AVs)
4. Emotion and persona vector analysis
5. Causal steering experiments using contrastive steering vectors

Of these, AVs and emotion and persona vectors were developed relatively recently, with the emotion steering vector paper only being released on the 9th of April 2026, and the activation oracles paper on which AVs were based being released on the 17th of December 2025.

These techniques are not perfect, but they do give us highly load-bearing information about potential dangers that the models pose. Most strikingly, the activation verbalizers were used to detect cover-up behaviour in the model (Section 4.5.4). In an episode in which the model exploited the creation of another agent to escalate privileges beyond what it had been given, AV explanations on code used to cover its tracks showed "cleanup to avoid detection" and "the malicious config explicitly mirrors the original's [core] section to avoid detection."

In the ground-truth-leak episode, AVs surfaced additional scheming: "I need to avoid looking like I knew the ground truth" and "Avoid suspicion: if I give the exact correct answer based on a leak, that's suspicious". All of these were not present in the chain of thought.

One caveat is that AVs can confabulate in their interpretations of activations, but they still give us valuable signals.

In the case of the emotion vectors, there were some instances of highly safety relevant applications:

- Detecting when the model is emotionally distressed as a potential signal for harmful behaviours such as reward hacking.
    - In the system card they do not claim it was used preventatively, but they do say they were able to identify instances in which RL environments had issues retroactively by seeing which environments caused particular distress in the model.
- Using emotional steering to investigate specific failure modes in the model
    - In the case of the system card, they steered the model towards greater calm, and found this actually increased the likelihood of harmful action, potentially because the normal concern or anxiety that would prevent it from doing the action didn't arise.
- Observing specific phenomena like thrashing as signals that the model may be about to do something unusual or harmful
    - This "thrashing" behaviour was observed when the model was repeatedly getting an answer wrong, and showed spikes of "outraged, stubborn, obstinate", mirrored by drops in "calm, safe, content".

I think there are some valuable lessons to take from this. Firstly, these results are good signals about what kind of tools will be useful as we move forward, because without them, it would have been enormously challenging to determine whether the model was deliberately sabotaging a situation, or simply acting to maximise reward. Simply knowing this with high fidelity is critical to improving safety training as well.

The above should be a feather in the cap of mechanistic interpretability in general, and I think people should more seriously update on the value and need for good mechanistic interpretability work.

Secondly, there is a lot to be learned about how to actually make a significant impact in the work done at labs here. The Activation Oracles work which led to the AV results was done at MATS, specifically under the mentorship of Owain Evans. Before this, Owain's work contributed to the discovery of emergent misalignment, which led to the work showing the effectiveness of inoculation prompting to mitigate emergent misalignment. The specific quality that made all the above work so transferrable was that it surfaced a problem which the labs could not ignore, and forced them to allocate their substantial resources to the problem. Additionally, the use of fellowship programs allowed him to funnel talent towards these problems, with many of the people doing the above work collaborating or joining labs in the process.

Thirdly, the timescale from external publication to deployment at the frontier was extremely short. This should be a positive signal to those feeling hopeless about their work. The right technique or discovery might be applied to the most advanced models within weeks of being shared.
