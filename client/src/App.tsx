import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Registration } from './pages/Registration/Registration'
import { Login } from './pages/Login/Login'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

const App: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
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