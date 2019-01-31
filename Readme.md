---
typora-copy-images-to: ../Assets/Wireframes
---

# About the App

This is a recreation of the popular windows game Minecraft rebuilt using AngularJs. Other tools used are HTML 5, CSS.

The pages are styled using Bootstrap CSS

## Proposed Features

1. Win and Lose Counter.
2. Scoring System.
3. Facility to Change Background.
4. Change the SoundTrack.
5. Sign In Function to regulate User Access.
6. Various Difficulty Settings.



# App Design

## Architecture

The app is designed using the Model View and Controller Logic.

The application module holds the Game Controller and the User Experience Controller, and the Sign In Controller.

There are three views:

1. The Opening Page
2. The Game / Application Page
3. The Sign in or Sign Up Page 

Each view has a specific controller attached to it.

The sign up/Sign in page will only allow the users to fully access the game. A guest is only allowed to play the game for five times after which he is directed to the home page asking him to sign in/ sign up.

The game has only one controller which initialises with different values based on difficulty selected.

All the other functions are coded as services.

The initial wireframes are shown as follows.

![SignUp](/Users/akshay.srikumar/Desktop/Minesweeper/assets/Wireframes/SignUp.png)

![FirsPage](/Users/akshay.srikumar/Desktop/Minesweeper/assets/Wireframes/FirsPage-8857988.png)

![PlayArea](./assets/Wireframes/PlayArea.png)