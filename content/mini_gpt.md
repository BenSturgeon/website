```python
import torch 
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import math

```
The original project can be found here: https://github.com/BenSturgeon/mini-gpt

For actually running the model and training further it is recommended you use the scripts provided there.

## Steps
* Download the data
* Build the tokenizer
* Batch creator
* Create a basic forward pass
* self attention layer
* Create a training process
* Show outputs



```python
import urllib.request

# download tiny shakespeare
url = 'https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt'
```


```python
# download the file directly to a variable
text = urllib.request.urlopen(url).read().decode('utf-8')
```

## Create a tokenizer at the character level


```python
tokens = list(set(text))
vocab_size = len(tokens)
print(vocab_size)

# Create an encoder decoder for our tokens to turn them into numbers and back
encoder_decoder = {token: i for i, token in enumerate(tokens)}
decoder_encoder = {i: token for i, token in enumerate(tokens)}

encode = lambda x: [encoder_decoder[i] for i in x]
decode = lambda x: "".join([decoder_encoder[i] for i in x])

print(encode("hii there"))
print(decode(encode("hii there")))
```

    65
    [49, 14, 14, 26, 17, 49, 48, 0, 48]
    hii there


## Creating our dataset
We split the data into training and validation with 90/10 split


```python
import torch
data = torch.tensor(encode(text), dtype=torch.long)


# Split the data into training and validation sets
split_val = int(len(data) * 0.9)
train_data = data[:split_val]
val_data = data[split_val:]

```


```python
len(train_data), len(val_data)
```




    (1003854, 111540)



## Turning our data into batches


```python
batch_size = 4
block_size = 8



def get_batch(split):
    if split == 'train':
        data = train_data
    else:
        data = val_data
    batch_start_indexes = torch.randint(len(data) - block_size, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in batch_start_indexes])
    y = torch.stack([data[i+1:i+block_size+1] for i in batch_start_indexes])
    return x,y

xb, yb = get_batch('train')

print(f"""
inputs:
{xb.shape}
{xb}

targets:
{yb.shape}
{yb}""")

for b in range(batch_size):
    for t in range(block_size):
        x = xb[b][:t+1]
        y = yb[b][t]
        print(f"Input is {x} and target is {y}")



```

    
    inputs:
    torch.Size([4, 8])
    tensor([[17, 26, 41, 63, 25, 21, 24, 26],
            [26, 41, 19, 18, 26,  9, 19, 14],
            [14, 21, 21, 26, 25, 33, 14, 17],
            [48,  0, 21, 63, 63, 42, 26, 17]])
    
    targets:
    torch.Size([4, 8])
    tensor([[26, 41, 63, 25, 21, 24, 26, 49],
            [41, 19, 18, 26,  9, 19, 14,  0],
            [21, 21, 26, 25, 33, 14, 17, 48],
            [ 0, 21, 63, 63, 42, 26, 17, 49]])
    Input is tensor([17]) and target is 26
    Input is tensor([17, 26]) and target is 41
    Input is tensor([17, 26, 41]) and target is 63
    Input is tensor([17, 26, 41, 63]) and target is 25
    Input is tensor([17, 26, 41, 63, 25]) and target is 21
    Input is tensor([17, 26, 41, 63, 25, 21]) and target is 24
    Input is tensor([17, 26, 41, 63, 25, 21, 24]) and target is 26
    Input is tensor([17, 26, 41, 63, 25, 21, 24, 26]) and target is 49
    Input is tensor([26]) and target is 41
    Input is tensor([26, 41]) and target is 19
    Input is tensor([26, 41, 19]) and target is 18
    Input is tensor([26, 41, 19, 18]) and target is 26
    Input is tensor([26, 41, 19, 18, 26]) and target is 9
    Input is tensor([26, 41, 19, 18, 26,  9]) and target is 19
    Input is tensor([26, 41, 19, 18, 26,  9, 19]) and target is 14
    Input is tensor([26, 41, 19, 18, 26,  9, 19, 14]) and target is 0
    Input is tensor([14]) and target is 21
    Input is tensor([14, 21]) and target is 21
    Input is tensor([14, 21, 21]) and target is 26
    Input is tensor([14, 21, 21, 26]) and target is 25
    Input is tensor([14, 21, 21, 26, 25]) and target is 33
    Input is tensor([14, 21, 21, 26, 25, 33]) and target is 14
    Input is tensor([14, 21, 21, 26, 25, 33, 14]) and target is 17
    Input is tensor([14, 21, 21, 26, 25, 33, 14, 17]) and target is 48
    Input is tensor([48]) and target is 0
    Input is tensor([48,  0]) and target is 21
    Input is tensor([48,  0, 21]) and target is 63
    Input is tensor([48,  0, 21, 63]) and target is 63
    Input is tensor([48,  0, 21, 63, 63]) and target is 42
    Input is tensor([48,  0, 21, 63, 63, 42]) and target is 26
    Input is tensor([48,  0, 21, 63, 63, 42, 26]) and target is 17
    Input is tensor([48,  0, 21, 63, 63, 42, 26, 17]) and target is 49


## Creating our model
Our goal is to create a simple bigram model using pytorch nn.Module as our basis


```python

torch.manual_seed(1337)

class BigramLanguageModel(nn.Module):
    def __init__(self, vocab_size):
        super().__init__()
        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)

    def forward(self, idx, targets=None):
        logits = self.token_embedding_table(idx)

        if targets == None:
            loss = None
        
        else:
            # Where 
            # B = batch_size = 4
            # T = time = 8
            # C = channel = 65 = vocab_size
            #  We change the shapes of our logits to get them in the shape needed to use pytorch's cross_entropy function

            B, T, C = logits.shape
            logits = logits.view(B*T, C)
            targets = targets.view(B*T)
            loss = F.cross_entropy(logits, targets)
        
        return logits, loss
        return logits
    
    def generate(self, x_input, max_new_tokens):

        for _ in range(max_new_tokens):
            logits, loss = self(x_input) # we're not using loss, as we're generating

            next_token = logits[:, -1,:]

            probabilities = F.softmax(next_token, dim=-1)

            top_answer = torch.multinomial(probabilities, num_samples=1)

            x_input = torch.cat((x_input, top_answer), dim=1) # B, T+1. Appending to 1st dimension which is the time dimension

        return x_input
        


model = BigramLanguageModel(vocab_size)
logits, loss = model(xb, yb)
print(logits.shape)
print(loss) # Loss is very high at this point, 4.6 
        

```

    torch.Size([32, 65])
    tensor(4.8668, grad_fn=<NllLossBackward0>)



```python
x_input = torch.zeros((1,1),dtype=torch.long )
print(decode(model.generate(x_input, max_new_tokens=100)[0].tolist())) 
# Output is garbage, as we have not begun any training
```

    rc$OX!qxDhCmIdNedybKPdFY.WlIyXzk&VFN
    ddBTCeVwug,dtWc!oTIMXJYVRLVRYsq,p?'thYBeKGHsG&VQ:DDMPEYyAB3UuVRf


## Creating our backward pass
In this step we create an optimizer and demonstrate a basic gradient descent loop. 

So far our model is just an embedding table with the dimensions of vocab_size * vocab_size


```python
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)
```


```python
batch_size = 32

for i in range(5000):
    xb, yb = get_batch(batch_size)
    logits, loss = model(xb, yb)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()

print(loss)
```

    tensor(2.4971, grad_fn=<NllLossBackward0>)



```python
x_input = torch.zeros((1,1),dtype=torch.long )
print(decode(model.generate(x_input, max_new_tokens=100)[0].tolist())) 
# Output should look somewhat more sensible, and it does! 
# This is because the tokens have some idea about what should come next just through information encoded in their own embeddings.
# However, we observe a plateau in loss of around 2.3. We'll need to implement new tricks to break through.
```

    r
    
    My, ged err
    Wal m
    PEZjYounoowZANIO:
    HINTe aShe athatliacus caryosaJ.
    Anenysknthace yoFie hbe?-Mave


## Adding self-attention



```python
torch.manual_seed(1337)
a = torch.tril(torch.ones(3,3))
a = a/torch.sum(a,1,keepdim=True)
b = torch.randint(0,10, (3,2)).float()
c = a @ b
print('a=')
print(a)
print('--')
print('b=')
print(b)
print('--')
print('c=')
print(c)
```

    a=
    tensor([[1.0000, 0.0000, 0.0000],
            [0.5000, 0.5000, 0.0000],
            [0.3333, 0.3333, 0.3333]])
    --
    b=
    tensor([[5., 7.],
            [2., 0.],
            [5., 3.]])
    --
    c=
    tensor([[5.0000, 7.0000],
            [3.5000, 3.5000],
            [4.0000, 3.3333]])


The purpose of the following example is to demonstrate the simplest implementation of how tokens can communicate with each other.

In this case we just average out all the values of the previous token's channels, which is obviously very lossy, but this is simply illustrative.

We will have a way to add all that back.


```python
B,T,C = 4,8,2
x = torch.randn(B,T,C)
x.shape


# Here we use a bag of words (bow) to illustrate our averaging example
xbow = torch.zeros((B,T,C))
for b in range(B):
    for t in range(T):
        xprev = x[b,:t+1]
        xbow[b,t] = torch.mean(xprev, 0)

# The purpose of this is to show that the rows of xbow are equal to the average of the values in all previous rows of x

print(xbow[0][1] == torch.mean(x[0][:2],0), xbow[0][2] == torch.mean(x[0][:3],0))

```

    tensor([True, True]) tensor([True, True])



```python
wei = torch.tril(torch.ones(T,T))
print(wei.sum(1, keepdim=True))
wei = wei/wei.sum(1, keepdim=True)
print(wei)
xbow2 = wei@x
torch.allclose(xbow,xbow2)
```

    tensor([[1.],
            [2.],
            [3.],
            [4.],
            [5.],
            [6.],
            [7.],
            [8.]])
    tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.5000, 0.5000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.3333, 0.3333, 0.3333, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.2500, 0.2500, 0.2500, 0.2500, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.2000, 0.2000, 0.2000, 0.2000, 0.2000, 0.0000, 0.0000, 0.0000],
            [0.1667, 0.1667, 0.1667, 0.1667, 0.1667, 0.1667, 0.0000, 0.0000],
            [0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.0000],
            [0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250]])





    True



Our next step is to demonstrate that we can do the above using softmax.



```python
tril = torch.tril(torch.ones(T,T))
wei = torch.zeros(T,T)
print(wei)
wei = wei.masked_fill(tril==0, float('-inf')) 
print(wei)
wei = torch.softmax(wei,dim=1)
print(wei)
xbow3 = wei@x
torch.allclose(xbow3,xbow2)
```

    tensor([[0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.],
            [0., 0., 0., 0., 0., 0., 0., 0.]])
    tensor([[0., -inf, -inf, -inf, -inf, -inf, -inf, -inf],
            [0., 0., -inf, -inf, -inf, -inf, -inf, -inf],
            [0., 0., 0., -inf, -inf, -inf, -inf, -inf],
            [0., 0., 0., 0., -inf, -inf, -inf, -inf],
            [0., 0., 0., 0., 0., -inf, -inf, -inf],
            [0., 0., 0., 0., 0., 0., -inf, -inf],
            [0., 0., 0., 0., 0., 0., 0., -inf],
            [0., 0., 0., 0., 0., 0., 0., 0.]])
    tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.5000, 0.5000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.3333, 0.3333, 0.3333, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.2500, 0.2500, 0.2500, 0.2500, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.2000, 0.2000, 0.2000, 0.2000, 0.2000, 0.0000, 0.0000, 0.0000],
            [0.1667, 0.1667, 0.1667, 0.1667, 0.1667, 0.1667, 0.0000, 0.0000],
            [0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.1429, 0.0000],
            [0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250, 0.1250]])





    True




```python
torch.tensor(float('-inf'))
```




    tensor(-inf)



To determine the attention of words (more exactly tokens) we use ‘queries’, ‘keys’ and ‘values’.

All of them are presented in vectors. 

Keys activate depending on the strength of closeness with the query vector as determined by dot product.

Keys are an encoded representation for values, in simple cases they can be the same. 





```python
torch.manual_seed(1337)
B,T,C = 4,8,32
x = torch.randn(B,T,C)

#Attention head
head_size = 16
key = nn.Linear(C,head_size,  bias=False)
query = nn.Linear(C,head_size, bias=False)
value = nn.Linear(C,head_size, bias=False)
k = key(x)      # B,T,16
q = query(x)    # B,T,16

wei = q @ k.transpose(-2,-1) * C**-0.5 # (B, T, 16) @ (B, 16, T) ---> (B, T, T)
print(wei[0])
wei = wei.masked_fill(tril==0, float('-inf'))
print(wei[0])
wei = F.softmax(wei, dim=-1)
print(wei[0])
v = value(x)
out = wei @ v
print(v.shape)
print(out.shape)
# print(wei[0])
# print(out)
```

    tensor([[-0.3116, -0.2300,  0.0999,  0.3821, -0.1887,  0.3470,  0.1903, -0.0801],
            [-0.5893, -0.2927,  0.0184,  0.5972, -0.3858,  0.1841, -0.0098,  0.0517],
            [-0.1808, -0.2229,  0.0135, -0.0674, -0.1740, -0.2528,  0.0132, -0.1688],
            [ 0.1385, -0.1417, -0.0595, -0.1502, -0.0990, -0.2069, -0.2285, -0.1814],
            [-0.2221,  0.0033, -0.1393, -0.2334,  0.3600,  0.1527,  0.0657,  0.1637],
            [-0.0553,  0.4270, -0.0195, -0.1755,  0.5913, -0.4460,  0.2508,  0.2156],
            [ 0.1923,  0.3474, -0.0463, -0.0558,  0.1077,  0.2230, -0.0969,  0.1423],
            [-0.3190, -0.0729, -0.1468,  0.1043, -0.1412, -0.1035,  0.1137,  0.1114]],
           grad_fn=<SelectBackward0>)
    tensor([[-0.3116,    -inf,    -inf,    -inf,    -inf,    -inf,    -inf,    -inf],
            [-0.5893, -0.2927,    -inf,    -inf,    -inf,    -inf,    -inf,    -inf],
            [-0.1808, -0.2229,  0.0135,    -inf,    -inf,    -inf,    -inf,    -inf],
            [ 0.1385, -0.1417, -0.0595, -0.1502,    -inf,    -inf,    -inf,    -inf],
            [-0.2221,  0.0033, -0.1393, -0.2334,  0.3600,    -inf,    -inf,    -inf],
            [-0.0553,  0.4270, -0.0195, -0.1755,  0.5913, -0.4460,    -inf,    -inf],
            [ 0.1923,  0.3474, -0.0463, -0.0558,  0.1077,  0.2230, -0.0969,    -inf],
            [-0.3190, -0.0729, -0.1468,  0.1043, -0.1412, -0.1035,  0.1137,  0.1114]],
           grad_fn=<SelectBackward0>)
    tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.4264, 0.5736, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.3151, 0.3022, 0.3827, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.3007, 0.2272, 0.2467, 0.2253, 0.0000, 0.0000, 0.0000, 0.0000],
            [0.1635, 0.2048, 0.1776, 0.1616, 0.2926, 0.0000, 0.0000, 0.0000],
            [0.1403, 0.2272, 0.1454, 0.1244, 0.2678, 0.0949, 0.0000, 0.0000],
            [0.1554, 0.1815, 0.1224, 0.1213, 0.1428, 0.1603, 0.1164, 0.0000],
            [0.0952, 0.1217, 0.1130, 0.1453, 0.1137, 0.1180, 0.1467, 0.1464]],
           grad_fn=<SelectBackward0>)
    torch.Size([4, 8, 16])
    torch.Size([4, 8, 16])


## Code explanations of the above:

wei = q @ k.transpose(-2,-1) * C**-0.5

The tranpose is used so we end up with a matrix of B,T,T:

(B,T,16) @ (B,16,T) ---> B, T, T: our desired shape


This lets us do batch matrix multiplication on our tril matrix which is size(16,16)


We apply the normalisation of  C**-0.5 to our wei variable as a normalisation step. We divide by the square route of our head size so that we avoid peaks that are too high in our initial weights.

## Building our multi-head attention blocks
We want to build out our heads into parallel layers.

This is analogous to group convolutions and has speed advantages (parallelisation) while still giving us the benefits of more trained parameters.

## Cleaning our head class



```python
n_embd = 32

class Head(nn.Module):
    """A single self-attention head"""
    def __init__(self, head_size):
        super().__init__()
        self.key = nn.Linear(n_embd,head_size,  bias=False)
        self.query = nn.Linear(n_embd,head_size, bias=False)
        self.value = nn.Linear(n_embd,head_size, bias=False)
        self.register_buffer("tril", torch.tril(torch.ones(block_size, block_size)))
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, reverse=False):
        B,T,C = x.shape

        if reverse:

            q = self.key(x)      
            k = self.query(x)   
        else:
            k = self.key(x)      
            q = self.query(x)   

        # To determine the attention of words (more exactly tokens) we use ‘queries’, ‘keys’ and ‘values’.
        # All of them are presented in vectors. 
        # Keys activate depending on the strength of closeness with the query vector as determined by dot product.
        # Keys are an encoded representation for values, in simple cases they can be the same. 
        wei = q @ k.transpose(-2,-1) * C**-0.5 # (B,T,16) @ (B,16,T) ---> B, T, T: our desired shape

        wei = wei.masked_fill(self.tril[:T,:T]==0, float('-inf'))
        wei = F.softmax(wei, dim=-1)
        wei = self.dropout(wei)

        v = self.value(x)
        out = wei @ v
        return out
```

## Now we have that we can easily create our multi-head attention block


```python
class MultiHeadAttention(nn.Module):
    def __init__(self, num_heads, head_size):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(n_embd, n_embd)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, reverse=False):
        out = torch.cat([h(x, reverse=reverse) for h in self.heads], dim=-1)
        out = self.dropout(self.proj(out)) # Projection back into the residual pathway
        return out
```

Here we use a ModuleList to create a batch of our heads, as well as a projection layer.

The module list makes it easy for us to iterate through our heads and pass input through them.

The projection allows us to condense the dimensions of our matrices back to the size expected by the residual stream. This allows us to expand our matrices into larger dimensions for inference and then shrink them back down when passing back to the residual stream. This gives us the benefit of doing inference at larger scales.

## Explanation on the residual stream

The residual stream is the thread going through our entire architecture to which we add the oututs of each of our inference operations.

The residual stream is highly beneficial when we are working with deeper neural nets as it allows the backpropogation to propogate to much earlier layers of the network, rather than all the optimisation power being spent on the later layers.

This is also sometimes referred to as adding "skip connections".

## Adding our feedforward network

Finally we add a simple linear feed forward network which gives our network the opportunity to "think" about the information contained in each node now that they have had the opportunity to share information via self-attention.

The inputs to the feedforward network are simply the results of the dot product of our value embeddings with the outputs of our self-attention queries and keys dot-product operations.

In other words:
attention_matrix = dot(keys(x), queries(x))

attention_matrix = tril_masking_operation(attention_matrix)

attention_based_values = dot(attention_matrix, values(x))

optimised_outputs = feed_forward(attention_based_values)



```python
class FeedForward(nn.Module):
    def __init__(self, n_embd):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4* n_embd, n_embd),
            nn.Dropout(dropout)
        )

    def forward(self, x):
        return self.net(x)
```

## Finally we condense everything into a single block


```python

class Block(nn.Module):
    def __init__(self, n_embd, n_head):
        super().__init__()
        self.head_size = n_embd//n_head
        self.sa = MultiHeadAttention(n_head, self.head_size)
        self.ffwd = FeedForward(n_embd)
        self.ln1 = nn.LayerNorm(n_embd)
        self.ln2 = nn.LayerNorm(n_embd)

    def forward(self, x, reverse=False):
        ln_x = self.ln1(x)
        x = x + self.sa(ln_x, reverse= reverse) # The adding of the values to x is our residual connections, or skip connections
        x = x + self.ffwd(self.ln2(x))
        return x

```

## Explanation:
Here we combine everything together. We have you multihead attention which produces outputs for our FeedForward network.

To add in our residual stream we simply make the following changes which are present above:

x = self.sa(ln_x, reverse= reverse) 
x = self.ffwd(self.ln2(x))

x = x + self.sa(ln_x, reverse= reverse) 
x = x + self.ffwd(self.ln2(x))

By doing this we are keeping our original values which we continuously pass through the network and simply adding to them. This lets our network optimise more efficiently as certain things which can simply be left unchanged in the original input can be left unchanged without the network trying to calculate them again from scratch, which can take up a lot of the parameter's optimisation power.

## Adding our layernorm
We have yet to discuss normalisation. The residual stream and layernorm are not unique to the transformer. The real innovation that they contributed was the self-attention mechanism.

However they are very helpful and necessary for good performance.

The layernorm normalisation is essentailly reducing very large variances in our input data to a more manageable range.
The goal is make all the values in our input to have a mean of roughly 0 and a standard deviation of 1.

We do this by minusing the average of x from x and then dividing that value by the square root of the (variance of x * epsilon).

in this case epsilon is a constant we add to avoid situations where we would divide by 0.


```python
class LayerNorm1d: # (used to be BatchNorm1d)
  
  def __init__(self, dim, eps=1e-5, momentum=0.1):
    self.eps = eps
    self.gamma = torch.ones(dim)
    self.beta = torch.zeros(dim)
  
  def __call__(self, x):
    # calculate the forward pass
    xmean = x.mean(1, keepdim=True) # batch mean
    xvar = x.var(1, keepdim=True) # batch variance
    xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance
    self.out = self.gamma * xhat + self.beta
    return self.out
  
  def parameters(self):
    return [self.gamma, self.beta]

torch.manual_seed(1337)
module = LayerNorm1d(100)
x = torch.randn(32, 100) # batch size 32 of 100-dimensional vectors
x = module(x)
x.shape
```




    torch.Size([32, 100])



## Putting it all together

Now we have assembled all of the pieces, the final step simply involves constucting everything we have built into a single model and training it. In this case we can scale up our model by increasing the values of our n_embd, n_heads, n_layers. 

The other parameters affect things like our learning rate, and block_size affects how many characters our model looks at in a batch. We also have dropout which is critical but which I will not explain here.

For actual running I recommend running the script rather than the model here, but I have included all the necessary code so it should run.


```python

```


```python
batch_size = 32
block_size = 128
n_embd = 192
n_head =4
n_layer = 4
lr = 3e-3
dropout = 0.2
training_iters = 5000
eval_interval = 300
eval_iters = 200
device = 'cuda' if torch.cuda.is_available() else 'cpu'
torch.manual_seed(1337)


## Helper functions
@torch.no_grad() # tells pytorch we don't intend to do backprop. saves memory by not saving gradients.
def estimate_loss(model, reverse=False):
    out = {}
    model.eval()
    for split in ['train', 'val']:
        losses = torch.zeros(eval_iters)
        for iter in range(eval_iters):
            X, Y = get_batch(split)
            X, Y = X.to(device), Y.to(device)
            logits, loss = model(X,Y, reverse=reverse)
            losses[iter] = loss.item()
        out[split] = losses.mean()
    model.train()
    return out

def get_batch(split):
    if split == 'train':
        data = train_data
    else:
        data = val_data
    batch_start_indexes = torch.randint(len(data) - block_size, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in batch_start_indexes])
    y = torch.stack([data[i+1:i+block_size+1] for i in batch_start_indexes])
    
    x,y = x.to(device), y.to(device)

    return x,y

def train( model, train_time=1000, output_path=None, save_path=None, num_tokens=250):
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr)

    for iter in range(train_time):
        if iter % eval_interval == 0 and iter>0:
            model = model.to(device)
            averaged_losses = estimate_loss(model)
            reversed_average_loss = estimate_loss(model, reverse=True)
            if output_path != None:
                with open(output_path, 'a') as f:

                    f.write(f"steps: {iter}  train loss:{averaged_losses['train']:.4f}  test loss:{averaged_losses['val']:.4f} reversed loss: {reversed_average_loss['val']:.4f}\n")
                    if save_path is not None:
                        model.load_state_dict(torch.load(save_path))
            else:
                print(f"steps: {iter}  train loss:{averaged_losses['train']:.4f}  test loss:{averaged_losses['val']:.4f} reversed loss: {reversed_average_loss['val']:.4f}\n")
        
        xb, yb = get_batch(batch_size)
        logits, loss = model(xb, yb)
        optimizer.zero_grad(set_to_none=True)
        loss.backward()
        optimizer.step()
    
    return model


class BigramLanguageModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        self.position_embedding_table = nn.Embedding(block_size, n_embd)
        self.blocks =  nn.ModuleList([Block(n_embd, n_head) for _ in range(n_layer)])
        self.ln = nn.LayerNorm(n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx, targets=None, reverse=False):
        B,T = idx.shape

        tok_emb = self.token_embedding_table(idx)
        pos_emb = self.position_embedding_table(torch.arange(T, device=device))
        x= tok_emb + pos_emb
        x = x.to(device)
        for block in self.blocks:
            x = block(x, reverse=reverse)
        x = self.ln(x)
        logits = self.lm_head(x)

        if targets == None:
            loss = None
        
        else:
            # Where 
            # B = batch_size = 4
            # T = time = 8
            # C = channel = 65 = vocab_size
            #  We change the shapes of our logits to get them in the shape needed to use pytorch's cross_entropy function

            B, T, C = logits.shape
            logits = logits.view(B*T, C)
            targets = targets.view(B*T)
            loss = F.cross_entropy(logits, targets)
        
        return logits, loss
        return logits
    
    def generate(self, x_input, max_new_tokens, reverse=False):

        for _ in range(max_new_tokens):
            reduced_x_input = x_input[:,-block_size:]
            
            logits, loss = self.forward(reduced_x_input, reverse=reverse) # we're not using loss, as we're generating

            next_token = logits[:, -1,:]

            probabilities = F.softmax(next_token, dim=-1)

            top_answer = torch.multinomial(probabilities, num_samples=1)

            x_input = torch.cat((x_input, top_answer), dim=1) # B, T+1. Appending to 1st dimension which is the time dimension

        return x_input


model = BigramLanguageModel()
model = model.to(device)

```

## Training explanation

You will notice a value being calculated called "reversed loss". This is an experiment which tests if there is a difference in the outputs when the network to produce keys is reversed with the network trained to produce queries in the attention heads. 

Someone asked me if these networks are in fact learning totally different weights and I created the test to find it. It turns out they are, based on the increasing loss.



```python
train_time = 3000


model =train(model, train_time = 3000,  num_tokens=250)
```

    steps: 300  train loss:2.2618  test loss:1.8434 reversed loss: 2.6710
    
    steps: 600  train loss:2.1127  test loss:1.5700 reversed loss: 2.8561
    
    steps: 900  train loss:2.0840  test loss:1.4186 reversed loss: 2.9580
    
    steps: 1200  train loss:2.0807  test loss:1.3118 reversed loss: 3.0853
    
    steps: 1500  train loss:2.1043  test loss:1.2210 reversed loss: 3.2253
    
    steps: 1800  train loss:2.1278  test loss:1.1472 reversed loss: 3.3235
    
    steps: 2100  train loss:2.1644  test loss:1.0721 reversed loss: 3.3992
    
    steps: 2400  train loss:2.2063  test loss:1.0051 reversed loss: 3.4631
    
    steps: 2700  train loss:2.2608  test loss:0.9357 reversed loss: 3.7323
    



```python
num_tokens = 250
context = torch.zeros((1,1), dtype=torch.long, device=device)
unmodified_output = decode(model.generate(context, max_new_tokens=num_tokens)[0].tolist()) + '\n'
```


```python
unmodified_output
```




    "r part more greats pack live himple women suister a ble.\n\nBAPTISTA:\nI must it tink? I have hour\nYou do night I amwa the wortnow, my tutory!\nIt should 'twere now my wife not doubt his ber.\n\nBAPTISTA:\nGood nervant: that, my falself.\n\nPETRUCHIO:\nI prithe\n"


