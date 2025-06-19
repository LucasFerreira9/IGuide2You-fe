import React, { createContext, useState, useContext } from "react";
import { UserContextType, UserType } from "../../Types/User";

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: null,
});

export type UserProviderProps = React.PropsWithChildren<{
    user?: UserType
}>

export const UserProvider: React.FC<UserProviderProps> = ({ children,user }) => {
    const [user_, setUser] = useState<UserType | null>(user ?? null);
    
    return (
        <UserContext.Provider value={{
            user: user_, 
            setUser:(user)=>{
                setUser(user)
            }
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
