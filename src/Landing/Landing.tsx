import React from "react";
import { Typography, TextField, Button } from "@mui/material";

const Landing = () => {

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <div>
      <Typography variant="h1">Enter your email</Typography>

      <TextField
        id="email"
        label="Email"
        variant="filled"
        onChange={handleInput}
      />

      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default Landing;
