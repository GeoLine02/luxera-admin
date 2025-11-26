import { UserType } from "@/types/user";
import api from "@/utils/axios";

export const fetchUsersData = async () => {
  try {
    const res = await api.get(`/user/all`);
    if (res.status !== 200) {
      return res.data.message;
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserService = async (userId: number) => {
  try {
    const res = await api.delete(`http://localhost:3000/api/user/${userId}`);
    if (res.status !== 200) {
      return res.data.message;
    }

    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserById = async (userId: number) => {
  try {
    console.log("userId", userId);
    const res = await api.get(`http://localhost:3000/api/user/${userId}`);
    if (res.status !== 200) {
      return res.data.message;
    }
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (userData: Partial<UserType>) => {
  try {
    const res = await api.put(`http://localhost:3000/api/user/${userData.id}`, {
      email: userData.email,
      fullName: userData.full_name,
      role: userData.role,
    });
    if (res.status !== 201) {
      return res.data.message;
    }

    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
