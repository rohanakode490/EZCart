import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { MdLocalShipping, MdLibraryAdd, MdAccountBalance } from "react-icons/md";
import './CheckoutSteps.css'

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            Icon: <MdLocalShipping size={30} />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            Icon: <MdLibraryAdd size={30} />
        },
        {
            label: <Typography>Payment</Typography>,
            Icon: <MdAccountBalance size={30} />
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        marginTop: "1.5vmax"
    }

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{ color: activeStep >= index ? "#eb4034" : "rgba(0, 0, 0, 0.649)" }}
                            icon={item.Icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>

                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps