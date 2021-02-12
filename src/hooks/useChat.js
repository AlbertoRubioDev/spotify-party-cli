import { useEffect, useRef, useState, useContext } from "react";
import socketIOClient from "socket.io-client";
import useSearchSong from "./useSearchSong";
import useQueueSong from "./useQueueSong";
import {AuthContext} from "../context";


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "https://spotify-chat-party.herokuapp.com/";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const [queueSong] = useQueueSong();
  const [loading, searchSong, searchResults] = useSearchSong();
  const authContext = useContext(AuthContext);



  const addToSpotifyQueue = (incomingMessage) =>{
    searchSong(incomingMessage.body, authContext.token); 
  }

  useEffect(() => {
    
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      addToSpotifyQueue(incomingMessage);
      setMessages((messages) => [...messages, incomingMessage]);
    });


    if(searchResults && searchResults.length){
      queueSong(searchResults[0].uri, authContext.token);
    }
    
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, searchResults ]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;