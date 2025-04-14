import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Navbar from "../components/Navbar";

const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) return <div></div>;

    return user ? <div><Navbar /><Outlet /></div> : <Navigate to="/login" />;
};


const PublicRoutes = () => {

    const { user, loading } = useAuth();
    if (loading) return <div></div>;
    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export { PrivateRoutes, PublicRoutes };