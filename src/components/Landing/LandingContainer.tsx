import React from "react";
import Landing from "./Landing";

const LandingContainer = () => {
  const handleSubmit = (email: string) => {
    console.log(email);
    console.log("submitted");
  };

  return <Landing handleSubmit={handleSubmit} />;
};

export default LandingContainer;
