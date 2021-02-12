import { useEffect, useState, useCallback } from "react";
import useLoggedIn from "./useLoggedIn";

const useSearchSong = () => {

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchSong = async (songName, token) => {

    const setting = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    try {
      console.log(songName, setting);
     setLoading(true);
      let response = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=5`, setting);
      let responseList = await response.json();
      setSearchResults(responseList.tracks.items);
      console.log(responseList.tracks.items);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return [loading, searchSong, searchResults]
};

export default useSearchSong;