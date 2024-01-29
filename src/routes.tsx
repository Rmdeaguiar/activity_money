import Home from './pages/home';
import SignUp from './pages/signup';
import Login from './pages/login';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { getItem } from './utils/storage'

interface ProtectedRoutesProps {
    redirectTo: string;
}

function ProtectedRoutes({ redirectTo }: ProtectedRoutesProps) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;