import React from "react";
import Landing from "./Landing";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";
import { useNavigate } from "react-router-dom";

const LandingContainer = () => {
  const Navigate = useNavigate();

  const logIn = async (data: { email: string }) => {
    try {
      const response = await ApiResponse("post", "/start", data);
      return response;
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  const handleSubmit = (email: string) => {
    mutation.mutate({ email });
  };

  const mutation = useMutation(logIn, { retry: 1 });

  React.useEffect(() => {
    if (mutation.data) {
      const { token } = mutation.data.data.data;
      localStorage.setItem("accessToken", token);

      Navigate("/");
    }
  }, [mutation, Navigate]);
  return <Landing handleSubmit={handleSubmit} />;
};

export default LandingContainer;
