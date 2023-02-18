import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getUser, logIn, register } from './HotelApi';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const _createUser = async (username, password, firstname, lastname) => {
        setUser(await register(username, password, firstname, lastname));
    };

    const _logIn = async (username, password) => {
        setUser(await logIn(username, password));
    }

    const _logOut = () => {
        Cookies.remove("SESSION");
        setUser(null);
    }

    useEffect(() => {
        let sessionToken = Cookies.get("SESSION");
        let user = null;
        
        getUser().then(user => {
            if(sessionToken) {
                setUser(user);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ createUser: _createUser, user, logOut: _logOut, logIn: _logIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    let val = useContext(UserContext);
    console.log("UserAuth:", val);
    return val;
};