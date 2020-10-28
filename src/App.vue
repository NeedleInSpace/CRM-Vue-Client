<template>
  <div id="app">
    <Header id="header"/>
    <NavigationPanel id="nav"/>
    <router-view id="body"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/shared/components/Header.vue';
import NavigationPanel from '@/shared/components/NavigationPanel.vue';

@Component({
  components: {
    Header,
    NavigationPanel,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-areas:
    "header header"
    "nav  body";
  grid-template-columns: 192px 1fr;
  grid-template-rows: 80px 1fr;

  font-family: Calibri, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#header {
  grid-area: header;
}

#nav {
  grid-area: nav;
}

#body {
  grid-area: body;
}
</style>
