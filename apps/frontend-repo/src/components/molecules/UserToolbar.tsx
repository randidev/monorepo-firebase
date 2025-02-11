// src/components/molecules/EditToolbar.tsx
import {
  GridRowModes,
  GridRowModesModel,
  GridSlotProps,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { generateRandomString } from "@/utils/helpers";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { UserRow } from "@/@types/user";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: UserRow[]) => UserRow[]) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

const UserToolbar = ({
  setRows,
  setRowModesModel,
}: GridSlotProps["toolbar"]) => {
  const handleClick = () => {
    const id = generateRandomString(12);
    setRows(
      (oldRows) =>
        [
          ...oldRows,
          { id, name: "", age: "", email: "", isNew: true },
        ] as UserRow[]
    );
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export default UserToolbar;
