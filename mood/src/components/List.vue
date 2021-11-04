<template>
  <li>
    <div class="row">
      <span>{{ music.title }} {{ music.opus }} {{ music.tonality }}</span>
      <p>{{ music.composer }}</p>
    </div>
    <audio
      v-on:loadeddata="loadeddata"
      :id="`audio${music.index}`"
      :src="`${music.file}`"
    ></audio>
    <span :id="`${music.file}`" class="audio-duration">3:40</span>
  </li>
</template>

<script>
export default {
    props:{
        music : Object,
    }
};
</script>

<style>
</style>