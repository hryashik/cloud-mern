import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TextAreaType = {
  value: string
  id: string
  isSeen: boolean
}

const initialState: TextAreaType = {
  isSeen: false,
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
    setVisibleArea(state, action: PayloadAction<boolean>) {
      state.isSeen = action.payload
    },
    initArea(state, action: PayloadAction<{ _id: string; name: string }>) {
      const { _id, name } = action.payload
      state.isSeen = true
      state.id = _id
      state.value = name
    },
    deleteArea(state) {
      state.isSeen = false
      state.id = ''
      state.value = ''
    },
  },
})

export default textAreaSlice.reducer
export const { changeAreaValue, setVisibleArea, initArea, deleteArea } = textAreaSlice.actions
