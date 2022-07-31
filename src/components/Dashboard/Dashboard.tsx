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
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as dayjs from 'dayjs'

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
  startDate: string;
  endDate: string;
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
  columnHelper.accessor("facilitators", {
    id: "facilitators",
    cell: (info) => info.getValue().join(", "),
    header: () => <Typography>Facilitators</Typography>,
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    cell: (info) => info.getValue(),
    header: () => <Typography>Starts</Typography>,
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    cell: (info) => {
        return dayjs(info.getValue()).format('MM/DD/YYYY')
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
  const table = useReactTable({
    data: props.allPrograms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
