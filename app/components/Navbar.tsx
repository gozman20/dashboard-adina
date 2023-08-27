import React from "react";
import { MainNav } from "./MainNav";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="h-16 flex items-center pl-6">
        <MainNav />
      </div>
    </div>
  );
};

export default Navbar;
