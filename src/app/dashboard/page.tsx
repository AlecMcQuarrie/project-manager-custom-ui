"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
    </>
  );
}
