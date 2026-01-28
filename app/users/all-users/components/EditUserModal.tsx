"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import {
  saveSelectedUser,
  saveUsersData,
  selectUserId,
  toggleUserEditModal,
} from "@/state/features/userSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { fetchUserById, updateUserById } from "../../services/users";

const EditUserModal = () => {
  const { selectedUserId, selectedUserData, usersData } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [userFields, setUserFields] = useState({
    id: selectedUserData?.id,
    email: selectedUserData?.email || "",
    fullName: selectedUserData?.full_name || "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const saveSelectedUserData = async () => {
      try {
        if (!selectedUserId) return;
        const res = await fetchUserById(selectedUserId as number);
        const data = res.data;
        dispatch(saveSelectedUser(data));
      } catch (error) {
        console.log(error);
      }
    };
    saveSelectedUserData();
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    if (selectedUserData) {
      setUserFields({
        id: selectedUserData.id,
        fullName: selectedUserData.full_name,
        email: selectedUserData.email,
      });
    }
  }, [selectedUserData]);

  const onModalClose = () => {
    dispatch(toggleUserEditModal());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserFields((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onDecline = () => {
    onModalClose();
    selectUserId(null);
  };

  const onEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        id: userFields.id,
        full_name: userFields.fullName,
        email: userFields.email,
      };

      const res = await updateUserById(payload);
      if (res.success) {
        const updatedUsers = usersData.map((user) =>
          user.id === res.data.id ? res.data : user,
        );
        dispatch(saveUsersData(updatedUsers));
        onModalClose();
      } else {
        setError(res); //sets error to state
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal modalTitle="Edit User" onClose={onModalClose}>
      <form onSubmit={onEdit} className="space-y-4">
        <div>
          <Label className="text-white" size={"sm"}>
            Full Name
          </Label>
          <Input
            onChange={onChange}
            value={userFields.fullName}
            name="fullName"
            placeholder="Enter fullName"
          />
        </div>
        <div>
          <Label className="text-white" size={"sm"}>
            Email
          </Label>
          <Input
            name="email"
            onChange={onChange}
            value={userFields.email}
            type="email"
            placeholder="Enter Email"
          />
        </div>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        <div className="p-4 bg-dark-gray flex gap-2 items-center justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            className="hover:bg-green-500"
            variant={"default"}
          >
            {isLoading ? <ClipLoader size={25} color="white" /> : "Edit"}
          </Button>
          <Button
            className="hover:bg-red-500"
            type="reset"
            onClick={onDecline}
            variant={"default"}
          >
            Decline
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
