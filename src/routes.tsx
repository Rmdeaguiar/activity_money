import Home from './pages/home';
import Login from './pages/login';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { getItem } from './utils/storage'

interface ProtectedRoutesProps {
    redirectTo: string;
}

function ProtectedRoutes({ redirectTo }: ProtectedRoutesProps) {
    const isAuthenticated = getItem('token');
    //const isAuthenticated = true
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />            
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default MainRoutes;