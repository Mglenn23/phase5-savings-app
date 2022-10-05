import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  return await fetch("/logout", { method: "DELETE" }).then((r) => {
    return r.json();
  });
});
export const getUser = createAsyncThunk("user/getUser", async ({ username, password }) => {
  //   debugger;
  return await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
});
const userSlice = createSlice({
  name: "users",
  initialState: { data: null },
  reducers: {
    updateUser: (state, action) => {
      state.data = action.payload;
    },
    deleteUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.data = null;
    },
  },
});
console.log(userSlice);
export default userSlice.reducer;
