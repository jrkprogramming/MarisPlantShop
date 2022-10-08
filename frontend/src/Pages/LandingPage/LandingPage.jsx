import React from "react";
import "./LandingPage.css";
import Video from "../../vid/landingpagevideo.mp4";

const LandingPage = () => {
  return (
    <div className="video-container">
      <video src={Video} loop autoPlay muted />

      <div className="main">
        <h2>Plants and Such</h2>
        <h1>Cultivated by Marinela</h1>
        {/* <p>
          Discover hidden gems, wherever you are. This App is the perfect way to
          explore different cities in a new way using maps to mark and upload
          your favorite "off the grid" places to share with others!{" "}
        </p> */}
        <br></br>

        <div className="buttons">
          <a href="/users/login">
            <button className="btn1">LOGIN</button>
          </a>

          <a href="/users/signup">
            <button className="btn2">SIGN-UP</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
