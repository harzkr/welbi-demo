import React from "react";
import Dashboard from "./Dashboard";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const DashboardContainer = () => {
  const getPrograms = async () => {
    try {
      const response = await ApiResponse("get", "/programs");
      return response;
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  const getResidents = async () => {
    try {
      const response = await ApiResponse("get", "/residents");
      return response;
    } catch (err: any) {
      console.log(err.data.message);
    }
  };
  const programs = useQuery(["programs"], getPrograms);
  const residents = useQuery(["residents"], getResidents);

  return <Dashboard programs={programs} residents={residents} />;
};

export default DashboardContainer;
