import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chat_icons">
          <span>
            <ion-icon name="videocam"></ion-icon>
          </span>
          <span>
            <ion-icon name="person-add"></ion-icon>
          </span>
          <span>
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
