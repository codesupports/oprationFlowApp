"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { store } from "../../store/store";
import Sidebar from "../dashboardComponent/Sidebar";
import { isLoggedInUser, isLoggedOutUser } from "../../store/slices/requestSlice";
import AuthActivity from '../../AuthActivity/authActivity'

function AppContent({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const loggedInUser = useSelector(
        (state) => state.requests.loggedInUser
    );

    // Restore user after refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");

        if (storedUser) {
            dispatch(isLoggedInUser(JSON.parse(storedUser)));
        } else {
            dispatch(isLoggedOutUser());
        }
    }, [dispatch]);

    // Protect routes
    useEffect(() => {
        if (loggedInUser === null) return;

        if (!loggedInUser && pathname !== "/login") {
            router.replace("/login");
        }
    }, [loggedInUser, pathname, router]);

    if (loggedInUser === null) {
        return <div>Loading...</div>;
    }

    if (!loggedInUser && pathname !== "/login") {
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