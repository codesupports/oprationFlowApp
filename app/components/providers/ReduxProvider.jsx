"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { store } from "../../store/store";
import Sidebar from "../dashboardComponent/Sidebar";
import { isLoggedInUser, isLoggedOutUser } from "../../store/slices/requestSlice";
import AuthActivity from '../../AuthActivity/authActivity'
import Loader from '../Loader'

function AppContent({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const loggedInUser = useSelector(
        (state) => state.requests.loggedInUser
    );

    // Public routes
    // const publicRoutes = ["/login", "/addUser", "/contact-admin", "/forgot-password"];
    const publicRoutes = ["/login", "/addUser"];


    const isPublicRoute = publicRoutes.includes(pathname);

    // Restore user after refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");

        if (storedUser) {
            try {
                dispatch(isLoggedInUser(JSON.parse(storedUser)));
            } catch (error) {
                console.error("Invalid stored user:", error);
                localStorage.removeItem("loggedInUser");
                dispatch(isLoggedOutUser());
            }
        } else {
            dispatch(isLoggedOutUser());
        }
    }, [dispatch]);

    // Protect routes
    useEffect(() => {
        if (loggedInUser === null) return;

        // User not logged in
        if (!loggedInUser && !isPublicRoute) {
            router.replace("/login");
        }
    }, [loggedInUser, pathname, router, isPublicRoute]);

    // Wait until localStorage restore is complete
    // if (loggedInUser === null) {
    //     return <Loader />;
    // }

    // Don't render protected page before redirect
    if (!loggedInUser && !isPublicRoute) {
        return null;
    }

    return (
        <>
            {loggedInUser && <Sidebar onClose="" />}
            {children}
        </>
    );
}

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <AuthActivity />
            <AppContent>{children}</AppContent>
        </Provider>
    );
}