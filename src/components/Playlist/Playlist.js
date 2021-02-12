import React, { useState, useCallback, useEffect } from "react";
import Song from "../Song";
import useLoggedIn from "../../hooks/useLoggedIn";
import { spotifyGetPlaylist, spotifyAuthRedirect } from "../../constants/api";
import { List, Card } from "antd";

const Playlist = () => {
  const [hookHeader] = useLoggedIn();
  const [playlist, setPlaylist] = useState();
  const [loading, setLoading] = useState(true);

  const requestConfig = {
    headers: hookHeader
  };

  const spotifyPlaylist = useCallback(async () => {
    try {
      let response = await fetch(spotifyGetPlaylist, requestConfig);
      let responseList = await response.json();
      setPlaylist(responseList.tracks.items);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [requestConfig]);

  useEffect(() => {
    if (hookHeader) {
      spotifyPlaylist();
    }
  }, [hookHeader]);

  if (loading) return <p>loading..</p>;

  return (
    <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <List style={{ maxHeight: "100vh", overflow: "auto", padding: 16 }}>
        {playlist ? (
          playlist.map(song => (
            <Song
              uri={song.track.uri}
              key={song.track.uri}
              name={song.track.name}
              artist={song.track.artists.map(artist => artist.name).join(", ")}
            />
          ))
        ) : (
          <>
            <a href={spotifyAuthRedirect}>Spotify login</a>
          </>
        )}
      </List>
    </Card>
  );
};

export default Playlist;
