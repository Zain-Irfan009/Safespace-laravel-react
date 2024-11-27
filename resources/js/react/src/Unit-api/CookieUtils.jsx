import Cookies from "js-cookie";

const COOKIE_NAME = "authToken";

export const setAuthToken = (token) => {
  if (token) {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    Cookies.set(COOKIE_NAME, token, { expires, path: "/" });
    console.log("Token has been set:", token);
  } else {
    console.error("Token is invalid or missing");
  }
};

export const getAuthToken = () => {
  const token = Cookies.get(COOKIE_NAME);
  console.log("Retrieved token:", token);
  return token;
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAME, { path: "/" });
  console.log("Token has been removed");
};
