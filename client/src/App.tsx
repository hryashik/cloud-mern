import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Registration } from './pages/Registration/Registration'
import { Login } from './pages/Login/Login'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from './redux/store'
import { useEffect } from 'react'
import { api } from './api/api'
import { defineUser, ResponseDataType } from './redux/slices/userSlice'

const App: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const dispatch = useAppDispatch()
  async function authToken() {
    try {
      const response = await api.auth()
      if (response) dispatch(defineUser(response.data))
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    authToken()
  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  )
}

export default App