import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {

  const location = useLocation();

  const { isAuth } = useSelector(state => state.auth);

  if (!isAuth ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return  children;
}

export default ProtectedRoute;