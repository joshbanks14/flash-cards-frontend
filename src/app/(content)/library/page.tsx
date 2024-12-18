"use client"
import { useDatabase } from "@/app/_lib/firebase/database";

const Library = () =>{
  const { Post, Get } = useDatabase();

  const addSet = () => {
    Post({ name: "test2" }, "sets");
  }
  const getData = () => {
    Get("sets");
  }
  return (
    <div className="bg-red-600 h-full w-full" onClick={() => getData()}>hello</div>
  );
}

export default Library;
