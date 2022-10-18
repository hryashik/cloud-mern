import './App.scss'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Registration } from './pages/Registration/Registration'
import { Login } from './pages/Login/Login'

const App: React.FC = () => {
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