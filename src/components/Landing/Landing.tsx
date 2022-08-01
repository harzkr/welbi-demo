import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { email_valid_pattern } from "../../utils/constants";
interface LandingProps {
  handleSubmit: (values: string) => void;
}

const Landing: React.FunctionComponent<LandingProps> = (
  props: LandingProps
) => {
  const [email, setEmail] = React.useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <div className="content__container" >
        <Typography variant="h6">Enter your email</Typography>

        <TextField
          id="email"
          label="Email"
          variant="filled"
          onChange={handleInput}
          style={{
            marginTop: "1rem",
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          disabled={email_valid_pattern.test(email) ? false : true}
          onClick={() => props.handleSubmit(email)}
          className="button__container"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Landing;
