import React, {useContext} from "react";
import useQueueSong from "../../hooks/useQueueSong";
import {AuthContext} from "../../context";
import { Button, List } from "antd";

const Playlist = props => {
  const authContext = useContext(AuthContext);
  const { uri, name, artist, ...other } = props;
  const [queueSong] = useQueueSong(uri);

  return (
    <>
      <List.Item
        {...other}
        extra={<Button onClick={()=>queueSong(uri, authContext.token)}>Add</Button>}
        style={{ color: "#fff" }}
      >
        {`${name} - ${artist}`}
      </List.Item>
    </>
  );
};

export default Playlist;
