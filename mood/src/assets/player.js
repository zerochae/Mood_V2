const wrapper = document.querySelector('.wrapper'),
musicImg = wrapper.querySelector('img-area img'),
musicName = wrapper.querySelector('song-details .name'),
musicArtist = wrapper.querySelector('song-details .artist');

let musicIndex = 2;

window.addEventListener("load", ()=>{
loadMusic(musicIndex);
});

function loadMusic(indexNumber){
    musicName.innerText = allMusic[indexNumb].name;
}