"use client";

import Table from "@/components/shared/Table";
import { Column } from "@/types/table";
import { UserType } from "@/types/user";
import { deleteUserService, updateUserById } from "../services/users";
import Dropdown from "@/components/ui/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  saveUsersData,
  selectUserId,
  toggleUserEditModal,
} from "@/state/features/userSlice";
import EditUserModal from "./EditUserModal";
import { useEffect } from "react";

interface UserRoleProps {
  role: string;
  userId: number;
  onUpadteRole: (userId: number, role: string) => void;
}

const ROLES = [
  {
    label: "User",
    accessor: "user",
  },
  {
    label: "Admin",
    accessor: "admin",
  },
  {
    label: "VIP",
    accessor: "vip",
  },
];

const UserRole = ({ role, userId, onUpadteRole }: UserRoleProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>{role}</Dropdown.Trigger>
      <Dropdown.Menu>
        {ROLES.map((option) => (
          <Dropdown.Item
            onClick={() => onUpadteRole(userId, option.accessor)}
            key={option.accessor}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

interface UserTableProps {
  userData: UserType[];
}

const UserTable = ({ userData: users }: UserTableProps) => {
  const COLUMNS: Column<UserType>[] = [
    {
      header: "id",
      accessor: "id",
    },
    {
      header: "Full Name",
      accessor: "full_name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
      render: (value, row) => {
        return (
          <UserRole
            userId={row.id}
            onUpadteRole={onUpdateRole}
            role={value as string}
          />
        );
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { isUserEditModalOpen, usersData } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    dispatch(saveUsersData(users));
  }, [dispatch, users]);

  const onDelete = async (row: UserType) => {
    const res = await deleteUserService(row.id);
    return res.data;
  };

  const onEdit = (row: UserType) => {
    const userId = row.id;
    dispatch(selectUserId(userId));
    dispatch(toggleUserEditModal());
  };

  const onUpdateRole = async (userId: number, role: string) => {
    try {
      const res = await updateUserById({ id: userId, role });
      console.log("res: ", res);
      if (res.success) {
        const updatedUser = usersData.map((user) =>
          user.id === userId ? { ...user, role } : user
        );
        dispatch(saveUsersData(updatedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table
        onDelete={onDelete}
        data={usersData}
        columns={COLUMNS}
        onEdit={onEdit}
      />
      {isUserEditModalOpen && <EditUserModal />}
    </>
  );
};

export default UserTable;
