import { User } from "@repo/shared";
import URLS from "@/config/urls";
import axios from "axios";
import { useCallback, useState } from "react";
import useAppDispatch from "../useAppDispatch";
import { actions } from "@/redux/utils";
import { actions as userActions } from "@/redux/user";

export default function useUser() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data: users, status } = await axios.get(URLS.API_USER);
      if (status !== 200) throw new Error();

      setUsers(users);
      dispatch(
        userActions.callSetUsers({ list: users, lastUpdated: new Date() })
      );
      dispatch(
        actions.callSetToast({
          show: true,
          message: "Successfully fetched users.",
          severity: "success",
        })
      );
    } catch {
      dispatch(
        actions.callSetToast({
          show: true,
          message: "Something went wrong. Please try again later.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch]);

  const addUser = useCallback(
    async (payload: Omit<User, "createdAt" | "updatedAt">) => {
      if (loading) return;
      setLoading(true);

      try {
        const { data: users, status } = await axios.post(
          URLS.API_USER,
          payload
        );
        if (status !== 200) throw new Error();

        setUsers(users);
        dispatch(
          userActions.callSetUsers({ list: users, lastUpdated: new Date() })
        );
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Successfully added user.",
            severity: "success",
          })
        );
        return users;
      } catch {
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Something went wrong. Please try again later.",
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, dispatch]
  );

  const updateUser = useCallback(
    async (id: string, payload: Omit<User, "createdAt" | "updatedAt">) => {
      if (loading) return;
      setLoading(true);

      try {
        const { data: users, status } = await axios.put(
          `${URLS.API_USER}/${id}`,
          payload
        );
        if (status !== 200) throw new Error();

        setUsers(users);
        dispatch(
          userActions.callSetUsers({ list: users, lastUpdated: new Date() })
        );
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Successfully updated user.",
            severity: "success",
          })
        );
      } catch {
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Something went wrong. Please try again later.",
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, dispatch]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      if (loading) return;
      setLoading(true);

      try {
        const { data: users, status } = await axios.delete(
          `${URLS.API_USER}/${id}`
        );
        if (status !== 200) throw new Error();

        setUsers(users);
        dispatch(
          userActions.callSetUsers({ list: users, lastUpdated: new Date() })
        );
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Successfully deleted user.",
            severity: "success",
          })
        );
      } catch {
        dispatch(
          actions.callSetToast({
            show: true,
            message: "Something went wrong. Please try again later.",
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, dispatch]
  );

  return { users, fetchUsers, addUser, updateUser, deleteUser, loading };
}
