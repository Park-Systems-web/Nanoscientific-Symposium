import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { ChatAppContainer } from "./ChatAppStyles";

interface Message {
  name: string;
  message: string;
}

// const socket = io(window.location.hostname);

const ChatApp = () => {
  const [messageList, setMessageList] = React.useState<Message[]>([]);
  console.log(window.location);

  const submitHandler = () => {
    //
  };

  return (
    <ChatAppContainer>
      <TextField label="message" variant="outlined" />
      <LoadingButton variant="contained" onClick={submitHandler}>
        Submit
      </LoadingButton>
    </ChatAppContainer>
  );
};

export default ChatApp;
