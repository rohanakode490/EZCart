import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ isAdmin, children }) => {
    const navigate = useNavigate()
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    if (!loading && isAuthenticated === false) {
        navigate("/login");
        return null;
    }
    if (isAdmin === true && user!==undefined && user.role !== 'admin') {
        navigate("/login");
        return null;
    }

    return children

}

export default ProtectedRoute

