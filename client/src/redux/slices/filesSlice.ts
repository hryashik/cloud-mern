import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileType } from '../../api/api'

type FilesSliceType = {
  files: FileType[]
  currentDir: string
}

const initialState: FilesSliceType = {
  files: [],
  currentDir: 'root',
}

const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    getFiles(state, action: PayloadAction<FileType[]>) {
      state.files = action.payload
    },
  },
})

export default filesSlice.reducer
export const { getFiles } = filesSlice.actions
