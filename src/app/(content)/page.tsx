"use client"
import { useEffect, useState } from "react";
import { Set } from "../../api/types";
import { useAuth } from "../_contexts/authContext";
import { database } from "../_lib/firebase/firebase";
import { onValue, ref, off } from "firebase/database";
import { useDatabase } from "../_lib/firebase/database";
import { IoMdAddCircle } from "react-icons/io";

const Content = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const { currentUser } = useAuth();
  const { Post } = useDatabase();

  useEffect(() => {
    const getSets = () => {
      if (!currentUser) return false;
      const databaseRef = ref(database, `${currentUser.uid}/sets`);
      const unsubscribe = onValue(databaseRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const parsedSets = Object.keys(data).map(key => ({
            id: key,
            name: data[key].name
          }));
          setSets(parsedSets);
        } else {
          setSets([]);
        }
      });

      return () => {
        off(databaseRef, 'value', unsubscribe);
      };
    }
    getSets();
  }, [currentUser]);

  const createSet = () => {
    Post({ name: "test2" }, "sets");
  }

  return (
    <div className="bg-white h-full w-full rounded-[20px] p-[20px]">
      <div className="w-[300px] h-full flex flex-col items-center gap-[20px] overflow-y-scroll">
        <div onClick={createSet} className="w-full min-h-[60px] bg-[#0c331b] rounded-[10px] flex justify-center items-center text-white hover:bg-opacity-80">
          <IoMdAddCircle size={30} />
        </div>
        {sets.map((set: Set) => (
          <div key={set.id} className="w-full min-h-[100px] bg-[#0c331b] bg-opacity-60 rounded-[10px] flex justify-center items-center text-white text-lg font-extrabold hover:bg-opacity-80">{set.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Content;
