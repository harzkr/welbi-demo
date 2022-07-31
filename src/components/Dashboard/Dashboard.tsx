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
  Button,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";
import { DebouncedInput } from "../Shared/DebounceInput";

import dayjs from "dayjs";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
          <>{children}</>
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
    cell: (info) => info.getValue(),
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
    cell: (info) => info.getValue(),
    header: () => (
      <Typography style={{ fontWeight: "bold" }}>Programs Attended</Typography>
    ),
  }),
];

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const [globalFilterPrograms, setGlobalFilterPrograms] = React.useState("");
  const [globalFilterAttendees, setGlobalFilterAttendees] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tablePrograms = useReactTable({
    data: props.allPrograms,
    columns: columnsPrograms,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: globalFilterPrograms,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilterPrograms,
    globalFilterFn: fuzzyFilter,
  });

  const tableAttendees = useReactTable({
    data: props.allAttendees,
    columns: columnsAttendees,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: globalFilterAttendees,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilterAttendees,
    globalFilterFn: fuzzyFilter,
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

      <div
        style={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-evenly",
          height: 64,
          marginTop: 24,
        }}
      >
        <Button style={{ height: 40 }} variant="outlined">
          <Typography>Add Program</Typography>
        </Button>
        <Button style={{ height: 40 }} variant="outlined" color="secondary">
          <Typography>Add Attendee</Typography>
        </Button>
      </div>
      <TabPanel value={value} index={0}>
        <div>
          <DebouncedInput
            value={globalFilterPrograms ?? ""}
            onChange={(value) => setGlobalFilterPrograms(String(value))}
            label="Search all columns"
            textfieldId="search-all-programs"
          />
        </div>
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
        <div>
          <DebouncedInput
            value={globalFilterAttendees ?? ""}
            onChange={(value) => setGlobalFilterAttendees(String(value))}
            label="Search all columns"
            textfieldId="search-attendees"
          />
        </div>
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
