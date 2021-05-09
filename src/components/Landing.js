
import React from "react";
import BackgroundSlider from "react-background-slider";
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'




const Landing = (props) => {


    return (
        <>
            <BackgroundSlider
                images={[image1, image2]}
                duration={5}
                transition={2}
            />
            <div className="wrapper-landing">
                <div className="form-landing">
                    <h1 className="landing-title">Partner In Magic</h1>
                    <h6 className="landing-subtitle">Find Your Perfect Match</h6>
                    <button className="button-landing" onClick={(e) => { props.history.push('/login') }}>
                        <span>Login</span>
                    </button>
                    <button className="button-landing" onClick={(e) => { props.history.push('/register') }}>
                        <span>Register</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Landing