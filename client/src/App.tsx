import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main/Main'
import { Registration } from './pages/Registration/Registration'
import { Login } from './pages/Login/Login'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from './redux/store'
import { useEffect } from 'react'
import { toggleReadyApp } from './redux/slices/appSlice'
import { Preloader } from './components/Preloader/Preloader'
import { CheckAuthThunk } from './redux/slices/userSlice'

const App: React.FC = () => {
  const appIsReady = useSelector((state: RootState) => state.app.isReady)
  const dispatch = useAppDispatch()
  async function start() {
    await dispatch(CheckAuthThunk())
    dispatch(toggleReadyApp(true))
  }
  useEffect(() => {
    start()
  }, [])
  return (
    <>
      <Navbar />
      {appIsReady
        ?
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