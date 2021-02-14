# react-context-hooks

React Context &amp; Hooks Tutorial from The Net Ninja

https://www.youtube.com/watch?v=bJXAHHpyVes&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI&index=1

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


### 6 - Changing data inside Context

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
    // function to toggle the theme
    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme })
    }
    // value={{...this.state}} spread all the objetcts inside state
    // to all other components
    // output the children {this.props.children}
    render() { 
        return (
            // add a funcion to other children components
            <ThemeContext.Provider value={{...this.state, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}
 
export default ThemeContextProvider;
```

Button to toggle theme

```javascript
// ThemeToggle.js

import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
    static contextType = ThemeContext;
    render() { 
        console.log(this.context)
        // distructing toggleTheme funtion from context
        const { toggleTheme } = this.context;
        return (
            <button onClick={toggleTheme}>Toggle the theme</button>
        );
    }
}
 
export default ThemeToggle;
```

```javascript
// App.js
import React from 'react';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BookList />
        <ThemeToggle />
      </ThemeContextProvider>
    </div>
  );
}

export default App;

```

https://www.youtube.com/watch?v=bJXAHHpyVes&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI&index=6


### 7 - Using Multiple Context Providers in App

```javascript
// App.js
import React from 'react';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import AuthContextProvider from './contexts/AuthContext';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <BookList />
          <ThemeToggle />
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
```


### 8 - Consuming Multiple Contexts

Two Consumer tags

```javascript
// Navbar.js
import React, { Component } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
  // static contextType = ThemeContext;
  render() {
    return (
        <AuthContext.Consumer>{(authContext) => (
            <ThemeContext.Consumer>{(context) => {
                const { isAuthenticated, toggleAuth } = authContext;
                const { isLightTheme, light, dark } = context;
                const theme = isLightTheme ? light : dark;
                return (
                  <nav style={{ background: theme.ui, color: theme.syntax }}>
                    <h1>Context App</h1>
                    <div onClick={ toggleAuth }>
                        { isAuthenticated ? 'Logged in' : 'Logged out' }
                    </div>
                    <ul>
                      <li>Home</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                )
              }}</ThemeContext.Consumer>
        )}
        </AuthContext.Consumer>
    );
  }
}
 
export default Navbar;
```


## Tips

### Use ES6 destructuring syntax

Inside the onInputChange method, we have code like this:

```javascript
const name = event.target.name;
const value = event.target.value;
```
We can use ES6 destructuring syntax to simplify it like this:

```javascript
const { name, value } = event.target;
```

### Simplify arrow functions

In an arrow function, if we have code like this:

```javascript
const add = (a, b) => {
 return a + b;
}
```

Then we can simplify it as shown below:

```javascript
const add = (a, b) => a + b;
```

So if we're returning an object from arrow function like this:

```javascript
const getUser = () => {
 return {
  name: 'David,
  age: 35
 }
}
```

To make it work we can wrap the object in round brackets like this:

```javascript
const getUser = () => ({
  name: 'David,
  age: 35
})
```

So we can use the same technique to simplify our setState function call.

```javascript
setState((prevState) => {
  return {
    ...prevState,
    [name]: value
  };
});

// the above code can be simplified as:
setState((prevState) => ({
  ...prevState,
  [name]: value
}));
```


## Utils

### VSCode Simple React Snippets

Simple React Snippets

### react developer tools chrome

https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

### React Data Fecth Cheatsheet

https://www.freecodecamp.org/news/fetch-data-react/

[React Data Fecth Cheatsheet](./utils/The_React_Data_Fetching_Cheatsheet_(2021).pdf)

More helpful content:
https://www.freecodecamp.org/news/author/reed/







