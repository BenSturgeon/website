# Modal made my research 2-5x faster

Recently I've been using Modal for most of my compute needs. Since I've made the change, I've felt better, my skin has improved, and I've had a general sense of the rightness of the world.

Why has this occurred? Well to put it simply, if I wanted to create a compute platform and provide the optimal possible compute provider experience, I don't think I could do a better job than what Modal have already done. To be clear, I am not sponsored, I am just tired of having to give the same spiel to people over and over again.

Every design decision is excellent, the availability of GPUs is amazing, I've never not gotten exactly the GPU I wanted which is a consistent problem on other platforms, and the way the platform is structured means I spend approximately 5-10x less for the same amount of experiments because the GPUs are never sitting idle.

## Design philosophy

Modal is built from the ground up to be pythonic. Everything is constructed around the idea of infrastructure as code, meaning no GUIs are necessary to run jobs. Apparently Runpod's API can approximate some of this, but at the very least from what I have heard the convenience of not being tied to regional filesystems means that it is much easier to get GPUs at the moment you need it.

This makes it a perfect match for Claude Code, which is the main thing I'm using to run experiments at the moment. Modal works by creating persistent container images which can then be rebuilt very quickly to run future jobs. Data can then be stored on a network volume (cloud storage) and when you want to run something, the container can be spun up into a virtual machine, have the data easily mounted and the job kicked off. This means that all the code and infrastructure to run experiments is ephemeral, it's just cheap cloud storage that's holding a docker image.

This makes environment management and reproducibility significantly cleaner because we're always working on a fresh new environment which can be trivially replicated. This does come with some versioning frictions of its own, but as I'll discuss later, agents are very good at fielding these kinds of versioning issues so from my point of view I barely noticed them in my recent project.

## Scaling compute is ridiculously easy

One of my favourite aspects of Modal is that it is designed around being able to easily split workloads across GPUs for batch processing. On the plan I am on, I'm limited to 50 GPUs at any given time, but this still gives amazing opportunities to split workloads. For example, if I want to do 10000 instances of custom inference, I can use modal.map() to split that workload across 10 or 20 clones, do the inference in parallel and recombine it afterwards.

What's more, because spinning up new instances is so easy, any time there's a quick rigour test to run or I want to quickly test a new idea, I can simply create a new agent to go off and run that experiment, and it can run alongside all my other experiments. This is the main thing driving the claimed 2-5x speedup that I've gotten from using modal. Parallelisation, and being able to spin up entirely new experiments is now absurdly easy.

## It's much cheaper

Because you are charged per second of actual usage, you don't have to worry about keeping your instance running to avoid having to build it again. You can just have your cached images with all the models, data and code ready to be spun up when you want to run your experiments. This initially massively reduced my compute costs until I realised that I could run 20-50 experiments in parallel with my 50 GPUs and I could actually be doing all of the experiments I wanted to run at once and then my costs shot up to be much higher than before.

This means my experiments per dollar is likely orders of magnitude higher than when I was using runpod.

## Using it with Claude Code is incredible

With Modal, I can have an idea, assign it to an agent and have it run that experiment using however many GPUs it needs. This makes iteration incredibly easy. It can easily scale the GPUs up if we need to replicate on a larger model, or if we want to fan out across many parallel instances, say if we want to test many seeds or apply a small variation to the setup.

## Creating little micro sites for demos or data examination is incredibly easy

This is kind of a minor point, but it can be great to deploy little demos or even things to read over datasets and transcripts. Modal is amazing at this as you can just trivially spin up a little CPU instance and host the thing super cheaply.

## Overall

I think everyone who is using agents to help speed up their experiments should probably be using Modal and you will probably love it.

<figure>
  <img src="/modal-endorsement-1.png" alt="A friend's endorsement of Modal">
  <figcaption>An impromptu endorsement from a friend after I recommended Modal to them.</figcaption>
</figure>

<figure>
  <img src="/modal-endorsement-2.png" alt="Another friend's endorsement of Modal">
</figure>
