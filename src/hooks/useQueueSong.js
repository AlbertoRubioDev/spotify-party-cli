const useQueueSong = (token) => {

  const queueSong = async (uri, token) => {

    const setting = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
    fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, setting);
    } catch (err) {
      console.log(err);
    }
  };

  return [queueSong];
};

export default useQueueSong;