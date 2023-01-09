import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  orgRepos: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLoadingUsers: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },

    setUsers: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    },
    setOrgRepos: (state, action) => {
      state.orgRepos = action.payload.repos;
    },
  },
});

export const { startLoadingUsers, endLoading, setUsers, setOrgRepos } =
  userSlice.actions;
