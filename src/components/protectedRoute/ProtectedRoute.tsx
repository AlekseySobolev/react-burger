import { FC, PropsWithChildren } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import type { TLocationParams } from '../../services/types/data';

// export const ProtectedRoute: FC<RouteProps> = ( {children} ) => { не удалось типизировать, ругается на тип ReactNode
 function ProtectedRoute ({ children }) {

  const location = useLocation() as TLocationParams;

  const { isAuth } = useSelector(state => state.auth);

  if (!isAuth ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return  children;
}

export default ProtectedRoute;