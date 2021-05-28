import React, { useState, createContext, FunctionComponent, useContext, useEffect } from 'react'

export const AuthContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
    authAdmin: boolean;
    auth: boolean;
    getAuth: (auth:boolean) => void;
}

export const AuthProvider: FunctionComponent = ({ children }) => {
    
    const [authAdmin, setAuthAdmin] = useState<boolean>(false)
    const [auth, setAuth] = useState<boolean>(false)
    console.log(auth)
   
    const getAuth = (auth:boolean) => {
        setAuth(auth) 
        console.log('kör getAuth funktionen')
    }

    const options = {
        method: 'get'
    }

    useEffect(() => {
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
                const user = data
                setAuthAdmin(user.isAdmin)
                setAuth(user.userId === null ? false : true)
            })
            .catch(function (err) {
                console.error(err);
            });
        };
        
        fetchAuth()
    })

    

    return (
        <AuthContext.Provider value={{ auth, getAuth, authAdmin }}>
            {children}
        </AuthContext.Provider>
    )    
};

// Custom Hooks

// Using all in ProductContext
export const useAuthContext = () => useContext<Context>(AuthContext)