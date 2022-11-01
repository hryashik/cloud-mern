import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, UserType } from '../../api/api'

export const LoginUserThunk = createAsyncThunk(
  'user/defineUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await api.login(email, password)
    return response
  },
)
export const CheckAuthThunk = createAsyncThunk('user/checkAuth', async () => {
  const response = await api.auth()
  return response
})

export type UserResponseType = {
  diskSpace: number
  usedSpace: number
  email: string
  id: number
}

interface IUserState extends UserType {
  isAuth: boolean
}

const initialState: IUserState = {
  email: '',
  id: '',
  diskSpace: 0,
  usedSpace: 0,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.isAuth = false
      state.email = ''
      state.diskSpace = 0
      state.usedSpace = 0
      state.id = ''
      localStorage.removeItem('token')
    },
  },
  extraReducers: builder => {
    builder.addCase(LoginUserThunk.fulfilled, (state, action) => {
      if (action.payload) {
        const { token, user } = action.payload
        localStorage.setItem('token', token)
        state.diskSpace = user.diskSpace
        state.usedSpace = user.usedSpace
        state.email = user.email
        state.id = user.id
        state.isAuth = true
      }
    })
    builder.addCase(CheckAuthThunk.fulfilled, (state, action) => {
      if (action.payload) {
        const { token, user } = action.payload
        localStorage.setItem('token', token)
        state.diskSpace = user.diskSpace
        state.usedSpace = user.usedSpace
        state.email = user.email
        state.id = user.id
        state.isAuth = true
      }
    })
  },
})

export default userSlice.reducer
export const { logOut } = userSlice.actions
