import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useRoles() {

    const { auth } = useContext(AuthContext);

    const userGroups = auth?.user?.groups || [];

    return {
        userGroups,
        isAdmin: userGroups.includes("Admin"),
        isTeacher: userGroups.includes("Teacher"),
        isParent: userGroups.includes("Parent"),
    };
}