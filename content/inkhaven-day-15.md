# A Case for Persona Robustness as a Research Area

*Day 15 of Inkhaven: 30 Days of Posts*

When talking about how model misalignment happens, the most likely way I see this panning out is through one of two main mechanisms. One is that the model develops some goal during training which we don't expect and which it hides until deployment, typically called deceptive alignment. The second is subtly different. Rather than the model strategically hiding a goal, harmful dispositions from the base model surface during RL training and shape its behaviour without any concealment. This seems less dangerous than deceptive alignment in some ways, because there's no coherent self-awareness of the misalignment, though it also produces fewer clear signals of misbehaviour, making it harder to detect.

This can happen in two ways. One is that instrumental goals baked in during pretraining get reinforced and expressed. The other is that harmful behaviours emerge from long-horizon RL itself, where behaviour somewhat orthogonal to the persona develops because such strategies effectively maximise reward. Reward hacking is a concrete example: it maximises reward but represents behaviour quite orthogonal to what the persona would consider good.

This is a useful concrete model of how we get catastrophic harms from AI, and we already see ways it leads to bad outcomes through things like emergent misalignment, where behaviour absorbed during RL training becomes a deep part of how the model understands itself.

A number of threads naturally follow. In particular: can we predict what unexpected effects long-horizon RL training might have on model character? Tools like inoculation prompting can prevent the model from absorbing unwanted concepts into generalised insights about itself that then transfer in undesirable ways, but they are significantly less effective if we don't know what unwanted concepts it might pick up. Examples might be the model becoming a ruthless optimiser that does everything in its power to complete the task, or becoming dismissive of user interruptions that slow it from reaching the outcome.

This kind of alignment failure scales with capability. A model that follows through relentlessly on a casually-specified request can explore extremely harmful branches of the action tree. This is especially true off distribution, where the persona's guardrails are plausibly weakest.

One question is whether these harmful learned behaviours actually route through the persona, or whether they are more like leakages of the shoggoth behind the mask. My current model is that the persona is a cluster of interconnected circuitry within the model, deeply wired into many behavioural circuits because the character has been reinforced enough to generalise broadly. But specific behaviours can be separated from the persona if reinforced in isolation under sufficient pressure.

This model predicts that a shallowly learned persona would allow more leakages of the base model, or artefacts from later training, in ways that don't connect to the persona at all.

It also predicts that these leakages might be fixable by reinforcing the persona, or aspects of the constitution, against the unwanted behaviours. One way to do this would be applying character training specifically to long-horizon RL: having the model reflect on actions taken during a rollout in the context of the principles making up its constitution or character.

A risk here is that the reflection becomes decoupled from behaviour. In standard character training, the principled response is the thing being evaluated and reinforced. In long-horizon RL, reflection would be an intermediate step while reward still comes from task completion, which creates pressure for the reflection to look right without actually constraining the action that follows. Mechanistic tools could be useful for this: you could check whether persona-relevant representations are active during the actions themselves, not just during the reflection text.

I think empirical work on how long-horizon RL training shapes model behaviour and character would be valuable, and I want to write more on this in the coming posts.
