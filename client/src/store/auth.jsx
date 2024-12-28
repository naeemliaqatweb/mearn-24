import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token , setToken ] = useState(localStorage.getItem('token'));
    const [user , setUser ] = useState("");
    const storeTokenInLS  = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };   
    let isLoggedIn = !!token;
    
    const LogoutUser = () => {
        setToken('');
        return localStorage.removeItem('token');
    }

    // authentication
    const userAuthentication = async () => {
        
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });            

            if(response.ok){
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        userAuthentication();
    },[token]);

    return <AuthContext.Provider value={{isLoggedIn , storeTokenInLS , LogoutUser , user}}>
        {children}
    </AuthContext.Provider>
}

//custom hook

export const useAuth = () => {
    const authContentValue = useContext(AuthContext);

    if(!authContentValue)
    {
        throw new Error('use Auth out side of the provider');
    }
    return authContentValue;
}