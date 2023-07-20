import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container, Slider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../components/hooks/hooks";
import {
  initSelectedRows,
  setSelectedRowID,
} from "../../store/slices/weatherSlice";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "apiParam", headerName: "Параметры прогноза", width: 400 },
];

export default function DataTable() {
  const { displaySetings: rows, selectedRowID } = useAppSelector(
    (state) => state.weather
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initSelectedRows());
  }, [dispatch]);

  const [value, setValue] = useState<number[]>([20, 37]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Container>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          /*  onCellClick={(id) => console.log(id)} */
          localeText={{
            footerRowSelected: (count) =>
              count > 0 && `Выбрано: ${count.toLocaleString()}`,
          }}
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Строк на странице",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection={true}
          rowSelectionModel={selectedRowID}
          onRowSelectionModelChange={(newSelection) => {
            dispatch(setSelectedRowID(newSelection));
          }}
        />
      </div>
      <Slider
        getAriaLabel={() => "Диапазон температур"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <Typography variant="body2" style={{ fontSize: "18px" }}>
        Не показывать прогноз, если температура не в диапазоне {value[0]}-
        {value[1]} градусов, не портить мне настроение
      </Typography>
    </Container>
  );
}
