import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';

interface User {
    id: string;
    name: string;
    role?: string;
    profileImage?: string;
}

interface UserContextType {
    user: User | null;
    updateUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const logout = async () => {
        try {
            await api.post('/oauth/logout');
            setUser(null);
            localStorage.removeItem('user');
        } catch (err) {
            console.error('로그아웃 실패:', err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, updateUser: setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default UserProvider;
export { useUserContext };