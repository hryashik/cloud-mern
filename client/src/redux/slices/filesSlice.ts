import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, FileType } from '../../api/api'

type FilesSliceType = {
  files: FileType[]
  currentDir: string
  pathStack: string[]
  selectedFile: string
}

const initialState: FilesSliceType = {
  files: [],
  currentDir: '',
  pathStack: [''],
  selectedFile: '',
}

export const deleteFileThunk = createAsyncThunk('files/deleteFile', async (id: string) => {
  const resp = await api.deleteFile(id)
  return resp
})

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
    setSelectedFile(state, action: PayloadAction<string>) {
      state.selectedFile = action.payload
    },
    renameSelectFile(state, action: PayloadAction<string>) {
      const findItem = state.files.find(el => el._id === state.selectedFile)
      if (findItem) {
        findItem.name = action.payload
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteFileThunk.fulfilled, (state, action) => {
      state.files = state.files.filter(el => el._id !== state.selectedFile)
      state.selectedFile = ''
    })
  },
})

export default filesSlice.reducer
export const { getFiles, setCurrentDir, outDir, openDir, setSelectedFile, renameSelectFile } =
  filesSlice.actions
