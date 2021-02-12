import React, { useState, useContext, useEffect} from "react";
import Song from "../Song";
import { List, Card, Input } from "antd";
import useSearchSong from "../../hooks/useSearchSong";
import {AuthContext} from "../../context";


const Playlist = () => {
  const authContext = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [loading, searchSong, searchResults] = useSearchSong();
  const [showSearch, setShowSearch] = useState(false);


const handleChange = text => {
  searchSong(text, authContext.token)
  setSearchText(text);
}

useEffect(() => {
  if(authContext.token && authContext.isLoggedIn ){
    setShowSearch(true);
  }
}, [authContext])



if(showSearch){
  return (
    <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <Input value={searchText} placeholder="Search..." onChange={(e) => handleChange(e.target.value)}/>
      {
          loading ? <p>loading..</p> : null
      }
      <List style={{ maxHeight: "100vh", overflow: "auto", padding: 16 }}>
        {searchResults && searchResults.length  ? (
          searchResults.map(song => 
            <Song
              uri={song.uri}
              key={song.uri}
              name={song.name}
              artist={song.artists.map(artist => artist.name).join(", ")}
            />
          )
        ) : (
          <>
            ausilio
          </>
        )}
      </List>
    </Card>
  );
} 

return <p>polisia</p>

};

export default Playlist;