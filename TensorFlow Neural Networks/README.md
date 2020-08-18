# TensorFlow Neural Networks

A few neural networks where I tought myself more advanced concepts, such as convolution and image generation.

<img src="https://3qeqpr26caki16dnhd19sv6by6v-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/Plot-of-Handwritten-Digits-from-the-MNIST-dataset.png" alt="MNIST Dataset" width="30%" height="30%">

------------------------------------------------------------------------------------------------------------------------------------------

## About the Notebooks

After experimenting with basic neural networks in the other two projects in this repository, I decided to get more advanced by searching out a Python library to use and learning more advanced techniques for neural networks.

There are three notebooks included in this project.  The first, called `General Neural Network.ipynb`, was basically my first use of Tensorflow.  I decided once I had a network working, I should try to structure it so that the hyperparameters would be easily changable.  I had hoped that I would use this code as a stand in neural net whenever I needed something quickly. 

The second notebook, called `MNIST CNN.ipynb`, was my attempt to create a convolutional neural network.  Tensorflow had a great tutorial on how to do this using the MNIST dataset, and I wanted to give it a go.  The MNIST dataset is a collection of images of handwritten digits.  The use of a convolutional neural net allows the model to label the image with what digit is being drawn.  I was very excited when I got this working, because it seemed to me at the time that this was the state of the art.  Further reading let me know that there was more!

The last notebook, called `MNIST GAN.ipynb`, was more exploration into modern research on machine learning.  A Generative Adversarial Network, or GAN, is a neural network that takes in noise and produces a newly generated imgae.  The network, called the generator, is trained with the help of a discriminator network.  The discriminator takes an image and tries to determine if it is a real image or a generated one.  By training both of these networks at the same time, the generator network becomes increasingly convincing in its outputs.  The MNIST dataset was used again here, meaning that if successful, the generator network would produce images of handwritten digits.  I unfortunately could not get this working for unknown reasons.  Maybe it would be fun to revisit this project.  For more reading see [the Wikipedia for GANs](https://en.wikipedia.org/wiki/Generative_adversarial_network).
