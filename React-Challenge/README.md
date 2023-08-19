# React-Challenge

This is a React-Challenge from `<SelectCode/>` where I had to create a simplified version of the classical chess game.  It was a really good way to test my abilities in React and I enjoyed it.

The most challenging thing was to make a fully functional system of components working together. The hardest challenges were to manage and rerender the changed positions of the chess pieces and their states correctly. I've tried a couple of methods of rendering the changes but they were too inefficient. In the end I came to a system where I have an array of all the squares that contain the full data about the square and when something changes in the array the whole board gets rerendered matching the new array.

The last bonus task was also a tricky one. As I understand the task wanted me to work with React to rerender the board by mirroring it both vertically and horizontally. But the main task of the challenge was problem solving and solving it efficiently. So I came up with an idea to just flip the board literraly  without rerendering anythinig. It was way easier to do and it looks much more pleasant.

To run a demo you should:
1. Download the repository
2. In the terminal open the directory "/React-Challenge"
3. `>` npm i
4. `>` npm run dev
5. open it in on a browser on localhost with the given port
