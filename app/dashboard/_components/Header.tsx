import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center">
      <div className='flex gap-2 items-center  p-2 border rounded-md w-full max-w-md ml-10'>
        <Search/>
        <input type="text" placeholder="Search..." className="outline-none" />
      </div>
      <div>
        <h2 className="bg-primary p-1 rounded-full text-xs text-white">
          Join Membership
        </h2>
      </div>
    </div>
  );
}

export default Header;