import "./OrderSuccess.css";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <MdCheckCircle />

            <Typography>Your Order has been Placed successfully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;