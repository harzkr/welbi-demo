import {
    createColumnHelper,
} from '@tanstack/react-table';
import { Typography } from '@mui/material';
import dayjs from "dayjs";

interface Programs {
    name: string;
    id: string;
    programResidents: string[];
    location: string;
    dimension: string;
    facilitators: string[];
    start: string;
    end: string;
  }
  
  interface Attendees {
    id: string;
    fullName: string;
    programsAttended: string[];
  }

const columnHelper = createColumnHelper<Programs>();
const columnHelperAttendees = createColumnHelper<Attendees>();

export const columnsPrograms = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Program</Typography>
    ),
  }),
  columnHelper.accessor("location", {
    id: "location",
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Location</Typography>
    ),
  }),
  columnHelper.accessor("dimension", {
    id: "dimension",
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Dimension</Typography>
    ),
  }),
  columnHelper.accessor("start", {
    id: "start",
    cell: (info) => {
      return dayjs(info.getValue()).format("h:mm a, D MMM YYYY");
    },
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Starts</Typography>
    ),
  }),
  columnHelper.accessor("end", {
    id: "end",
    cell: (info) => {
      return dayjs(info.getValue()).format("h:mm a, D MMM YYYY");
    },
    header: () => <Typography style={{ fontWeight: "bold" }}>Ends</Typography>,
  }),
  columnHelper.accessor("programResidents", {
    id: "programResidents",
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Attendees</Typography>
    ),
  }),
];

export const columnsAttendees = [
  columnHelperAttendees.accessor("fullName", {
    id: "fullName",
    cell: (info) => info.getValue(),
    header: () => <Typography style={{ fontWeight: "bold" }}>Name</Typography>,
  }),
  columnHelperAttendees.accessor("programsAttended", {
    id: "programsAttended",
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Programs Attended</Typography>
    ),
  }),
];