import { useAuth } from "@/app/_contexts/authContext";
import { database } from "./firebase";
import { ref, push, get, onValue } from "firebase/database";

export type Response = {
    status: number;
    message?: string;
    data?: Record<string, unknown>;
}

export const useDatabase = () => {
    const { currentUser } = useAuth();

    const Post = (item: Record<string, unknown>, path: string) => {
        if (!currentUser) return false;
        const databaseRef = ref(database, `${currentUser.uid}/${path}`);
        push(databaseRef, item)
            .then(() => {
                return { status: 200, message: "Data added successfully" };
            })
            .catch((error) => {
                console.error('Error adding data: ', error);
                return { status: 500, message: "Error adding data" };
            });
    };

    const Get = (path: string) => {
        if (!currentUser) return false;
        const databaseRef = ref(database, `${currentUser.uid}/${path}`);
        get(databaseRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                return { status: 200, data: snapshot.val() };
            } else {
                return { status: 404, message: "No data available" };
            }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                return { status: 500, message: "Error fetching data" };
            });
    }

    return { Post, Get };
}
