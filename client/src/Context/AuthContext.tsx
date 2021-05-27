import React, { useState, createContext, FunctionComponent, useContext, useEffect } from 'react'

export const AuthContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
    auth: {};
    getAuth: (auth:boolean) => void;
}

export const AuthProvider: FunctionComponent = ({ children }) => {
    
    const [auth, setAuth] = useState<{}>({})
    console.log(auth)

   
    const getAuth = (auth:boolean) => {
        
        setAuth(auth) 
        console.log('kör getAuth funktionen')
        
    }

    const options = {
        method: 'get'
    }

    const fetchAuth = async () => {
        await fetch("/auth", options)
        .then(function (res) {
            if (res.status === 400) {
            return;
            }
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            setAuth({
                isAdmin: data.isAdmin,
                userId: data._id})
        })
        .catch(function (err) {
            console.error(err);
        });
    };
    
    fetchAuth()

    return (
        <AuthContext.Provider value={{ getAuth, auth }}>
            {children}
        </AuthContext.Provider>
    )    
};

// Custom Hooks

// Using all in ProductContext
export const useAuthContext = () => useContext<Context>(AuthContext)