import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
interface DashboardProps {
  programs: UseQueryResult<any, unknown>;
  residents: UseQueryResult<any, unknown>;
}

interface Programs {
  id: string;
  programs: string[];
  attendees: string[];
}

const columnHelper = createColumnHelper<Programs>();

const columns = [
  columnHelper.accessor("programs", {
    cell: (info) => info.getValue(),
    header: () => <span>Programs</span>,
  }),
  columnHelper.accessor("attendees", {
    id: "attendees",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
];

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  console.log(props);

  const [data, setData] = React.useState([...props.programs?.data?.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Dashboard;
