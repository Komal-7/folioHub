import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) return <div></div>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};


const PublicRoutes = () => {

    const { user, loading } = useAuth();
    if (loading) return <div></div>;
    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export { PrivateRoutes, PublicRoutes };