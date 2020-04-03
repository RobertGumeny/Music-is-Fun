export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    // this.albumThumbnail = data.albumThumbnail || data.artworkUrl60;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return /*html*/ `
    <div class="col-12 d-flex justify-content-between align-items-center">
    
    <div>
      <p class="search-result my-1">${this.artist}</p>
      <p class="search-result my-1 ml-2">${this.title}</p>
    </div>
  <button class="btn btn-success" onclick="app.songsController.makeActiveSong('${this._id}')">
      <i class="fas fa-play text-white"></i>
    </button>
  </div>
        `;
  }

  get activeTemplate() {
    return /*html*/ `
    <button class="btn btn-sm btn-block btn-success m-2" onclick="app.songsController.addSong('${this._id}')">Add to Playlist</button>
    <img src="${this.albumArt}">
  <p>${this.artist}</p>
  <p>${this.title}</p>
  <p>${this.album}</p>
  <audio controls>
    <source src="${this.preview}" />
  </audio>
    `;
  }

  get playlistTemplate() {
    return /*html*/ `
    <div
    class="col-12 d-flex justify-content-around align-items-center"
  >
   
    <div>
      <p class="playlist-text my-0">${this.artist}</p>
      <p class="playlist-text my-0 ml-2">${this.title}</p>
    </div>
    <button
      class="btn btn-danger btn-sm"
      onclick="app.songsController.removeSong('${this._id}')"
    >
      <i class="fas fa-times text-white"></i>
    </button>
  </div>
        `;
  }
}
