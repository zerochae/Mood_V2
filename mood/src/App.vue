<template>
  <div class="main-container">
    <div class="wrapper">
      <div class="top-bar">
        <i class="material-icons"> expand_more </i>
        <span> Mood </span>
        <i class="material-icons"> more_horiz </i>
      </div>

      <div class="img-area">
        <img :src="`${playingMusic.img}`" alt="" />
        <!-- <img src="./assets/con1.jpg" alt="" /> -->
      </div>

      <div class="song-details">
        <p class="name">
          {{ playingMusic.title }} {{ playingMusic.opus }}
          {{ playingMusic.tonality }}
        </p>
        <p class="artist">{{ playingMusic.composer }}</p>
      </div>

      <div v-on:click="warp" class="progress-area">
        <div class="progress-bar"></div>

        <div class="timer">
          <span class="current">0:00</span>
          <span class="duration">3:40</span>
        </div>
        <audio
          id="mainAudio"
          :src="`${playingMusic.file}`"
          v-on:ended="ended"
          v-on:loadeddata="setMusic"
        ></audio>
      </div>
      <div class="controls">
        <i
          id="repeat-plist"
          class="material-icons"
          @click="isRepeat()"
          :title="`${repeatTitle}`"
        >
          {{ repeatText }}
        </i>
        <i id="prev" @click="prev()" class="material-icons"> skip_previous </i>
        <!-- <div class="play-pause"> -->
        <div class="play-pause2">
          <i id="playPauseBtn" @click="playPause()" class="material-icons">
            play_arrow
          </i>
        </div>
        <!-- </div> -->
        <i id="next" @click="next()" class="material-icons"> skip_next </i>
        <i id="more-music" @click="showmore()" class="material-icons">
          queue_music
        </i>
      </div>
      <div class="music-list">
        <div class="header">
          <div class="row">
            <i id="showmoreBtn" class="material-icons"> queue_music </i>
            <span>Music list</span>
          </div>
          <i id="closeBtn" @click="moreclose()" class="material-icons">
            close
          </i>
        </div>
        <ul>
          <List
            :music="music"
            v-for="music in musicList"
            :key="music"
            @click="changeMusic(music.index)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "App",
  created() {
    this.axios
      .get("http://localhost:8011/selectall")
      .then((result) => {
        console.log("set");
        this.musicList = result.data;
      })
      .then(
        this.axios.get("http://localhost:8011/selectone").then((result) => {
          console.log("load");
          this.playingMusic = result.data;
        })
      );
  },
  mounted() {
    document.querySelector("#mainAudio").addEventListener("timeupdate", (e) => {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;
      let progressWidth = (currentTime / duration) * 100;
      document.querySelector(".progress-bar").style.width = `${progressWidth}%`;
      // this.loadedData();
      let musicCurrentTime = document.querySelector(".current");
      document
        .querySelector("#mainAudio")
        .addEventListener("loadeddata", () => {
          let musicDuration = document.querySelector(".duration");
          let audioDuration = document.querySelector("#mainAudio").duration;
          let totalMin = Math.floor(audioDuration / 60);
          let totalSec = Math.floor(audioDuration % 60);
          if (totalSec < 10) {
            totalSec = `0${totalSec}`;
          }
          musicDuration.innerText = `${totalMin}:${totalSec}`;
        });
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if (currentSec < 10) {
        currentSec = `0${currentSec}`;
      }
      musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });
  },
  beforeupdate() {
    this.load();
  },
  updated() {
    this.play();
  },
  data() {
    return {
      musicList: "",
      playingMusic: "",
      repeat: "",
      repeatText: "repeat",
      repeatTitle: "Playlist looped",
    };
  },
  components: {
    List,
  },
  methods: {
    playMusic() {
      let playPauseBtn = document.querySelector("#playPauseBtn");
      // let mainAudio = document.querySelector("#mainAudio");
      document.querySelector(".wrapper").classList.add("paused");
      playPauseBtn.innerText = "pause";
        this.play();
    },
    pauseMusic() {
      let playPauseBtn = document.querySelector("#playPauseBtn");
      let mainAudio = document.querySelector("#mainAudio");
      playPauseBtn.innerText = "play_arrow";
      document.querySelector(".wrapper").classList.remove("paused");
      mainAudio.pause();
    },
    playPause() {
      const isMusicPaused = document
        .querySelector(".wrapper")
        .classList.contains("paused");
      isMusicPaused ? this.pauseMusic() : this.playMusic();
    },
    next() {
      let num = this.playingMusic.index - 1;
      let lastNum = Object.keys(this.musicList).length - 1;
      if (num == lastNum) {
        this.playingMusic = this.musicList[0];
      } else {
        this.playingMusic = this.musicList[num + 1];
      }
      this.playMusic();
    },
    prev() {
      let num = this.playingMusic.index - 1;
      let lastNum = Object.keys(this.musicList).length - 1;
      if (num == 0) {
        this.playingMusic = this.musicList[lastNum];
      } else {
        this.playingMusic = this.musicList[num - 1];
      }
      this.playMusic();
    },
    warp: function (e) {
      let progressWidthval =
        document.querySelector(".progress-area").clientWidth;
      let clickedOffSetX = e.offsetX;
      let songDuration = document.querySelector("#mainAudio").duration;

      document.querySelector("#mainAudio").currentTime =
        (clickedOffSetX / progressWidthval) * songDuration;
      this.playMusic();
    },
    isRepeat() {
      if (this.repeatText == "repeat") {
        this.repeatText = "repeat_one";
        this.repeatTitle = "Song looped";
      } else if (this.repeatText == "repeat_one") {
        this.repeatText = "shuffle";
        this.repeatTitle = "Playback shuffle";
      } else if (this.repeatText == "shuffle") {
        this.repeatText = "repeat";
        this.repeatTitle = "Playlist looped";
      }
    },
    ended: function () {
      if (this.repeatText == "repeat") {
        this.next();
      } else if (this.repeatText == "repeat_one") {
        document.querySelector("#mainAudio").currentTime = 0;
        this.playMusic();
      } else if (this.repeatText == "suffle") {
        let num = Math.floor(
          Math.random() * Object.keys(this.musicList).length + 1
        );
        this.playingMusic = this.musicList[num];
        this.playMusic();
      }
    },
    play() {
      return new Promise((resolve) => {
        resolve(document.querySelector("#mainAudio").play());
      });
    },
    load() {
      return new Promise((resolve) => {
        resolve(document.querySelector("#mainAudio").load());
      });
    },
    showmore() {
      document.querySelector(".music-list").classList.add("show");
    },
    moreclose() {
      document.querySelector(".music-list").classList.remove("show");
    },
    loadeddata: function () {
      // const ul = document.querySelector("ul");

      for (let i = 0; i < this.musicList.length; i++) {
        // let liAudioTag = ul.getElementsByClassName(
        //   `"${this.musicList[i].file}"`
        // );

        let audioDuration = document.getElementById(
          `audio${this.musicList[i].index}`
        ).duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
          totalSec = `0${totalSec}`;
        }
        document.getElementById(
          `${this.musicList[i].file}`
        ).innerText = `${totalMin}:${totalSec}`;
      }
    },
    setMusic: function () {},
    changeMusic(index) {
      this.playingMusic = this.musicList[index - 1];
      this.moreclose();
    },
  },
};
</script>

<style>
@import "./assets/App.css";
</style>
