import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const now = new Date();
const currentDate = now.toLocaleDateString("en-GB");
const initialState = Cookies.get("store")
  ? { ...JSON.parse(Cookies.get("store")), loading: true }
  : {
      loading: true,
      items: [],
    };

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    initializeStore(state, action) {
      state.items = action.payload;
      state.loading = false;
      Cookies.set("store", JSON.stringify(state));
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id_magasin === newItem.id_magasin
      );
      if (!existingItem) {
        state.items.push({
          ...newItem,
        });
      }

      Cookies.set("store", JSON.stringify(state));
    },
    updateIdMagasin(state, action) {
      state.id_magasin = action.payload;
      Cookies.set("store", JSON.stringify({ ...state })); // Ensure deep copy
    },
  },
});

export const {initializeStore, addItem ,updateIdMagasin } = storeSlice.actions;

export default storeSlice.reducer;
