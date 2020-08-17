# Boat Neural Network

A neural network used to explore the possibility of AI behavior in video games.

<img src="/BoatNetworkREADMEImage.png" alt="Tested Image" width="50%" height="50%">

------------------------------------------------------------------------------------------------------------------------------------------

## About the Program

This was the second neural network I ever developed.  After learning about the subject, I wondered if this technology could be used to create AI behavior in video games.  I decided to test this out by designing a simple game and training AI neural nets.  The program included here is not the actual game, but a view into the neural networks generated.

The game is simple! The player would control a boat and try to maximize its health.  You can do this by picking up supply crates.  If you are hit by a cannonball or run aground, your health is lowered.  You can shoot cannonballs at other boats to lower their health.  Once they die, they drop crates, which you can pick up.
The controls a player would have access to would be rotational speeds, forward velocity, and cannonball shooting on either side of the ship.

Once I had designed a game, I gave a copy to about 12 of my frieds for them to try out.  Their copies recorded their controls and movements in relation to their environments to use as training data.

The program included here shows boats, each with its own neural network, fighting and trying to survive.  As time goes on, each boat continues gradient descent on the training data to maximize its control.  If I remember correctly, there's also a genetic algorithm component to it.  Each boat has some random initial parameters.  When a boat is killed, a new boat is respawned in with parameters inherited from the boat that killed it.  Boats also had the ability to reproduce asexually.  I think at one point I had some sort of species labeling working.

The hope was that if I just left the program, the boats would become extremely smart.  In the end, they did demonstrate extremely interesting behaviors!  Once case I remember is a certain boat kept reproducing because it knew it could kill its children for more crates.  Let the program run and watch the boats yourself!  Check out the controls section below first.

------------------------------------------------------------------------------------------------------------------------------------------

## Using and Viewing the Program

Download and run the executable.  Make sure the data folder is in the same directory.  This was built using Unity, so it may require the Unity Player being installed on your machine, though I don't recall if it is actually required.

## Controls

 - ASDW + Scroll to change view
 - Click boat to bring up its display
 - Click off the boat to exit its display
 - When viewing a boats display, hover over a neuron to see what values it holds.
 - Lighter edges in the network represent higher weights.
