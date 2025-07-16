"use client";

import {
  Building2,
  Users,
  CreditCard,
  Wrench,
  Home,
  FileText,
} from "lucide-react";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Units from "./Units";
import Sidebar from "@/components/ui/sidebar";
import Documents from "./Documents";
import Residents from "./Residents";
import Bills from "./Bills";
import Maintenance from "./Maintenance";

export default function ManagerPanel() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  const navItems = [
    { name: "Dashboard", icon: Home, component: <Dashboard /> },
    { name: "Units", icon: Building2, component: <Units /> },
    { name: "Residents", icon: Users, component: <Residents /> },
    { name: "Bills", icon: CreditCard, component: <Bills /> },
    { name: "Maintenance", icon: Wrench, component: <Maintenance /> },
    { name: "Documents", icon: FileText, component: <Documents /> },
    // { name: "Settings", icon: Settings, component: <></> },
  ];

  const getCurrentPage = () =>
    navItems.find((item) => currentPage === item.name)?.component;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main content */}
      <main className="flex-1 p-6">{getCurrentPage()}</main>
    </div>
  );
}
