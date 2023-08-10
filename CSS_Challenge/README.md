This is a CSS-Challenge from `<SelectCode/>` where I had to turn a figma design file into
an HTML and CSS project. It was an interisting experience because of the limited tools I could use.
Many things I would've done using JavaScript or React.js but this constraint was a good test
for my CSS-only skills.

In the very beginning I had to carefully plan everything out. Some things that were bothering me:

- If there is a collapse button, it means it must be clickable. But how can I trigger a click without JavaScript? 🤔 I didn't try to reinvent the wheel and just used :hover on the sidebar.
- Sidebar expansion should make the sidebar text visible, but display: none -> display: block is not a continius range => it cannot be transitioned => the effect is choppy and the text overflows the sidebar at the beginning of the expansion. I could've left it as it was, but user experience is top priority for me, so I had to experiment. The solution I came up with:

  - before the expansion:
    - text display: none;
    - text opacity: 0;
    - current page icon border: none;
  - during the expansioin:
    - text display: block;
    - text opacity: 0 -> 1;
    - icon border: transparent -> color;

  It still can be improved but for now it is enough.

- I am a fan of interactivity - when a movement of one element affects the other elements in the near.
  It gives the website some life and motion. Thus I decided to make the sidebar expansion affect the main content. To do that it could not be positioned as "fixed" as we normally would position sidebars. If it's not fixed, scrolling isues may appear. For example when I scroll down the sidebar could get scrolled up together with the content. Almost all the problems were solved using display: flex on body and setting height of all the elements so that they fit right into the viewport. Only the project cards container has a scrollable overflow. The only know problem at the moment is the inability of the "gap" property to be set as a percentage of the parent's width. During the sidebar expansion, the project cards could've squized a little to keep the column numbers. At the moment for screens where the cards have no space to move they start wrapping on sidebar expansion. It could've easily been solved using JavaScript, though.

- As it was a CSS challenge I decided to try out SASS and I enjoyed it. SASS allowed me to use nesting instead of the BEM methodology that I would normally apply in plain CSS. Thus, I often relied on the tag names rather than classes or IDs, and I'm not sure if that was a good practice. I would appreciate some feedback on how to improve my code quality and readability.
