import { createContext, ReactNode, useContext, useState } from "react";

import { AuthContextType, AuthContextPropsType } from "../types";


export const AuthContext = createContext<AuthContextPropsType | undefined >(undefined)


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthContextType | null>(null)
  
    return (
       <AuthContext.Provider value={{user, setUser}}>
            {
                children
            }
       </AuthContext.Provider>
    );
  };


  export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };

