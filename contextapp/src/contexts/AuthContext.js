import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        isAutenticated: false
    }

    toggleAuth = () => {
        this.setState({isAutenticated: !this.state.isAutenticated});
    }
    render() { 
        return (
            <AuthContext.Provider values={{...this.state, toggleAuth: this.toggleAuth}}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
 
export default AuthContextProvider;
