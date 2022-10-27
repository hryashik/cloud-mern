import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TextAreaType = {
  value: string
  id: string
}

const initialState: TextAreaType = {
  value: '',
  id: '',
}

const textAreaSlice = createSlice({
  name: 'textAreaSlice',
  initialState,
  reducers: {
    changeAreaValue(state, action: PayloadAction<string>) {
      state.value = action.payload
    },
  },
})

export default textAreaSlice.reducer
export const { changeAreaValue } = textAreaSlice.actions
