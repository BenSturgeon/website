# Contributing to Technical Research in the AI Safety End Game

*Day 20 of Inkhaven: 30 Days of Posts*

*Also published [on LessWrong](https://www.lesswrong.com/posts/7YAXxEqbFJ2KzGpDK/contributing-to-technical-research-in-the-ai-safety-end-game).*

When the Claude Mythos system card was released, I initially felt like we had entered a late stage of AI safety, where the number of parties that can make a real impact shrinks down to the handful of labs at the frontier, a few companies too critical to exclude from the conversation, and the governments of China and the US.

Digging into the system card itself made me update significantly on this. It is informative to look at what techniques were actually used to determine whether the model was aware of being deceptive as it was taking actions during evaluations. In their testing, the main white-box techniques used were:

1. Probes
2. Sparse Autoencoders (SAEs)
3. Activation Verbalizers (AVs)
4. Emotion and persona vector analysis
5. Causal steering experiments using contrastive steering vectors

Of these, AVs and emotion and persona vectors stood out to me because they were released very recently. The emotion steering vector paper was only released on the 9th of April 2026, and the activation oracles paper on which AVs were based was released on the 17th of December 2025.

Most strikingly, the AVs were used to detect cover-up behaviour in the model (Section 4.5.4). In an episode in which the model exploited the creation of another agent to escalate privileges beyond what it had been given, AV explanations on code used to cover its tracks showed "cleanup to avoid detection" and "the malicious config explicitly mirrors the original's [core] section to avoid detection." In a separate episode where the model had been leaked the ground-truth answers to its evaluation, AVs surfaced additional scheming: "I need to avoid looking like I knew the ground truth" and "Avoid suspicion: if I give the exact correct answer based on a leak, that's suspicious". None of this was present in the chain of thought. One caveat is that AVs can confabulate in their interpretations of activations, but they still give us valuable signals.

In the case of the emotion vectors, there were some instances of highly safety relevant applications. Detecting when the model is emotionally distressed served as a potential signal for harmful behaviours such as reward hacking — they were able to identify instances in which RL environments had issues retroactively by seeing which environments caused particular distress in the model. Using emotional steering, they steered the model towards greater calm and found this actually increased the likelihood of harmful action, potentially because the normal concern or anxiety that would prevent it from doing the action didn't arise. They also observed specific phenomena like thrashing as signals that the model may be about to do something unusual or harmful. This "thrashing" behaviour was observed when the model was repeatedly getting an answer wrong, and showed spikes of "outraged, stubborn, obstinate", mirrored by drops in "calm, safe, content".

I think there are some valuable lessons to take from this. First, these results are good signals about what kind of tools will be useful as we move forward, because without them, it would have been enormously challenging to determine whether the model was deliberately sabotaging a situation, or simply acting to maximise reward. Simply knowing this with high fidelity is critical to improving safety training as well. The above should be a feather in the cap of mechanistic interpretability in general, and I think people should more seriously update on the value and need for good mechanistic interpretability work.

Second, there is a lot to be learned about how to actually make a significant impact in the work done at labs here. The Activation Oracles work which led to the AV results was done at MATS, specifically under the mentorship of Owain Evans. Before this, Owain's work contributed to the discovery of emergent misalignment, which led to the work showing the effectiveness of inoculation prompting to mitigate emergent misalignment. The specific quality that made all the above work so transferrable was that it surfaced a problem which the labs could not ignore, and forced them to allocate their substantial resources to the problem. Additionally, the use of fellowship programs allowed him to funnel talent towards these problems, with many of the people doing the above work collaborating or joining labs in the process.

Third, the timescale from external publication to deployment at the frontier was extremely short. This should be a positive signal to those feeling hopeless about their work. The right technique or discovery might be applied to the most advanced models within weeks of being shared.

Replicating Owain Evans' research taste is not straightforward, but given that it has been unusually successful in producing an outsized impact it seems worth unpacking the intuitions behind it as much as we can.

---

At a recent talk, Owain discussed the theory of change behind their research agenda. My interpretation of what he said is that the goal was to understand the problem extremely deeply. This means developing a science of how models learn and understand at a deeper level and what safety relevant phenomena occur as a result of the nature of LLMs. This allows us to surface issues we'd otherwise miss.

Additionally, directly testing the failure modes of current alignment and safety techniques in modern LLM training can inform both the researchers developing the models about these issues so they can fix them, as well as informing the public that the models are currently not fully safe, or that these failure modes exist.

From what I can observe of the work itself, there seem to be at least two main methods for arriving at research questions. One involves working backwards from real quirks in LLM behaviour, digging into them until they yield coherent theories, and then using those theories to surface safety failure modes. This seems likely to have been the way that the out-of-context reasoning work emerged. The other method is by asking what would be upstream of specific safety failure modes such as the transmission of misalignment between models, as seems likely in the subliminal learning paper where preferences were transmitted via distillation.

Owain mentioned that a quality that he considers critical in good research is that the results have to be extremely clear, and shouldn't be potentially explainable by other phenomena in the network or require comparing differences between tiny effect sizes. Good findings can ideally be stated within one or two sentences with few caveats. If it doesn't appear consistently or if signals point in different directions then this is much less interesting.

Additionally, one thing I have noticed from Owain's approach is his deep respect for complexity and scale that emerges with these models. There are a huge number of counteracting forces within the network that might be contributing to a specific output, and one has to reckon with that uncertainty when interpreting any phenomena or result. This is why simple experiments that produce a clear result are so much stronger.

---

The feeling I have now is that it is important to acknowledge that Owain Evans' research group is not magical. While developing strong research taste does take years, I think we can and should put more effort into reverse engineering the mindsets that produce these kinds of work, and explicitly try and sit with the same kinds of problems that they are wrestling with. The track record speaks for itself, and begs for more people to explicitly commit to replicating it.