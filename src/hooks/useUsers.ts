import { useQuery } from "react-query";
import { api } from "../services/api";
import { format } from "../utils/format";

type TUser = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type TUsersResponseData = {
  users: Array<TUser>;
};

type TUserFormatedData = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type TPaginatedData = {
  users: TUserFormatedData[];
  total: number;
};

interface GetUsersProps {
  page: number;
  perPage?: number;
}

interface UseUsersProps extends GetUsersProps {}

export async function getUsers({
  page,
  perPage = 10,
}: GetUsersProps): Promise<TPaginatedData> {
  const { data, headers } = await api.get<TUsersResponseData>("/users", {
    params: {
      page,
      per_page: perPage,
    },
  });

  const total = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: format.date(new Date(user.created_at)),
  }));

  return { users, total };
}

export const useUsers = (props: UseUsersProps) =>
  useQuery<TPaginatedData>(
    ["users", { page: props.page }], // caso fosse possivel trocar a qtd de reg por paginas, seria necessário adicionar a informaçao aqui tbm
    () => getUsers(props),
    {
      staleTime: 1000 * 60 * 10, // 10 min
    }
  );
