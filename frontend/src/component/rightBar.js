import React from "react";
import {Link} from "react-router-dom"
const RightBar = () => {
  const User=JSON.parse(localStorage.getItem("user"));
  return (
    <>
     {User ?  ( <div className="right-sidebar">
      <div className="signup-container">
        <h3>New to Twitter?</h3>
        <p>Sign up now to get your own personalized timeline!</p>
        <div className="signup-btn">
          <img src="./assets/google.png" className="signup-btn-icon" alt="" />
          <p>Signup with Google</p>
        </div>
        <div className="signup-btn">
          <img src="./assets/apple.png" className="signup-btn-icon" alt="" />
          <p style={{ fontWeight: " 600" }}>Signup with Apple</p>
        </div>
        <div className="signup-btn">
          <p style={{ fontWeight: " 600" }}>Signup with Email or phone</p>
        </div>
        <p>
          By signing up, you agree to the
          <a href="#" className="twitter-links">
            Terms of Service
          </a>{" "}
          and
          <a href="#" className="twitter-links">
            Privacy Policy
          </a>
          , including
          <a href="#" className="twitter-links">
            Cookie Use
          </a>
          .
        </p>
      </div>
      <div className="right-links">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
      </div>
      <div className="right-links">
        <p>Accessibility</p>
        <p>Ads Info</p>

        <div className="dropdown">
          <p className="more-p-tag" onclick="dropDownFunction()">
            More...
          </p>
          <div id="myDropdown" className="dropdown-content">
            <a href="#">About</a>
            <a href="#">Status</a>
            <a href="#">Twitter For Business</a>
            <a href="#">Developers</a>
          </div>
        </div>
      </div>
      <div className="right-links">
        <p>© 2022 Twitter, Inc.</p>
      </div>
    </div>): (
        <div className="right-sidebar">
    <div className="signup-container">
      <h3>Trend</h3>
      <p>Sign up now to get your own personalized timeline!</p>


        <p>Gönderiler</p>
       <Link to="populer" style={{textDecoration:"none",color:"white"}}> <h3>#populer</h3></Link>
  
    
    </div>
  
  </div>)
  }
  
   
    </>
  );
};

export default RightBar;
