import { create } from '@mui/material/styles/createTransitions'
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
export const uploadFileThunk = createAsyncThunk(
  'files/upload',
  async ({ file, currentDir }: { file: File; currentDir: string }) => {
    const resp = await api.uploadFile(file, currentDir)
    return resp
  },
)
export const initialFilesThunk = createAsyncThunk('files/init', async (parentId: string) => {
  const resp = await api.getFiles(parentId)
  return resp
})
export const createDirThunk = createAsyncThunk(
  'files/createDir',
  async ({ nameDir, parentId }: { nameDir: string; parentId: string }) => {
    const resp = api.createDir(nameDir, parentId)
    return resp
  },
)

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
    //Get files
    builder.addCase(initialFilesThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.files = action.payload
      }
    })
    //Delete file
    builder.addCase(deleteFileThunk.fulfilled, (state, action) => {
      state.files = state.files.filter(el => el._id !== state.selectedFile)
      state.selectedFile = ''
    })
    //Upload file
    builder.addCase(uploadFileThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload) {
        state.files.push(action.payload)
      }
    })
    //Create directory
    builder.addCase(createDirThunk.fulfilled, (state, action) => {
      state.files.push(action.payload)
    })
  },
})

export default filesSlice.reducer
export const { getFiles, setCurrentDir, outDir, openDir, setSelectedFile, renameSelectFile } =
  filesSlice.actions
