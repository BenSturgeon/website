# How Does an Agent with Multiple Goals Choose a Target?

*This post summarises the key findings from my master's thesis at the University of Cape Town, supervised by Jonathan Shock. The full thesis PDF is available [here](https://github.com/BenSturgeon/RL_interpretability_masters/blob/main/notes/paper_files/main.pdf). Code is available [here](https://github.com/BenSturgeon/activation-multiplexing-maze-agent).*

---

**TLDR:** We investigated how a maze-solving RL agent (not a transformer model) internally represents and switches between multiple sequential goals. The headline finding is that the network uses *spatial gating through negative activations* to mark regions of interest, and doesn't have significant channel specialisation into different targets. We find it's possible to use a simple uniform offset to channel activations to completely redirect the agent's targeting behaviour. We confirm that the lack of channel specialisation is a genuine property by observing that even when using SAEs we do not observe specific channels being responsible for specific entities. Perhaps most notably, the key mechanistic insight came from doing simple analysis of how the mean activations across all channels changed, over the course of a rollout, indicating that patterns of activation intensity can be valuable tools when doing mechanistic interpretability.

---

## Background and motivation

This work builds on [Understanding and Controlling a Maze-Solving Policy Network](https://arxiv.org/abs/2310.08043) by Mini et al., which identified "cheese channels" in a Procgen Maze agent that could be individually ablated to retarget the network. That work led to the subsequent discovery of activation steering being effective in LLMs as well by [Turner et al.](https://arxiv.org/abs/2308.10248).

We wanted to extend this to a setting which involved having multiple targets that the agent would need to choose between, so that we could study the mechanism by which target selection occurs. The Procgen Heist environment requires the agent to collect up to three keys (blue, green, red) in a fixed order to open corresponding locks before reaching a gem.

Initially we had the goal of studying how the agent selects between these targets, and in practice the answer was less clean than we expected: rather than dynamically comparing targets, the network has a strong bias towards the blue-green-red-gem ordering, deeply embedded in the activation structure. This preference is dominant (~93% blue-first) but is not absolute, and the encoding turns out to be surprisingly redirectable.

![A simple level with no keys or locks. The agent just navigates to the gem.](/thesis_figures/heist_env_simple_example.png)
*A simple level with no keys or locks. The agent just navigates to the gem.*

![A complex Heist level with all three key-lock pairs.](/thesis_figures/heist_environment_example.png)
*A complex Heist level with all three key-lock pairs. The agent must collect the blue, green, and red keys in order to unlock corresponding doors before reaching the gem.*

We felt that based on the insights derived from [Understanding and Controlling a Maze-Solving Policy Network](https://arxiv.org/abs/2310.08043) that the approach of deeply analysing a single environment and single model architecture could still yield valuable insights about deep learning despite it not being immediately clear that it would replicate. This lack of replication is still a limitation of this work, and the most critical target for future work.

## The model

We trained a reduced [IMPALA](https://arxiv.org/abs/1802.01561) CNN (5 convolutional layers instead of 15, following [Hilton et al. 2020](https://distill.pub/2020/understanding-rl-vision/)) with PPO on the Heist environment. The simpler architecture gave us a narrower surface area to analyse, and was still able to master the environment despite having fewer parameters.

![The compressed CNN architecture used in this work.](/thesis_figures/conv_net_diagram.png)
*The compressed CNN architecture used in this work.*

In our training setup we used unlimited procedurally generated environments rather than the standard 200-500 fixed levels, without which the compressed architecture would not converge to a successful policy.

The primary model was trained for approximately 800 million environment steps.

## Finding 1: Shared channels encode all entities via activation magnitude

Our first major experiment used a controlled "parallel rollout" design. We created a T-junction shaped maze with the agent at the base, then ran the same policy rollout four times, swapping only the entity placed at the target location (in this work "entity" refers to one of the blue key, green key, red key, or gem) while keeping the agent's actions identical.

![Illustration of the parallel rollout methodology.](/thesis_figures/entity_trajectories_grid.png)
*Illustration of the parallel rollout methodology. Each row shows the same trajectory but with a different entity at the target location.*

By analysing the mean activations across different channels we observed a surprising phenomenon: there were consistent differences in activation levels depending on the entity at the end of the maze. Rather than observing specific channels having high activations for specific entities, we found shared channels where activation magnitude shifts depending on the entity.

![Mean activation trajectories for channels with highest inter-entity variance in conv4a.](/thesis_figures/raw_trajectories_35k_conv4a_highest_variance.png)
*Mean activation trajectories for channels with highest inter-entity variance in conv4a. Each subplot shows a single channel, with coloured lines for the four parallel rollouts. The parallel, vertically-separated trajectories show that target identity is encoded in activation magnitude, not channel identity.*

To determine whether the patterns of activations were similar despite activation strength differences we calculated the correlations between entity trajectories across rollouts. We found that the correlation in conv3a averaged 0.956, and conv4a averaged 0.931. The trajectories move in parallel, just at different vertical offsets, clearly indicating that the encoding strategy involves shared channels where activation levels shift systematically rather than specialised channels for specific entities.

![Violin plots of correlations of average activations across rollouts.](/thesis_figures/violin_35k_simple.png)
*Here we calculate the correlations of average activations taken from specific channels across the course of whole rollouts, and then represent those as violin plots. The consistently high correlations show that the activation patterns are almost exactly the same across entities, just shifted in magnitude.*

## Finding 2: A flat offset to activations completely redirects the agent

This was probably the most surprising result. If activation magnitude encodes target identity, could we simply shift all activations by a constant value to change which entity the agent pursues?

![The cross maze used for offset steering experiments.](/thesis_figures/expanded_cross_maze_single.png)
*The cross maze used for offset steering experiments. Entity positions within each arm were randomised across trials.*

We created a four-armed "cross maze" with each entity in a different arm, then swept across offset values applied uniformly to all channels in a layer. To be very explicit about what this means: every neuron in every channel in a given layer would be uniformly increased or decreased by a single scalar value.

This turned out to be remarkably effective at redirecting the agent to a different goal, when a wide variety of other steering efforts were vastly less effective at achieving such precise control, including activation steering towards or away from a given entity as performed in [Understanding and Controlling a Maze-Solving Policy Network](https://arxiv.org/abs/2310.08043).

![Conv4a activation offset steering results.](/thesis_figures/offset_sweep_conv4a_expanded_checkpoint_35001_full_range.png)
*Conv4a activation offset steering results. At baseline (offset 0), the agent collects the blue key 93% of the time. Positive offsets shift it to green key targeting (94% at offset +4.8). Negative offsets shift towards red key (52% at -5.8). The agent maintains navigational competence throughout.*

At baseline, the agent collects the blue key 93% of the time (consistent with its trained sequential preference). At positive offsets, the agent switches to targeting the green key, peaking at 94% at offset +4.8. At negative offsets, we observe peak red key collection of 52% at offset -5.8. Rates of not collecting any entity increase at the extremes, but overall collection remains fairly high, meaning important navigational capabilities continue to operate.

This works across all convolutional layers. Conv2a showed particularly fine-grained control, with offsets of just +/-0.3 sufficient for reliable steering, and also demonstrating steering towards the gem and the green key. That said, this steering is somewhat unprincipled in that it is difficult to know in advance which values will produce control towards the various entities.

![Conv2a offset steering with fine-grained control.](/thesis_figures/offset_sweep_conv2a_expanded_checkpoint_35001_-3to3_step0.03.png)
*Conv2a offset steering with fine-grained control. Red key steering peaks at 75% at offset +0.30. There is also a surprising surge in gem collection (12.2%) at offset +0.40.*

Surprisingly, conv1a showed the best gem steering at 50%, far exceeding later layers (conv2a: 12%, conv4a: 3%). This suggests that interventions early in the network, before target integration occurs, can bypass the learned sequential preference entirely.

## Finding 3: Spatial gating through negative activations

The offset steering result raised the question: *why* does activation magnitude correlate with target identity? The answer was something that we call a spatial gating mechanism.

We tracked mean activations across channels over the course of full episodes. Clear upward jumps occur at the moment each entity is collected, visible in the highest-variance channels:

![Mean activation values across all timesteps in an unmodified rollout.](/thesis_figures/standard_maze_35k_activation_tracking.png)
*Mean activation values across all timesteps in an unmodified rollout for the 6 highest-variance channels. Shaded regions indicate the current next target. Note the upward jumps at entity collection points.*

To understand what was driving these jumps, we analysed the spatial structure of activations within individual channels. The pattern was clear: negative activation regions follow the maze structure, marking areas where the agent still needs to go. As each entity is collected, we see that the region around it suddenly shifts from a strong negative value to near-zero. The network uses negative activations to suppress representations of future objectives, with suppression lifting as each objective is completed.

![Progressive disinhibition in Conv4a over the course of an episode.](/thesis_figures/disinhibition_paper_figure_v2.png)
*Progressive disinhibition in Conv4a over the course of an episode. Top row: game observations with blue overlay showing regions of strong negative activation derived from channel 18. Bottom row: pure spatial activation maps for channel 18. Mean activation starts at -12.6 and increases to -0.8 as entities are collected.*

This explains the steering via activation offset result. Early game stages have strongly negative activations overall, with many objectives and negative regions remaining. Shifting all activations positive mimics the activation patterns of later game stages where a different target must be pursued, causing the agent to switch targets. We are still somewhat uncertain why shifting the values downwards when the blue and green key are present leads to the pursuit of the red key, but it might be that there is some kind of wraparound effect where the signal produced by the values results in surprising targets.

We test this mechanism by using patching in the convolutional layers to clamp activations in regions we do not want the agent to enter to a value of 0. This completely stops the agent from entering those regions. Tests in our cross maze environment reveal 100% retargeting of the agent to regions that are not clamped:

![Steering via spatial clamping.](/thesis_figures/steering_figure.png)
*Top row: baseline behaviour where the agent moves toward the blue key. Bottom row: after clamping activations to zero in three spatial regions (red dashed boxes on the left, bottom and right), the agent instead moves toward the green key in the remaining unclamped region.*

To verify that this mechanism operates spatially rather than on entity representations, we shuffled entity positions across maze arms and tested whether clamping still redirected the agent. With shuffled positions, clamping a region caused the agent to avoid that direction regardless of which entity occupied it, which we refer to as repulsion. Through backward elimination, we identified a minimal set of 13 out of 32 channels sufficient for position-invariant spatial repulsion. This set reliably prevents the agent from entering any clamped region regardless of which arm of the maze the entity was in. Some channels were particularly important; removing a single channel from the set lowered the successful repulsion rate by up to 25%.

## Finding 4: Two-phase processing architecture

Linear probes trained on layer activations show a clean separation of responsibilities in different stages of the network, where the early layers show high fidelity of which entity is current, while the later layers show greater ability to determine the direction to move in. This was somewhat less surprising than the results above, but was a clean mechanistic story nonetheless.

| Layer  | Entity Accuracy | Direction Accuracy |
| ------ | :-------------: | :----------------: |
| conv1a |      20.0%      |   25.1% (random)   |
| conv2a |      96.6%      |       42.7%        |
| conv3a |    **99.3%**    |       63.6%        |
| conv4a |      97.6%      |       51.7%        |
| fc1    |      87.5%      |       62.9%        |
| fc2    |      76.8%      |     **67.3%**      |
| fc3    | 20.4% (random)  |   21.1% (random)   |

The probe accuracies across layers reveal that the convolutional layers dominate in encoding which entity to target, while the fully connected layers rapidly transition to translating information into actions. The contrasting progressions reveal a two-stage processing architecture:

- **Stage 1 -- Goal identification (conv2a-conv4a):** Entity information emerges sharply from conv1a through conv2a (96.6%) and peaks at conv3a (99.3%), remaining extremely high at conv4a at 97.6%. At this stage, directional information remains relatively weak (63.6% at conv3a), suggesting the network prioritises identifying the correct goal before planning how to reach it.
- **Stage 2 -- Navigation planning (fc1-fc2):** As entity information compresses (99.3% to 20.4%), directional information strengthens (63.6% to 67.3%). The network transforms explicit entity representations into spatial navigation commands, with peak directional accuracy at fc2 (67.3%) suggesting motion-oriented features directly relevant to action selection. Both types of information then collapse at fc3 as they are compressed into the final action distribution and value estimates.

This explains why our patching interventions work at the convolutional layers: we modify goal selection before it is translated into directions. Interventions earlier would interfere with the model building a picture of its inputs, while later interventions would disrupt coherent movement patterns.

Even though conv1a at the whole layer level is worse than random at determining which entity is the current target, it contains highly specialised entity detectors at the individual channel level (five channels achieve >90% accuracy on blue keys, five on red keys, three on the gem). This implies entity detection happens very early, but the signals are constructed as completely separate channels before being integrated into a linearly separable representation at the layer level in conv2a.

## Finding 5: SAEs confirm this isn't polysemanticity

Training SAEs on conv3a and conv4a did not reveal additional interpretable structure beyond what we observed in the base model. SAE latents exhibited the same patterns of systematic activation level differences between game states. This preservation across radically different representation schemes suggests the activation patterns we observe are fundamental to the operations of the network and not simply an artefact of compression.

We trained SAEs with 4x expansion factors on the CNN layers, using 1x1 convolutional layers following [Gorton et al. 2024](https://arxiv.org/abs/2406.03662), with an L1 warm-up schedule and decoder column norm scaling from [Conerly et al. 2024](https://transformer-circuits.pub/2024/april-update/index.html). SAEs recovered 99.6% (conv4a) and 102% (conv3a) of task performance, with variance explained approaching 100%. We trained 5 SAEs per layer to verify robustness. We had hypothesised, following [Bricken et al. 2023](https://transformer-circuits.pub/2023/monosemantic-features/index.html), that SAEs would decompose the polysemantic activations into a more disentangled and interpretable set of features.

Our primary method for using SAEs to ensure that we hadn't simply found polysemanticity in the network was to apply the same quantitative patching approach to all of the latents in an SAE. If it were natural to encode different entities into separate channels, we would expect the SAE to learn distinct latents for each entity type.

The patching setup works as follows: in a fork maze with all four entities at the ends of different arms, we clamp individual channels (or SAE latents) to specific activation values at a single spatial location and measure which entity the agent pursues.

![The patching setup.](/thesis_figures/intervention_illustration.png)
*The patching setup: original channel activations (left), the same channel with a single spatial location clamped to a high value (centre), and the corresponding maze environment (right). The agent is redirected toward the clamped region.*

The figure below shows the base model results for conv4a. The fact that specific value ranges correspond with specific entities reinforces the idea that the magnitude of the activation plays a real role in specifying a particular entity.

![Base model patching results for conv4a.](/thesis_figures/entity_distribution_plot_focused_blue_key_gem_green_key_red_key_layer_conv4a_top_14_ood_p99.9_step_35001.png)
*Base model patching results for conv4a. Each column is a channel, each coloured dot marks a successful redirection toward that entity at that activation value. Different entities respond to different value ranges within the same channels. Black dotted lines show the 99.9th percentile of normal activation values.*

Instead of learning distinct latents for each entity, we observe broadly the same patterns in the SAE: individual SAE latents successfully redirect the agent away from multiple entities, with similar activation patterns to the base model.

![The same patching experiment applied to conv4a SAE latents.](/thesis_figures/entity_distribution_plot_focused_blue_key_gem_green_key_red_key_layer_conv4a_top_37_ood_p99.9.png)
*The same patching experiment applied to conv4a SAE latents (top 37 most successful). The pattern is the same as the base model: individual latents redirect toward multiple entities at different activation magnitudes rather than specialising for one entity type.*

A caveat on the patching results: the black dotted lines in both plots mark the 99.9th percentile of normal activation values. Most successful interventions require values well beyond this range, meaning they exploit structure in the learned weights rather than mimicking the network's natural operating regime. The stronger causal evidence for the magnitude-encoding mechanism comes from the spatial gating experiments (Finding 3), where clamping to zero, a value within normal range, produces 100% retargeting. The patching results complement this by revealing that entity-sensitive structure is preserved in the weights even after SAE decomposition, but they should be understood as probing the geometry of the representation rather than replicating natural network behaviour.

## What are the implications

### For RL interpretability

The spatial gating mechanism we discovered suggests that within multi-objective settings, networks employ more nuanced encoding strategies than simple feature presence/absence. Rather than dedicating separate channels to each goal, this network uses negative activations to mark spatial regions of interest, and also re-uses channel circuits across different types of entity. It is unclear whether similar strategies will emerge in other architectures, but it seems likely that the strategy of reusing circuits across sequential objectives would be a natural one to adopt across systems that operate in multi-goal settings. For RL interpretability specifically, techniques successful in LLMs or simpler environments may need adaptation in complex, interactive settings ([Bereska & Gavves 2024](https://arxiv.org/abs/2404.04063)).

### For mechanistic interpretability methodology

While significant effort was invested in training and analysing SAEs, the primary insights stemmed from tracking how activation levels changed over the course of rollouts. One challenge in making this discovery was that many of the tools typically used in mechanistic interpretability were not designed to expose temporal patterns in activation levels. SAEs and probes successfully identified which channels responded to which entities, but did not reveal how activation levels shifted systematically over the course of a rollout.

This also differs from the superposition described by [Elhage et al. 2022](https://transformer-circuits.pub/2022/toy_model/index.html), where features are compressed into overlapping directions because they rarely co-occur in training data. In our case, all entities are simultaneously visible in the maze; the network is not compressing features that don't co-occur, but using spatial gating to track which regions still require attention, with activation magnitude shifting systematically as objectives are completed.

### For AI safety and control

The precision of offset steering (+/-0.5 at conv2a is sufficient) suggests a lightweight control mechanism requiring no architectural changes or retraining. The two-phase processing architecture provides a practical debugging framework: target convolutional layers for goal selection issues, FC layers for navigation and planning problems. Representations are most malleable early in the network where they first integrate low-level information, providing an optimal control point before entity selection disperses into distributed action plans.

However, this technique exploits correlations between activation levels and game states that emerged from Heist's particular sequential structure. Other models would need to develop analogous correlations for similar interventions to work, and there is no guarantee that they would. Detecting such patterns is straightforward (tracking mean activations over rollouts), but finding exploitable correlations in other settings should not be assumed.

The activation-magnitude patterns we observe in steering experiments appear to be a downstream correlation rather than the causal selection mechanism itself. Because spatial gating produces predictable magnitude shifts as each stage clears (fewer negative regions = higher mean activation), the network has learned deep statistical correlations between overall activation magnitude and game progress. Offset steering exploits these correlations rather than directly manipulating the selection mechanism. This distinction is important: successful steering does not imply that we have identified the causal mechanism, only that we have found an exploitable correlation.

## Limitations

- We test only on a single environment, due to the lack of other environments that have similar qualities such as the extreme generalisation encouraged by Procgen and the staged multi-goal configuration in Heist. It is also unclear to what extent the spatial gating phenomenon generalises to other architectures.
- Our training methodology differs from standard practice in using unlimited procedurally generated environments rather than the typical 200-500 fixed set. While this was necessary for successful training with our compressed architecture, it may affect the generalisation of our findings to models trained under standard Procgen protocols.
- Intervention experiments, by their nature, can push the network into off-distribution activation states. The agent's behaviour under such strong artificial interventions does not represent its typical behaviour. We do not yet have a clear picture of precise circuitry under normal operating conditions.
- The patching interventions were typically only applied with positive activations, but the mean channel activation analysis reveals that for many channels the activations are mostly negative. This means that a large portion of their activity is not being captured accurately in the interventions.
- Our approach of simply intervening in every channel with 400 different activation strengths would need to be approached more carefully, due to cost constraints, in larger models.
- As noted above, the network doesn't dynamically select between targets. Our steering results redirect a fixed encoding rather than revealing a selection mechanism.

## Acknowledgements

This work was carried out at the University of Cape Town under the supervision of Associate Professor Jonathan Shock. I also gratefully acknowledge access to compute and support from the MATS programme.

---

*The full thesis is available as a PDF: [here](https://github.com/BenSturgeon/RL_interpretability_masters/blob/main/notes/paper_files/main.pdf)*

*The experimental code is available [here](https://github.com/BenSturgeon/activation-multiplexing-maze-agent).*
