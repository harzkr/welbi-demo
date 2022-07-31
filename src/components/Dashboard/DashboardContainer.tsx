import React from "react";
import Dashboard from "./Dashboard";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const DashboardContainer = () => {
  const [allPrograms, setAllPrograms] = React.useState([]);

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

  React.useEffect(() => {
    if (programs.data && residents.data && allPrograms.length === 0) {
      const resPrograms: any = [];
      programs.data.data.map((program: any) => {
        const programResidents = program.attendance.map((resident: any) => {
          const residentData = residents.data.data.find(
            (o: any) => o.id === resident.residentId
          );

          return residentData?.firstName + " " + residentData?.lastName;
        });

        resPrograms.push({
          ...program,
          programResidents,
        });
      });
      setAllPrograms(resPrograms);
    }
  }, [programs, residents]);

  return <Dashboard allPrograms={allPrograms} />;
};

export default DashboardContainer;
