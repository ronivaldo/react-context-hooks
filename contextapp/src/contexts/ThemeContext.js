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