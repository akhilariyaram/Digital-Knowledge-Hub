import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message && message.senderId === (currentUser && currentUser.uid)
          ? "owner"
          : ""
      }`}
    >
      {message && (
        <>
          <div className="messageInfo">
            <img
              src={
                message.senderId === (currentUser && currentUser.uid)
                  ? (currentUser && currentUser.photoURL)
                  : (data && data.user && data.user.photoURL)
              }
              alt="Photo"
            />
            <span>just now</span>
          </div>
          <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="photo" />}
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
