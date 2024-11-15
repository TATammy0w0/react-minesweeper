# CS 5610 Project 2: Minesweeper

Built by: Wenjing Ma (NUID: 002248278)

Link to the project: [wenjing-ma-project2.onrender.com](https://wenjing-ma-project2.onrender.com/).

## Writeup

### What were some challenges you faced while making this app?

One of the biggest challenges I faced was designing the project structure. Initially, I used a `Board.js` to manage the state of each cell, but I realized this approach made state management more complex. Updating the state of a single cell would trigger a re-render of the entire board, which felt inefficient and unnecessary. To address this, I moved the board's state and cell update logic into `GameContext.js`.

Another challenge came from working with certain unfamiliar React syntax. This sometimes led to extensive debugging sessions, where I’d find that a feature didn’t work simply because a prop wasn’t passed correctly.

### Given more time, what additional features, functional or design changes would you make

Given more time, I would replace the flag and mine emojis with image icons. Additionally, I would add a flagging button for mobile users, since mobile devices don’t support right-click. When selected, this button would put the user in flagging mode, allowing them to mark cells as flags.

### What assumptions did you make while working on this assignment?

I assumed that when the instruction mentioned mobile-friendly, it meant the page layout should appear well-suited to mobile screens. I don't see a reason for adding a button to toggle between web and mobile views. Instead, I used `@media (max-width: 700px)` to adjust the cell size for users viewing the site on mobile.

### How long did this assignment take to complete?

I took some additional online courses in React before starting this assignment. The online courses took about 6 hours, and implementing the assignment took about 60 hours.

### (Optional) Any feedback on this challenge?  What did you like or not like about implementing this project?

It was fun to implement the game. However, I think starting with a project template would have been beneficial, as this project felt like quite a big leap from the mini-assignments and lecture content. 
