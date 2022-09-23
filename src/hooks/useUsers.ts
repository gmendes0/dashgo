import { useQuery } from "react-query";
import { api } from "../services/api";
import { format } from "../utils/format";

type TUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type TUsersResponseData = {
  users: Array<TUser>;
};

type TUserFormatedData = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<TUserFormatedData[]> {
  const { data } = await api.get<TUsersResponseData>("/users");

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: format.date(new Date(user.created_at)),
  }));

  return users;
}

export const useUsers = () =>
  useQuery<TUserFormatedData[]>("users", getUsers, {
    staleTime: 1000 * 15, // 15 segundos
  });
