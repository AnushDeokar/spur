import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("isAuthenticated")===null||localStorage.getItem("isAuthenticated")===false?false:true;
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const isAuth = localStorage.getItem("isAuthenticated")===null||localStorage.getItem("isAuthenticated")===false?false:true;
  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}




function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/createpost' element={<CreatePost />} />
      </Route>

      <Route element={<RestrictedRoutes />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
