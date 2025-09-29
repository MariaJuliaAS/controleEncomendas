import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
    children: ReactNode;
}

export function PrivateRouter({ children }: PrivateRouterProps) {
    const token = localStorage.getItem("@tokenOrderFlow");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}