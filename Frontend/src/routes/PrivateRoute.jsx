
import { Navigate } from 'react-router';
import { useAuth } from '../components/security/AuthContext';

const PrivateRoute = ({ children }) => {

    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/logout" />

};

export default PrivateRoute;