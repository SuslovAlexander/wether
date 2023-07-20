import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialWeatherSlice {
  displaySetings: any;
  selectedRowID: number[];
}

const initialState: IInitialWeatherSlice = {
  displaySetings: [
    { id: 1, apiParam: "Запомнить локацию", checked: false },
    { id: 2, apiParam: "Выбранный город", checked: false },
    { id: 3, apiParam: "Температура", checked: false },
    { id: 4, apiParam: "Облачность", checked: false },
    { id: 5, apiParam: "Влажность", checked: false },
    { id: 6, apiParam: "Скорость ветра", checked: true },
    { id: 7, apiParam: "Восход", checked: false },
    { id: 8, apiParam: "Закат", checked: false },
    { id: 9, apiParam: "Максимальная температура", checked: false },
    { id: 10, apiParam: "Минимальная температура", checked: true },
  ],
  selectedRowID: [],
};

const wetherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToDisplay(state, action) {
      const checkedRow = state.displaySetings.find(
        (el: any) => el.id === action.payload.id
      );
      checkedRow.checked = !checkedRow.checked;
    },
    setSelectedRowID(state, action) {
      state.selectedRowID = action.payload;
    },
    initSelectedRows(state) {
      state.selectedRowID = state.displaySetings
        .filter((row: any) => row.checked)
        .map((item: any) => item.id);
    },
  },
});

export const { addToDisplay, setSelectedRowID, initSelectedRows } =
  wetherSlice.actions;

export default wetherSlice.reducer;
