import { MdError } from "react-icons/md";
import "./NotFound.css";
import Typography from '@mui/material/Typography'
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="PageNotFound">
            <MdError />

            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;
