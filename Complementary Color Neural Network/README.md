# Complementary Color Neural Network

A proof of concept neural network that produces the complement of a given color.

------------------------------------------------------------------------------------------------------------------------------------------

## About the Program

   This project marks my first experience with machine learning and computer science concepts.  The application was made with the Unity Gaming Engine, which is the only programing tool I knew and could use at the time.  The graphics are comprised of built in features of Unity, and the program was written using UnityScript, a built in language that is based off of JavaScript syntax.
   Upon startup, the program asks the user for a color.  This color, and its complement color, are the training data that the corresponding neural networks try to produce.  Through training, the networks learn to manipulate the weights of the RGB components of the input in order to produce the complementary color as the output.  There are two training methods available: a genetic algorithm and gradient descent.  
   This program reflects my young and simplistic understanding of neural networks and machine learning as a sophomore in high school.  For one, the network only trains on one piece of training data.  It also tests on this data, making the network overfit the data by essentailly memorizing the complemtary color.  The implementation is limited in that it computes gradients by hand and stores values in individual variables rather than arrays of values.
   This project holds special value to me because it shows the first time I began to become excited about computer science and started to explore it on my own.  I was inspired to make this by videos I was watching on YouTube (linked below).  Specifically, the SethBling video first caught my attention on the subject, and the Welch Labs video taught me how to implement this exciting topic.  I can remember how excited I was to show my family and my science teacher at my high school, who in that year became a close mentor of mine.  Although it is a poor implementation, I am proud that I was able to produce this at such a young age.
   
------------------------------------------------------------------------------------------------------------------------------------------

## Using and Viewing the Program

   To use the program, simply download the executable file and the data folder.  Place these two items in the same directory and run the executable.
   The source code for the neural network is in the file NN.js.

------------------------------------------------------------------------------------------------------------------------------------------

## Videos

SethBling: MarI/O - Machine Learning for Video Games
https://www.youtube.com/watch?v=qv6UVOQ0F44

Welch Labs: Neural Networks Demystified
https://www.youtube.com/watch?v=bxe2T-V8XRs&list=PLiaHhY2iBX9hdHaRr6b7XevZtgZRa1PoU
