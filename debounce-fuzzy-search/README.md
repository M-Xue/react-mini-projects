kbar
https://kbar.vercel.app/
https://linear.app/maxxueprojects/team/PRO/active
https://dribbble.com/shots/18801349-Command-K-menu-Untitled-UI
https://dribbble.com/tags/command_k
https://www.google.com/search?q=best+command+k+bar+ui&client=firefox-b-d&sxsrf=ALiCzsaOFsPF3P8m-qdFHYpH1Q8hfZQvIA:1671528394355&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjmuLXB8If8AhWqwTgGHQe4B_oQ_AUoAXoECCMQAw&biw=2560&bih=1327&dpr=1#imgrc=YvQ7qWt7yh75OM


debounce

fuzzy search (Levenshtein Distance)


can pissibily use words or pokemon. click button to switch between them
https://dictionaryapi.dev/
https://pokeapi.co/

## Lessons Learnt

- You can use ternary conditions within HTML properties based on component state

```js
<input type="text" className='inputBox' placeholder={words ? 'Type a word...' : 'Loading...'} disabled={words ? false : true} onChange={handleSearch}  ref={inputRef}/>
```

- useEffect and useLayoutEffect can be used to trigger HTML events, such as ```focus()``` for input elements, for DOM elements that are conditionally rendered by putting the state that conditionally renders the DOM element as a dependency in useEffect/useLayoutEffect.
- You can pass arguments into event handlers by creating an anonymous arrow function and then calling the event handler with the given argument rather than passing the event handler directly.
```js
onClick={() => handleUserSelection(word)}
```
- When using forwardRef, you should use the [correct TypeScript syntax](https://felixgerschau.com/react-forwardref-explained/) for forwardRef rather than the props and individual refs so parent components don't raise issues.
- How to add a background colour that can't be swiped off on mac:
```css
.backgroundColor {
  background-color: blue;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;
}
```

## Bugs Encountered

- When the width of the viewport causes the height of the word definition to extend, if the extended height is longer than the viewport hight, the top gets clipped off and is unscrollable.
  - Try use the word "base" as test case

## Interesting Observations
