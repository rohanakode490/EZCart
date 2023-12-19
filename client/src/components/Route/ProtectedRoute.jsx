import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { loading, isAuthenticated } = useSelector(state => state.user)
    if (!loading && isAuthenticated === false) {
        navigate("/login");
        return null;
    }
    else {
        return children
    }
}

export default ProtectedRoute

