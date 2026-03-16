import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getproducts, getoneproduct } from "../redux/product";

// ✅ جلب كل المنتجات
export const GetProducts = async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/product`);
    dispatch(getproducts(res?.data));
    return res.data;
  } catch (err) {
    console.log("Error fetching products:", err);
    throw err;
  }
};

// ✅ جلب منتج واحد (مرة واحدة فقط)
export const GetoneProduct = async (id, dispatch) => {
  try {
    console.log('🔍 جلب المنتج من API:', `${baseUrl}/product/${id}`);
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseUrl}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ المنتج المستلم:', res.data);
    dispatch(getoneproduct(res?.data));
    return res.data;
  } catch (err) {
    console.log("❌ خطأ في جلب المنتج:", err);
    console.log("🔴 تفاصيل الخطأ:", err.response?.data);
    throw err;
  }
};

// ✅ إضافة منتج
export const AddProduct = async (data, dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${baseUrl}/product`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    GetProducts(dispatch);
  } catch (err) {
    console.log("Error adding product:", err);
    throw err;
  }
};

// ✅ تعديل منتج
export const Editproduct = async (data, id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`${baseUrl}/product/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    console.log("Error editing product:", err);
    throw err;
  }
};

// ✅ البحث عن منتجات
export const SearchProducts = async (searchTerm, dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/product?search=${searchTerm}`);
    dispatch(getproducts(res?.data));
  } catch (err) {
    console.log("Error searching products:", err);
  }
};

// ✅ تصفية حسب الفئة
export const FilterByCategory = async (category, dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/product?category=${category}`);
    dispatch(getproducts(res?.data));
  } catch (err) {
    console.log("Error filtering products:", err);
  }
};