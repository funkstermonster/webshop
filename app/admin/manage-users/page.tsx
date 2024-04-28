import Sidebar from "@/app/components/ui/sidebar";
import { TableForUser } from "@/app/components/ui/user-table";

const UserTable = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-grow">
        <div className="entry flex flex-row">
          <h1>User Table</h1>
        </div>
        <TableForUser registeredUsers={[]} />
      </div>
    </div>
  );
};

export default UserTable
         