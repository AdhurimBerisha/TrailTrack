import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("mainFlow");
  } else {
    navigate("loginFlow", { screen: "Signup" });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signup", { email, password });
      const token = response.data?.token || response.data?.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }
      await AsyncStorage.setItem("token", token);
      dispatch({ type: "signin", payload: token });
      navigate("mainFlow");
    } catch (err) {
      let errorMessage = "Something went wrong with sign up";
      
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          errorMessage = "API endpoint not found. Please check your API_URL configuration and ensure the server is running.";
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.error || "Invalid email or password";
        } else if (err.response.status === 401) {
          errorMessage = err.response.data?.error || "Unauthorized";
        } else {
          errorMessage = err.response.data?.error || err.response.data?.message || `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = "Unable to reach server. Please check your API_URL and ensure the server is running.";
      } else {
        // Error in setting up request
        errorMessage = err.message || errorMessage;
      }
      
      dispatch({
        type: "add_error",
        payload: errorMessage,
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signin", { email, password });
      const token = response.data?.token || response.data?.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }
      await AsyncStorage.setItem("token", token);
      dispatch({ type: "signin", payload: token });
      navigate("mainFlow");
    } catch (err) {
      let errorMessage = "Something went wrong with sign in";
      
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          errorMessage = "API endpoint not found. Please check your API_URL configuration and ensure the server is running.";
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.error || "Invalid email or password";
        } else if (err.response.status === 401) {
          errorMessage = err.response.data?.error || "Invalid credentials";
        } else {
          errorMessage = err.response.data?.error || err.response.data?.message || `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = "Unable to reach server. Please check your API_URL and ensure the server is running.";
      } else {
        // Error in setting up request
        errorMessage = err.message || errorMessage;
      }
      
      dispatch({
        type: "add_error",
        payload: errorMessage,
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
