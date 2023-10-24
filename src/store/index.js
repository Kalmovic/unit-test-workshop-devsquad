import { configureStore, createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    totalUsers: 0,
    totalLimit: 2,
  },
  reducers: {
    setUsers(state, action) {
      return {
        ...state,
        list: action.payload,
        totalUsers: action.payload.length,
      };
    },
    addUser(state, action) {
      return {
        ...state,
        list:
          state.totalUsers >= state.totalLimit
            ? state.list
            : [...state.list, action.payload],
        totalUsers: state.totalUsers + 1,
      };
    },
    setTotalUsers(state, action) {
      return {
        ...state,
        totalUsers: action.payload,
      };
    },
    removeUser(state, action) {
      return {
        ...state,
        list: state.list.filter((user) => user.id !== action.payload.id),
        totalUsers: state.totalUsers - 1,
      };
    },
    setTotalLimit(state, action) {
      return {
        ...state,
        totalLimit: action.payload,
      };
    },
  },
});

const userLimitSlice = createSlice({
  name: "userLimitSlice",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    userLimit: userLimitSlice.reducer,
  },
});

export const { addUser, removeUser, setUsers, setTotalUsers, setTotalLimit } =
  usersSlice.actions;
