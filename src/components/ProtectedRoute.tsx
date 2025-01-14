import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  role: string; 
  allowedRoles: string[]; 
  children: ReactNode; 
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  role,
  allowedRoles,
  children,
}) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
