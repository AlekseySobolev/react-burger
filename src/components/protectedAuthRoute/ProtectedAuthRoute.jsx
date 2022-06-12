import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedAuthRoute({ children }) {

  const { isAuth } = useSelector(state => state.auth);

  if (isAuth ) {
    return <Navigate to="/" />;
  }

  return  children;
}

export default ProtectedAuthRoute;