import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main/Main'
import { Registration } from './pages/Registration/Registration'
import { Login } from './pages/Login/Login'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from './redux/store'
import { useEffect } from 'react'
import { api } from './api/api'
import { defineUser, ResponseDataType } from './redux/slices/userSlice'
import { toggleReadyApp } from './redux/slices/appSlice'
import { Preloader } from './components/Preloader/Preloader'

const App: React.FC = () => {
  const appIsReady = useSelector((state: RootState) => state.app.isReady)
  const dispatch = useAppDispatch()
  async function authToken() {
    try {
      const response = await api.auth()
      if (response) dispatch(defineUser(response.data))
    } catch (e) {
      console.log(e)
    }
  }
  async function start() {
    await authToken()
    setTimeout(() => {
      dispatch(toggleReadyApp(true))
    }, 1500)
  }
  useEffect(() => {
    start()
  }, [])
  return (
    <>
      <Navbar />
      {appIsReady ?
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
        :
        <div className='preloader'>
          <Preloader />
        </div>
      }

    </>
  )
}

export default App