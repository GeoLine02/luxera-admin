"use client";

import { UserType } from "@/types/user";
import Dropdown from "@/components/ui/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  saveUsersData,
  selectUserId,
  toggleUserEditModal,
} from "@/state/features/userSlice";
import EditUserModal from "./EditUserModal";
import { useEffect, useState } from "react";
import { deleteUserService, updateUserById } from "../../services/users";
import TableComponent, { Column } from "@/components/shared/Table";
import { EllipsisVertical } from "lucide-react";

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

interface ActionsProps {
  row: UserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: (row: UserType) => Promise<any>;
  onEdit: (row: UserType) => void;
}

const Actions = ({ onDelete, onEdit, row }: ActionsProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <EllipsisVertical color="black" />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>View</Dropdown.Item>
        <Dropdown.Item onClick={() => onEdit(row)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => onDelete(row)}>Delete</Dropdown.Item>
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
      id: "id",
      label: "ID",
    },
    {
      id: "full_name",
      label: "Full Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "role",
      label: "Role",
      render: (value, row) => (
        <UserRole
          userId={row.id}
          onUpadteRole={onUpdateRole}
          role={value as string}
        />
      ),
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch<AppDispatch>();
  const { isUserEditModalOpen, usersData } = useSelector(
    (state: RootState) => state.userReducer,
  );

  console.log(usersData);

  useEffect(() => {
    dispatch(saveUsersData(users));
  }, [dispatch, users]);

  const onDelete = async (row: UserType) => {
    const res = await deleteUserService(row.id);
    return res.data;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (row: UserType) => {
    const userId = row.id;
    dispatch(selectUserId(userId));
    dispatch(toggleUserEditModal());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onUpdateRole = async (userId: number, role: string) => {
    try {
      const res = await updateUserById({ id: userId, role });
      console.log("res: ", res);
      if (res.success) {
        const updatedUser = usersData.map((user) =>
          user.id === userId ? { ...user, role } : user,
        );
        dispatch(saveUsersData(updatedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableComponent
        columns={COLUMNS}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rows={usersData}
        rowsPerPage={rowsPerPage}
        rowKey="id"
        actions={(row) => (
          <Actions row={row} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
      {isUserEditModalOpen && <EditUserModal />}
    </>
  );
};

export default UserTable;
