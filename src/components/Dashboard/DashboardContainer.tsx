import React from "react";
import Dashboard from "./Dashboard";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const DashboardContainer = () => {
  const [allPrograms, setAllPrograms] = React.useState([]);
  const [allAttendees, setAllAttendees] = React.useState([]);

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
      const resAttendees: any = [];

      programs.data.data.map((program: any) => {
        const programResidents = program.attendance.map((resident: any) => {
          const presentResident = resAttendees.find(
            (o: any) => o.id === resident.residentId
          );

          const residentData = presentResident
            ? presentResident
            : residents.data.data.find(
                (o: any) => o.id === resident.residentId
              );

          if (presentResident) {
            let _program = presentResident.attendance.find(
              (o: any) => o.programId === program.id
            );

            if (_program && _program.status === "Active") {
              presentResident.programsAttended.push(program.name);
            }
          } else {
            resAttendees.push({
              ...residentData,
              programsAttended: [program.name],
            });
          }

          return residentData?.firstName + " " + residentData?.lastName;
        });

        resPrograms.push({
          ...program,
          programResidents,
        });
      });

      setAllPrograms(resPrograms);
      setAllAttendees(resAttendees);
    }
  }, [programs, residents]);

  return <Dashboard allPrograms={allPrograms} allAttendees={allAttendees} />;
};

export default DashboardContainer;
