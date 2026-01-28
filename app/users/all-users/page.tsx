import UserTable from "./components/UserTable";
import { fetchUsersData } from "../services/users";

const Users = async () => {
  const usersData = await fetchUsersData();
  console.log("usersData", usersData);
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-100px)]">
      <h1 className="text-3xl font-bold">Users</h1>
      <UserTable userData={usersData.data} />
    </div>
  );
};

export default Users;
