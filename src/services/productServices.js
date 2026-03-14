import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getoneproduct, getproducts } from "../redux/product";

export const GetProducts = async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/product`);
    dispatch(getproducts(res?.data));
  } catch (err) {
    console.log("Error fetching products:", err);
  }
};

export const GetoneProduct = async (id, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseUrl}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(getoneproduct(res?.data));
  } catch (err) {
    console.log("Error fetching product:", err);
  }
};

export const AddProduct = async (data, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${baseUrl}/product`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    GetProducts(dispatch);
  } catch (err) {
    console.log("Error adding product:", err);
  }
};

export const Editproduct = async (data, id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`${baseUrl}/product/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    console.log("Error editing product:", err);
  }
};