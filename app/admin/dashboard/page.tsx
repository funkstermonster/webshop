

import { Sidebar } from "@/app/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="entry flex flex-row">

      <LayoutDashboard />
      <h1>Admin Dashboard</h1>
      </div>
      <Sidebar/>
    </div>
  );
};

export default AdminDashboard;
