import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DashboardProps {
  allPrograms: any[];
  allAttendees: any[];
}

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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columnHelper = createColumnHelper<Programs>();
const columnHelperAttendees = createColumnHelper<Attendees>();

const columnsPrograms = [
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
    cell: (info) => info.getValue().join(", "),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Attendees</Typography>
    ),
  }),
];

const columnsAttendees = [
  columnHelperAttendees.accessor("fullName", {
    id: "fullName",
    cell: (info) => info.getValue(),
    header: () => <Typography style={{ fontWeight: "bold" }}>Name</Typography>,
  }),
  columnHelperAttendees.accessor("programsAttended", {
    id: "programsAttended",
    cell: (info) => info.getValue().join(", "),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Programs Attended</Typography>
    ),
  }),
];

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  console.log(props.allAttendees);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tablePrograms = useReactTable({
    data: props.allPrograms,
    columns: columnsPrograms,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableAttendees = useReactTable({
    data: props.allAttendees,
    columns: columnsAttendees,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          centered
        >
          <Tab label="Programs" {...a11yProps(0)} />
          <Tab label="Residents" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {tablePrograms.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {tablePrograms.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {tableAttendees.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {tableAttendees.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default Dashboard;
