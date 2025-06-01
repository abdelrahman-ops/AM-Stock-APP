import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';

export const ProtectedRoute = ({
    adminOnly = false,
    superAdminOnly = false
}: {
    adminOnly?: boolean;
    superAdminOnly?: boolean;
}) => {
    const location = useLocation();
    const { isAuthenticated, isAdmin, isSuperAdmin } = useAuthStore();
    const toastShown = useRef(false);

    const isLoggedIn = isAuthenticated();
    const isUserAdmin = isAdmin();
    const isUserSuperAdmin = isSuperAdmin();

    useEffect(() => {
        if (!toastShown.current) {
        if (!isLoggedIn) {
            toast.error('Please login to access this page');
        } else if (superAdminOnly && !isUserSuperAdmin) {
            toast.error('You must be a superadmin');
        } else if (adminOnly && !(isUserAdmin || isUserSuperAdmin)) {
            toast.error('You need admin privileges');
        }
        toastShown.current = true;
        }
    }, [isLoggedIn, adminOnly, superAdminOnly, isUserAdmin, isUserSuperAdmin]);

    if (!isLoggedIn) {
        return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
    }

    if (superAdminOnly && !isUserSuperAdmin) {
        return <Navigate to="/" replace />;
    }

    if (adminOnly && !(isUserAdmin || isUserSuperAdmin)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
