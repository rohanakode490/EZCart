import React from "react";
import "./About.css";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/rohanakode";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dhmvz9v9z/image/upload/v1704726825/profile_mepu0o.png"
                            alt="Founder"
                        />
                        <Typography>Rohan Akode</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            Thank You for visiting my website. Hope you liked it!
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw"
                            target="blank"
                        >
                            <FaGithub className="githubSvgIcon" />
                        </a>

                        <a href="https://www.linkedin.com/in/rohan-akode/" target="blank">
                            <FaLinkedin className="LinkedinSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;