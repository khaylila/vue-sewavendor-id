import Cookies from "js-cookie";

export const API_URL = "http://khaylila.my.id:5656";
// export const API_URL = "http://localhost:3000";
export const LOGIN = `${API_URL}/login`;
export const REGISTER = `${API_URL}/signup`;
export const PROFILE = `${API_URL}/profile`;
export const MERCHANT = `${API_URL}/seller`;
export const MERCHANT_RESETPASS = `${MERCHANT}/reset`;
export const MERCHANT_ITEMS = `${MERCHANT}/items`;
export const ITEMS = `${API_URL}/items`;
export const PAYMENT = `${API_URL}/payment`;

export const AUTHORIZATION = Cookies.get("Authorization");
