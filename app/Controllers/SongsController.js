import store from "../store.js";
import SongsService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = store.State.songs;
  console.log(songs);
  let template = "";
  songs.forEach(song => (template += song.Template));
  document.getElementById("search-results").innerHTML = template;
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let playlist = store.State.playlist;
  console.log(playlist);
  let template = "";
  playlist.forEach(song => (template += song.playlistTemplate));
  document.getElementById("playlist").innerHTML = template;
}
/**Draws active song to the page */
function _drawActive() {
  let activeSong = store.State.activeSong;
  console.log(activeSong);
  document.getElementById("active-song").innerHTML = activeSong.activeTemplate;
}

//Public
export default class SongsController {
  constructor() {
    store.subscribe("activeSong", _drawActive);
    store.subscribe("songs", _drawResults);
    store.subscribe("playlist", _drawPlaylist);
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  makeActiveSong(id) {
    SongsService.makeActiveSong(id);
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    SongsService.addSong(id);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    SongsService.removeSong(id);
  }
}
