import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../Services/AuthService";
import { decrypt } from "../Pages/Utils/Crypto";

export interface IAuthSate {
	error: []
	success: boolean,
	loading: boolean,
	authUser: {UserId: string, UserName: string}
};
const initialState: IAuthSate = {
	error: [],
	success: false,
	loading: false,
	authUser: {UserId: '', UserName: ''}
}


export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_: undefined, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		const data = await authService.checkAuth(accessToken);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_:undefined) => {
		localStorage.removeItem('accessToken');
    return null;
  }
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.error = [];
			state.success = false;
			state.loading = false;
		}
	},
	extraReducers: (builder) => {
    builder
		.addCase(logout.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = false;
			state.authUser = {UserId: '', UserName: ''}
		})
		.addCase(checkAuth.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
			state.authUser = {UserId: '', UserName: ''}
		})
		.addCase(checkAuth.fulfilled, (state, action) => {
			state.loading = false;
			state.error = [];
			state.success = true;
			state.authUser = JSON.parse(JSON.stringify(decrypt(action.payload)));
		})
		.addCase(checkAuth.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage || action.payload;
			state.success = false;
			state.authUser = {UserId: '', UserName: ''}
		})
  },
});

export const { reset } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;