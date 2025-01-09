import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    token: string | null;
    updateUser: Dispatch<SetStateAction<User | null>>; 
    updateToken: Dispatch<SetStateAction<string | null>>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        } else {
            setUser(null);
            setToken(null);
        }
    
        setIsLoading(false);
    }, []);
    
    const logout = async () => {
        try {
            await api.post('/oauth/logout');
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate("/");
            toast.success("로그아웃 되었습니다.");
        } catch (err) {
            console.error('로그아웃 실패:', err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, token, updateUser: setUser, updateToken: setToken, logout }}>
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