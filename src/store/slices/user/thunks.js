import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  endLoading,
  setOrgRepos,
  setUsers,
  startLoadingUsers,
} from "./userSlice";

export const getAllUsers = (user) => {
  return async (dispatch) => {
    dispatch(startLoadingUsers());

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${user}`
      );
      dispatch(setUsers({ users: res.data.items }));
    } catch (error) {
      <Navigate to="/" />
      alert('Error')
      dispatch(endLoading());

      console.log("error");
    }
  };
};
export const isLoading = (is) => {
  return (dispatch) => {
    if (is) {
      dispatch(startLoadingUsers());
    } else {
      dispatch(endLoading());
    }
  };
};

export const setOrganizationRepos = (repos) => {
  return (dispatch) => {
    dispatch(setOrgRepos({ repos }));
    console.log({ repos });
  };
};
