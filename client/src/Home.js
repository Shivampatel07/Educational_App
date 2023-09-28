import React from "react";
import "./css/App.css";
import {  Carous, Feature1, Feature2 } from "./Tailwindcompo";

function Home() {
  return (
    <>
      <div id="bgImage" className="parallax"></div>
      <div id="Home" className="attributes">
        <div id="container">
          <h1>Learn something new</h1>
          <p>
            Are you ready to test your knowledge and have some fun? Look no
            further! Our quiz game website is the perfect place for you to
            challenge yourself and learn something new.
          </p>
          <p>
            What's more, our website is easy to use and completely free. You can
            play as many quizzes as you like, and even challenge your friends to
            see who knows more. With our leaderboard, you can compete with other
            players from all over the world and show off your skills.
          </p>
          <p>
            So what are you waiting for? Join us today and start your quiz
            journey. Get ready to have fun and learn something new!
          </p>
        </div>
        <div id="img1">
          <img src="images/1st.jpg" width="100%" alt="ERROR" />
        </div>
      </div>
      <div id="Home3">
        <Feature1 />
      </div>
      {/* <div id="bgImage1" className="parallax"></div> */}
      <div
        id="Home1"
        className="attributes carousel-slide"
        style={{ maxWidth: "1000px", margin: "20px auto" }}
      >
        <Carous />
      </div>
      <div id="Home2">
        <Feature2 />
      </div>
      <div id="Home4" className="tw-m-10"></div>
    </>
  );
}

export default Home;
