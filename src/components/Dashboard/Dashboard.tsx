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
import { columnsPrograms, columnsAttendees } from "./columns";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

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
