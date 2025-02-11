"use client";

import { UserRow } from "@/@types/user";
import useAppSelector from "@/hooks/useAppSelector";
import useUser from "@/hooks/user/useUser";
import { selectors } from "@/redux/user";
import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UserTableContainer from "../organisms/UserTableContainer";
import { GridRowId, GridRowModel } from "@mui/x-data-grid";

export default function UserTableTemplate() {
  const fetched = useRef(false);
  const users = useAppSelector(selectors.users);

  const { fetchUsers, updateUser, deleteUser, addUser } = useUser();

  const [rows, setRows] = useState<UserRow[]>(
    users?.list?.map((user) => ({ ...user, isNew: false })) || []
  );

  const handleDelete = async (id: GridRowId) => {
    await deleteUser(id as string);
  };

  const handleCancel = (id: GridRowId) => () => {
    const currentEdit = rows.find((row) => row.id === id);
    if (currentEdit!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleUpdate = async (newRow: GridRowModel) => {
    let updatedRow = { ...newRow };

    if (newRow.isNew) {
      const addedUser = await addUser({
        name: newRow.name,
        email: newRow.email,
        age: newRow.age,
      });

      updatedRow = { ...addedUser, isNew: false }; // Ensure new ID is assigned
    } else {
      await updateUser(newRow.id, {
        id: newRow.id,
        name: newRow.name,
        email: newRow.email,
        age: newRow.age,
      });
    }

    // Fix: Update only the modified row and keep the others unchanged
    setRows((prevRows) =>
      prevRows.map(
        (row) => (row.id === newRow.id ? updatedRow : row) as UserRow
      )
    );

    return updatedRow;
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchUsers();
      fetched.current = true;
    }
  }, [fetchUsers]);

  useEffect(() => {
    if (users && users.list) {
      setRows(users?.list?.map((user) => ({ ...user, isNew: false })));
    }
  }, [users]);

  return (
    <Box display="flex" height={"100vh"} width={"100%"} alignItems={"center"}>
      <Box height={"90%"} width={"100%"}>
        <Paper sx={{ width: "60%", margin: "auto", height: "100%" }}>
          <UserTableContainer
            rows={rows}
            setRows={setRows}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </Paper>
      </Box>
    </Box>
  );
}
