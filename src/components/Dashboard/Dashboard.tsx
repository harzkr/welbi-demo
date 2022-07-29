import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
interface DashboardProps {
    programs: UseQueryResult<any, unknown>;
    residents: UseQueryResult<any, unknown>;
}

const Dashboard: React.FC<DashboardProps> = (props:DashboardProps) => {
    console.log(props);
    
    return <div>Dashboard</div>;
}

export default Dashboard;