import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IScore } from "../Interfaces/IScore";
import { scoreService } from "../Services/ScoreService";

export interface IScoreSate {
	error: string,
	success: boolean,
	loading: boolean,
	scores: IScore[],
	userScore: IScore|null
};
const initialState: IScoreSate = {
	error: '',
	success: false,
	loading: false,
	scores: [],
	userScore: null
}

export const getScores = createAsyncThunk(
  "score/get",
  async (_: undefined) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		
		const data = await scoreService.getScores(accessToken);
    return data;
  }
);

export const newScore = createAsyncThunk(
  "score/new",
  async (newScore: IScore) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		
		const data = await scoreService.newScore(newScore, accessToken);

    return data;
  }
);

export const scoreSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.error = '';
			state.success = false;
			state.loading = false;
		}
	},
	extraReducers: (builder) => {
    builder
		.addCase(getScores.pending, (state) => {
			state.loading = true;
			state.error = '';
			state.success = false;
		})
		.addCase(getScores.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.success = true;
			state.scores = JSON.parse(JSON.stringify(action.payload));
		})
		.addCase(getScores.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage || action.payload;
			state.success = false;
			state.scores = []
		})
		.addCase(newScore.pending, (state) => {
			state.loading = true;
			state.error = '';
			state.success = false;
		})
		.addCase(newScore.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.success = true;
			state.scores.push(JSON.parse(JSON.stringify(action.payload)));
			state.userScore = JSON.parse(JSON.stringify(action.payload));
		})
		.addCase(newScore.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage || action.payload;
			state.success = false;
			state.scores = []
			state.userScore = null
		})		
  },
});

export const { reset } = scoreSlice.actions;
const scoreReducer = scoreSlice.reducer;
export default scoreReducer;