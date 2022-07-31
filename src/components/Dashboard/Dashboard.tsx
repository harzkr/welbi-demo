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

interface DashboardProps {
  allPrograms: any[];
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

const columnHelper = createColumnHelper<Programs>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <Typography>Program</Typography>,
  }),
  columnHelper.accessor("location", {
    id: "location",
    cell: (info) => info.getValue(),
    header: () => <Typography>Location</Typography>,
  }),
  columnHelper.accessor("dimension", {
    id: "dimension",
    cell: (info) => info.getValue(),
    header: () => <Typography>Dimension</Typography>,
  }),
  columnHelper.accessor("start", {
    id: "start",
    cell: (info) => {
      return dayjs(info.getValue()).format("h:mm a, D MMM YYYY");
    },
    header: () => <Typography>Starts</Typography>,
  }),
  columnHelper.accessor("end", {
    id: "end",
    cell: (info) => {
      return dayjs(info.getValue()).format("h:mm a, D MMM YYYY");
    },
    header: () => <Typography>Ends</Typography>,
  }),
  columnHelper.accessor("programResidents", {
    id: "programResidents",
    cell: (info) => info.getValue().join(", "),
    header: () => <Typography>Attendees</Typography>,
  }),
];

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const table = useReactTable({
    data: props.allPrograms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Programs" {...a11yProps(0)} />
          <Tab label="Residents" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows.map((row) => (
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
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows.map((row) => (
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
