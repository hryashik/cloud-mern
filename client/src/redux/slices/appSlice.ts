import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isReady: false
}

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		toggleReadyApp(state, action: PayloadAction<boolean>) {
			state.isReady = action.payload
		}
	}
})

export default appSlice.reducer
export const {toggleReadyApp} = appSlice.actions