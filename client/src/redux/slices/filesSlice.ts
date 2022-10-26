import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileType } from '../../api/api'

type FilesSliceType = {
  files: FileType[]
  currentDir: string
  pathStack: string[]
}

const initialState: FilesSliceType = {
  files: [],
  currentDir: '',
  pathStack: [''],
}

const filesSlice = createSlice({
  name: 'filesSlice',
  initialState,
  reducers: {
    getFiles(state, action: PayloadAction<FileType[]>) {
      state.files = action.payload
    },
    setCurrentDir(state, action: PayloadAction<string>) {
      state.currentDir = action.payload
    },
    openDir(state, action: PayloadAction<string>) {
      state.currentDir = action.payload
      state.pathStack.push(action.payload)
    },
    outDir(state) {
      const backDir = state.pathStack.pop() as string
      state.currentDir = state.pathStack[state.pathStack.length - 1]
    },
  },
})

export default filesSlice.reducer
export const { getFiles, setCurrentDir, outDir, openDir } = filesSlice.actions
