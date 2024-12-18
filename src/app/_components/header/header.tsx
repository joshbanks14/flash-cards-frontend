"use client"
import { useAuthHelper } from "@/app/_lib/firebase/auth";
import Link from "next/link";
import styles from "./header.module.css";
import { FaFolderOpen, FaSignOutAlt } from "react-icons/fa";
import { BsMortarboardFill } from "react-icons/bs";

export const Header = () => {
    const { doSignOut } = useAuthHelper();

    return (
        <div className="p-[10px] w-100 h-full flex flex-col items-center text-white">
            <div className="flex flex-col items-center justify-center flex-grow w-full">
                <Link className={styles.menuItem} href="/">
                    <BsMortarboardFill className="mr-[60px] ml-[20px]" size={30} />
                    <div>Study</div>
                </Link>
                <Link className={styles.menuItem} href="/library">
                    <FaFolderOpen className="mr-[60px] ml-[20px]" size={30} />
                    <div>Library</div>
                </Link>
            </div>
            <div className={`${styles.menuItem} mt-auto`} onClick={doSignOut}>
                <FaSignOutAlt className="mr-[60px] ml-[20px]" size={30} />
                <div>Sign Out</div>
            </div>
        </div>
    );
}
