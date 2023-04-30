import { Action, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

export const token = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ'

export const API_URL = "https://eshop-deve.herokuapp.com/api/v2"
const apiHandler = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});
export type itemRows = {
  id: number;
  sku: string,
  name: string,
  quantity: number,
  price: number
}

export type OrderSlice = {
  orders: any[],
  loading: boolean,
}
const initialState: OrderSlice = {
  orders: [],
  loading: false,
}

export const slice = createSlice({
  name: 'orders',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
});

export const orderReducer = slice.reducer
export const { setOrders, setLoading } = slice.actions;

export const getAllOrders = (): ThunkAction<void, RootState, unknown, Action<unknown>> => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    try {
      const { data } = await apiHandler.get('/orders', { headers: { Authorization: token } })
      const { orders } = data;
      
      dispatch(setOrders(orders))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
    }
  }
}