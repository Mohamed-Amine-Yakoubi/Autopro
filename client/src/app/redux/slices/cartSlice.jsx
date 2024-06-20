import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")), loading: true }
  : {
      loading: true,
      items: [],
      totalQuantity: 0,
      subTotalPrice: 0,
      TvaPourcentage: 0.19,
 
      TVA:0,
      livraison: 7,
      totalPrice: 0,
    };
const calculateTotalPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.prix_prod * item.quantity,
    0
  );
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id_prod === newItem.id_prod
      );
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
        state.subTotalPrice += newItem.prix_prod;
      } else {
        existingItem.quantity++;
        state.subTotalPrice += newItem.prix_prod;
      }
      state.TVA =  state.subTotalPrice * state.TvaPourcentage ;
      state.subTotalPrice = calculateTotalPrice(state.items);
      state.totalPrice = state.subTotalPrice + state.TVA + state.livraison;
      Cookies.set("cart", JSON.stringify(state));
    },
    removeItem(state, action) {
      const id_prod = action.payload;
      const existingItem = state.items.find((item) => item.id_prod === id_prod);
    
        state.items = state.items.filter((item) => item.id_prod !== id_prod);
        state.totalQuantity--;
        state.subTotalPrice -= existingItem.prix_prod;
    
        state.TVA =  state.subTotalPrice * state.TvaPourcentage ;

      state.subTotalPrice = calculateTotalPrice(state.items);
      state.totalPrice = state.subTotalPrice + state.TVA + state.livraison;

      Cookies.set("cart", JSON.stringify(state));
    },
    updateQuantity(state, action) {
      const { id_prod, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id_prod === id_prod);
      if (itemToUpdate) {
        // Update the quantity of the item
        itemToUpdate.quantity += quantity;
        // Update the total price accordingly
        state.subTotalPrice += itemToUpdate.prix_prod * quantity;
      }
      state.TVA =  state.subTotalPrice * state.TvaPourcentage ;

      state.subTotalPrice = calculateTotalPrice(state.items);
      state.totalPrice = state.subTotalPrice + state.TVA + state.livraison;

      Cookies.set("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
