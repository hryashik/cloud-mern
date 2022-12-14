import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, FileType } from '../../api/api'

export enum SortType {
  name = 'name',
  type = 'type',
  size = 'size',
}

type FilesSliceType = {
  filesModuleReady: boolean
  files: FileType[]
  currentDir: string
  pathStack: string[]
  selectedFile: string
  sortType: 'name' | 'type' | 'size'
}

const initialState: FilesSliceType = {
  filesModuleReady: false,
  files: [],
  currentDir: '',
  pathStack: [''],
  selectedFile: '',
  sortType: 'name',
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
export const initialFilesThunk = createAsyncThunk(
  'files/init',
  async ({ parentId, selectedSort }: { parentId: string; selectedSort: SortType }) => {
    const resp = await api.getFiles(parentId, selectedSort)
    return resp
  },
)
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
      const name = action.payload
      state.pathStack.forEach((el, idx) => {
        if (el === name) {
          state.pathStack.splice(idx + 1)
        }
      })
      state.currentDir = name
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
    changeSort(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload
    },
  },
  extraReducers(builder) {
    //Get files
    builder.addCase(initialFilesThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.files = action.payload
        state.filesModuleReady = true
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
export const {
  getFiles,
  setCurrentDir,
  outDir,
  openDir,
  setSelectedFile,
  renameSelectFile,
  changeSort,
} = filesSlice.actions
