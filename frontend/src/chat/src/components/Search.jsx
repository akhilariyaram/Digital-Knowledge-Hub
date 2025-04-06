// Search.jsx
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/fire";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // No matching documents found
        setErr(true);
        setUser(null);
      } else {
        // Set the first matching document as the user
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setErr(false);
      }
    } catch (err) {
      console.error("Search error:", err);
      setErr(true);
      setUser(null);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        // Create a new chat document if it doesn't exist
        await setDoc(chatDocRef, { messages: [] });
      }

      // Update userchats collection for current user
      await updateDoc(doc(db, "userchats", currentUser.uid), {
        [combinedId]: {
          userInfo: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          date: serverTimestamp(),
        },
      });

      // Update userchats collection for selected user
      await updateDoc(doc(db, "userchats", user.uid), {
        [combinedId]: {
          userInfo: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          date: serverTimestamp(),
        },
      });

      // Dispatch action to update user and chatId in ChatContext
      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (err) {
      console.error("Select error:", err);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span className="text-white flex justify-center">User not found!!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="Photo" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
