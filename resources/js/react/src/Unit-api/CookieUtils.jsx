import Cookies from "js-cookie";

const COOKIE_NAME = "authToken";

export const setAuthToken = (token) => {
  if (token) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    Cookies.set(COOKIE_NAME, token, { expires });
  } else {
    console.error("Token is invalid or missing");
  }
};

export const getAuthToken = () => {
  return Cookies.get(COOKIE_NAME);
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAME);
};
