import React from "react";
import Dashboard from "./Dashboard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../../utils/ApiResponse";

const DashboardContainer = () => {
  const [allPrograms, setAllPrograms] = React.useState([]);
  const [allAttendees, setAllAttendees] = React.useState([]);

  const [refetching, setRefetching] = React.useState(false);

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

  const addNewProgram = async (data: any) => {
    try {
      const response = await ApiResponse("post", "/programs", data);
      return response;
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  const addNewAttendee = async (data: any) => {
    try {
      const response = await ApiResponse("post", "/residents", data);
      return response;
    } catch (err: any) {
      console.log(err.data.message);
    }
  };

  const programs = useQuery(["programs"], getPrograms);
  const residents = useQuery(["residents"], getResidents);

  const addProgram = useMutation((programData) => addNewProgram(programData), {
    onSuccess: () => {
      programs.refetch();
      setRefetching(true);
    },
  });
  const addAttendee = useMutation(
    (attendeeData) => addNewAttendee(attendeeData),
    {
      onSuccess: () => {
        residents.refetch();
        setRefetching(true);
      },
    }
  );

  React.useEffect(() => {
    if (
      programs.data &&
      residents.data &&
      (allPrograms.length !== programs.data.data.length ||
        allAttendees.length !== residents.data.data.length)
    ) {
      setRefetching(false);
      const resPrograms: any = [];
      const resAttendees: any = [];

      programs.data.data.map((program: any) => {
        const programResidents = program.attendance.map((resident: any) => {
          const residentData = residents.data.data.find(
            (o: any) => o.id === resident.residentId
          );

          return residentData?.name;
        });

        resPrograms.push({
          ...program,
          programResidents: programResidents.join(", "),
        });
      });

      residents.data.data.map((resident: any) => {
        const attendedPrograms: any[] = [];

        resident.attendance.map((program: any) => {
          if (program.status === "Active") {
            const programData = programs.data.data.find(
              (o: any) => o.id === program.programId
            );

            if (programData && !attendedPrograms.includes(programData.name)) {
              attendedPrograms.push(programData.name);
            }
          }
        });
        resAttendees.push({
          ...resident,
          programsAttended: attendedPrograms.join(", "),
        });
      });

      setAllPrograms(resPrograms);
      setAllAttendees(resAttendees);
    }
  }, [programs, residents, refetching]);

  return (
    <Dashboard
      allPrograms={allPrograms}
      allAttendees={allAttendees}
      addAttendee={addAttendee}
      addProgram={addProgram}
    />
  );
};

export default DashboardContainer;
