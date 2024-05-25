import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleUserSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleUserSearch();
  };

  const handleSelect = async () => {
    const combinedIDs =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedIDs));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedIDs), { messages: [] });

        /* Creating User Chats */
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedIDs + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedIDs + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedIDs + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedIDs + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="search_form">
        <input
          style={{ color: "#fff" }}
          type="text"
          placeholder="Find a User..."
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User Not Found!</span>}
      {user && (
        <div className="user_chat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="user_chatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
