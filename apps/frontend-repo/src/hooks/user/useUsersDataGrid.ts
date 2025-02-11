// src/hooks/useUsersDataGrid.ts
import { useState, useEffect } from "react";
import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { UserRow } from "@/@types/user";
import { User } from "@repo/shared";

interface UseUsersDataGridProps {
  users: User[];
  addUser: (user: Omit<User, "id">) => Promise<User>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUsersDataGrid = ({
  users,
  addUser,
  updateUser,
  deleteUser,
}: UseUsersDataGridProps) => {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    setRows(users.map((user) => ({ ...user, isNew: false })));
  }, [users]);

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    await deleteUser(id.toString());
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = newRow.isNew
      ? await addUser({
          name: newRow.name,
          email: newRow.email,
          age: newRow.age,
        })
      : await updateUser(newRow.id, newRow);

    setRows((prevRows) =>
      prevRows.map(
        (row) =>
          (row.id === newRow.id
            ? { ...updatedRow, isNew: false }
            : row) as UserRow
      )
    );
    return updatedRow;
  };

  return {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    handleRowModesModelChange,
    handleRowEditStop,
    processRowUpdate,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
  };
};
