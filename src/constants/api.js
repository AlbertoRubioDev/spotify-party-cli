const client_id = "d14abd6400894ddb9e50459bd431a659"; // Your client id
const scope = "user-modify-playback-state";
const playlist_id = "0CDmhxd8HBbuc8IDI9PpL8";

export const spotifyGetPlaylist = `https://api.spotify.com/v1/playlists/${playlist_id}`;
export const spotifyAuthRedirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000&response_type=token&scope=${scope}`;
//export const spotifySearchSong = `https://api.spotify.com/v1/search?q=${songname}&type=track&limit=1`;
