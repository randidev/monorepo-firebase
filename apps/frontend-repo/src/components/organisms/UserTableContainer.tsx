"use client";

import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import moment from "moment";
import { UserRow } from "@/@types/user";
import UserToolbar from "../molecules/UserToolbar";

type Props = {
  rows: UserRow[];
  setRows: (newRows: (oldRows: UserRow[]) => UserRow[]) => void;
  handleCancel: (id: GridRowId) => () => void;
  handleDelete: (id: GridRowId) => Promise<void>;
  handleUpdate: (
    newRow: GridRowModel
    // eslint-disable-next-line
  ) => Promise<{ [key: string]: any; [key: symbol]: any }>;
};

export default function UserTableContainer({
  rows,
  setRows,
  handleCancel,
  handleDelete,
  handleUpdate,
}: Props) {
  const paginationModel = { page: 0, pageSize: 20 };
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 250, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    { field: "age", headerName: "Age", width: 100, editable: true },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 160,
      valueGetter: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "updatedt",
      headerName: "Updated At",
      width: 160,
      valueGetter: (value) => moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={"save"}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={"cancel"}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    handleCancel(id);
    // const currentEdit = rows.find((row) => row.id === id);
    // if (currentEdit!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={handleUpdate}
      slots={{ toolbar: UserToolbar }}
      initialState={{ pagination: { paginationModel } }}
      slotProps={{
        toolbar: {
          setRows,
          setRowModesModel,
        },
      }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
    />
  );
}
