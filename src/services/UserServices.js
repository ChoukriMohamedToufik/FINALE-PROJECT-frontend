// services/UserServices.js
import axios from "axios";
import { baseUrl } from "./baseUrl";
import { CurrentUser, catchError, emptyError } from "../redux/user";

// ✅ تسجيل الدخول
export const LoginService = async (data, dispatch, navigate) => {
  try {
    console.log("Sending login request to:", `${baseUrl}/user/login`);
    const res = await axios.post(`${baseUrl}/user/login`, data);

    console.log("Login response:", res.data);
    localStorage.setItem("token", res.data.token);

    await GetCurrentUser(dispatch);
    navigate("/dashboard");
    dispatch(emptyError());

  } catch (err) {
    console.log("Login error:", err.response?.data);
    dispatch(catchError(err.response?.data));
  }
};

// ✅ جلب المستخدم الحالي
export const GetCurrentUser = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(`${baseUrl}/user/getcurrentuser`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Current user:", res.data);
    dispatch(CurrentUser(res.data));

  } catch (err) {
    console.log("GetCurrentUser error:", err.response?.data?.msg);
  }
};

// ✅ تسجيل مستخدم جديد
export const Register = async (data, navigate, dispatch) => {
  try {
    await axios.post(`${baseUrl}/user/register`, data);
    navigate("/login");
    dispatch(emptyError());
  } catch (err) {
    dispatch(catchError(err.response?.data));
  }
};