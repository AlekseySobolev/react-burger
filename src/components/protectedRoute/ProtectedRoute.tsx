import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import type { TLocationParams, TUserOrderDescription } from '../../services/types/data';

function ProtectedRoute({ children }) {

  const location = useLocation() as TLocationParams;

  const { isAuth } = useSelector(state => state.auth);

  if (!isAuth ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return  children;
}

export default ProtectedRoute;