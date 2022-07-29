import React from "react";
import Landing from "./Landing";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const LandingContainer = () => {
  const logIn = async (data:{email:string}) => {
    try {
      const response = await ApiResponse("post", "/start", data);
      return response;
    } catch (err:any) {
      console.log(err.data.message);
    }
  };

  const mutation = useMutation(logIn, { retry: 1 });

  const handleSubmit = (email: string) => {
    console.log(email);
    mutation.mutate({ email });
  };

  React.useEffect(() => {
    if(mutation.data){
        console.log(mutation.data);

        //localStorage.setItem("accessToken", tokens.access.token);
    }
  },[mutation]);
  return <Landing handleSubmit={handleSubmit} />;
};

export default LandingContainer;
