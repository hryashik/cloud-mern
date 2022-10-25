import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../api/api'

/* export const authUser = createAsyncThunk('authUser', async (value: ValueType) => {
  const { email } = value
  const { password } = value
  const resp = await api.auth(email, password)
  return resp
}) */

export type UserResponseType = {
  diskSpace: number
  usedSpace: number
  email: string
  id: number
}

type initialStateType = {
  currentUser: UserResponseType | null
  isAuth: boolean
}

export type ResponseDataType = {
  token: string
  user: UserResponseType
}

const initialState: initialStateType = {
  currentUser: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    defineUser(state, action: PayloadAction<ResponseDataType>) {
      state.isAuth = true
      state.currentUser = action.payload.user
      localStorage.setItem('token', action.payload.token)
    },
    logOut(state) {
      state.isAuth = false
      state.currentUser = null
      localStorage.removeItem('token')
    },
  },
  /*   extraReducers: builder => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      console.log(action)
    })
    builder.addCase(authUser.rejected, (state, action) => {
      console.log(action)
    })
  }, */
})

export default userSlice.reducer
export const { defineUser, logOut } = userSlice.actions
