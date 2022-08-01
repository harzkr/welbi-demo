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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { UseMutationResult } from "@tanstack/react-query";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { DebouncedInput } from "../Shared/DebounceInput";
import GeneralModal from "../Shared/GeneralModal";
import {
  columnsPrograms,
  columnsAttendees,
  columnHelperAttendees,
} from "./columns";
import "./styles.css";

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
  addProgram: UseMutationResult<any, unknown, void, unknown>;
  addAttendee: UseMutationResult<any, unknown, void, unknown>;
  attendProgram: UseMutationResult<any>;
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

  const [selectedResident, setSelectedResident] = React.useState<any>();

  const [modifiedColumns] = React.useState([
    ...columnsAttendees,
    columnHelperAttendees.display({
      id: "actions",
      cell: (props) => (
        <>
          <Button
            onClick={() => {
              setSelectedResident(props.row.original);
              setBookPrograms(true);
            }}
          >
            Book Program
          </Button>
        </>
      ),
    }),
  ]);

  const [programForm, setProgramForm] = React.useState(false);
  const [attendeeForm, setAttendeeForm] = React.useState(false);
  const [bookPrograms, setBookPrograms] = React.useState(false);

  const [formType, setFormType] = React.useState("");

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
    columns: modifiedColumns,
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

  const modalClose = () => {
    setProgramForm(false);
    setAttendeeForm(false);
  };

  const handleSubmission = (data: any) => {
    if (programForm) {
      props.addProgram.mutate(data);
    } else {
      props.addAttendee.mutate(data);
    }
  };

  React.useEffect(() => {
    if (programForm) {
      setFormType("Program");
    } else if (attendeeForm) {
      setFormType("Attendee");
    }
  }, [programForm, attendeeForm]);

  return (
    <div>
      <GeneralModal
        openModal={programForm || attendeeForm}
        modalClose={modalClose}
        modalType={formType}
        handleSubmission={handleSubmission}
      />
      <Dialog open={bookPrograms} onClose={() => setBookPrograms(false)}>
        <DialogTitle>Book Program For: {selectedResident?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Select Any Program from the list
          </DialogContentText>

          {props.allPrograms.map((program) => (
            <MenuItem key={program.id} onClick={()=>{
              props.attendProgram.mutate({
                programId: program.id,
                residentId: selectedResident.id,
              });
              setBookPrograms(false);
            }}>
              {program.name}
            </MenuItem>))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookPrograms(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
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

      <div className="buttons__group">
        <Button
          onClick={() => setProgramForm(true)}
          variant="outlined"
          className="button__height"
        >
          <Typography style={{ fontSize: 12 }}>Add Program</Typography>
        </Button>
        <Button
          onClick={() => setAttendeeForm(true)}
          variant="outlined"
          color="secondary"
          className="button__height"
        >
          <Typography style={{ fontSize: 12 }}>Add Resident</Typography>
        </Button>
      </div>
      <TabPanel value={value} index={0}>
        <div
          style={{
            marginBottom: 24,
          }}
        >
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
        <div
          style={{
            marginBottom: 24,
          }}
        >
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
