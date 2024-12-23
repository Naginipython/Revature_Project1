import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";
import User from "./models/userModel";
import { toast } from "react-toastify";

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    createUser: (firstName: string, lastName: string, username: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const response = await axios.post("http://localhost:8080/auth", {
            username: username,
            password: password
        },
        {withCredentials: true});

        if (response.status == 200) {
            setUser(response.data);
            return true;
        }
        return false;
    }
    const logout = () => {
        axios.get("http://localhost:8080/auth/logout", {withCredentials: true})
            .then(res => {
                console.log(res);
                setUser(null);
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to logout");
            });
    }
    const createUser = async (firstName: string, lastName: string, username: string, password: string) => {
        const response = await axios.post("http://localhost:8080/user", {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        });
        
        if (response.status == 200) {
            setUser(response.data);
            return true;
        }

        return false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, createUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}