import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Address {
    roadAddress: string;
    zoneCode: string;
    jibunAddress: string;
    detailAddress: string;
}


interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    profileImage?: string;
    businessNumber?: string;
    address?: Address;
}

interface UserContextType {
    user: User | null;
    updateUser: Dispatch<SetStateAction<User | null>>; 
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 

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
            navigate("/");
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