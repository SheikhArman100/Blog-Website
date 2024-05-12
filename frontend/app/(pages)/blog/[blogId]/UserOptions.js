import useUserInfo from "@/lib/hooks/useUserInfo.js";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const UserOptions = () => {
    const { data } = useUserInfo();
    const user = data?.user;
  return (
    <>
    {
        user &&<div className="size-8 flex items-center justify-center rounded-full border border-indigo-500">
        <EllipsisVertical className="size-6" />
      </div>
    }
    </>
    
  );
};

export default UserOptions;
