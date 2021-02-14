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
                    <nav style={{ background: theme.ui, color: theme.syntax }}>
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