# react-context-hooks

React Context &amp; Hooks Tutorial from The Net Ninja

# Steps


## contextapp

npx create-react-app contextapp
cd contextapp
npm start


# Context API

Share state within a component tree. Propos can do that, but it can be messy.

Central place to store data without the need of passing down the props in every component.

Very similar to Redux.

### Theme Context

Context Provider to share data, like:
- current authenticated user
- theme
- prefered language

### The Context Type

Only can be used in Class components, not in functional components.

#### 1. Create the Context

```javascript
// ThemeContext.js
import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

// create a class component
class ThemeContextProvider extends Component {
    // shared data
    state = {
        isLightTheme: true,
        light: {
            sintax: '#555',
            ui: '#ddd',
            bg: '#eee'
        },
        dark: {
            sintax: '#ddd',
            ui: '#333',
            bg: '#555'
        }
    }
    // value={{...this.state}} spread all the objetcts inside state
    // to all other components
    // output the children {this.props.children}
    render() { 
        return (
            <ThemeContext.Provider value={{...this.state}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}
 
export default ThemeContextProvider;
```

#### 2. Pass down to Components

```javascript
// App.js
import React from 'react';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BookList />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
```

#### 3. Access the context data

```javascript
// Booklist.js
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class BookList extends Component {
    static contextType = ThemeContext;
    render() { 
        const { isLightTheme, light, dark } = this.context;
        const theme = isLightTheme ? light : dark;
        return (
            <div className='book-list' style={{color: theme.syntax, background: theme.bg}}>
                <ul>
                    <li style={{color: theme.syntax, background: theme.ui}}>the way of kings</li>
                    <li style={{color: theme.syntax, background: theme.ui}}>the name of the wind</li>
                    <li style={{color: theme.syntax, background: theme.ui}}>the final empire</li>
                </ul>
            </div>
        );
    }
}
 
export default BookList;
```

### Context Consumer

Can be used in Class components or functional components.

Can be used more than one Context at the same time.

```javascript
// Navbar.js
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
    // theme context provided by parent components
    static contextType = ThemeContext;
    render() { 
        return  (
            // ThemeContext.Consumer expects a funcion 
            // that return an JSX
            <ThemeContext.Consumer>{(context) => {
                // printout the context data passed through the provided
                console.log(context);
                // distructing all the values in context
                const {isLightTheme, light, dark} = context;
                const theme = isLightTheme ? light : dark;
                return (
                    // coloring the theme according to the context state
                    <nav style={{ background: theme.ui, color: theme.syntax}}>
                        <h1>Conext App</h1>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </nav>
                )
            }}</ThemeContext.Consumer>
        )
    }
}
 
export default Navbar;
```


## Utils

## VSCode Simple React Snippets

Simple React Snippets

### react developer tools chrome

https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en









