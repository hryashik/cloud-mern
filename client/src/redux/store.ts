import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import { useDispatch } from 'react-redux'
import appSlice from './slices/appSlice'
import filesSlice from './slices/filesSlice'
import textAreaSlice from './slices/textAreaSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    files: filesSlice,
    textArea: textAreaSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
