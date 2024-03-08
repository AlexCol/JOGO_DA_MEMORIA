import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import scoreReducer from "./Slices/ScoreSlice";


export const store = configureStore( {
	reducer: {
		auth: authReducer,
		score: scoreReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;