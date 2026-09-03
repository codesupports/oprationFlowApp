"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoggedOutUser } from "../store/slices/requestSlice";

const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

export default function AuthActivity() {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkInactivity = () => {
            const lastActivity = sessionStorage.getItem("lastActivity");

            if (!lastActivity) return;

            const inactiveTime = Date.now() - Number(lastActivity);

            if (inactiveTime >= INACTIVITY_TIME) {
                sessionStorage.removeItem("loggedInUser");
                sessionStorage.removeItem("lastActivity");

                dispatch(isLoggedOutUser());
            }
        };

        const updateActivity = () => {
            sessionStorage.setItem(
                "lastActivity",
                Date.now().toString()
            );
        };

        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
            "click",
        ];

        events.forEach((event) => {
            window.addEventListener(event, updateActivity);
        });

        const interval = setInterval(checkInactivity, 60 * 1000);

        updateActivity();

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, updateActivity);
            });

            clearInterval(interval);
        };
    }, [dispatch]);

    return null;
}