<template>
  <header>
    <div id="logo">
      <img alt="Uralsbyt logo" src="../../assets/logo-minimal.svg"/>
    </div>
    <div id="head">
      <div id="user-block">
        <div class="subheader">
          Пользователь
        </div>
        <div class="username-full">
          {{ this.user }}
        </div>
      </div>
      <div id="date-block">
        <div class="date">
          {{ currentDate }}<br>
          {{ currentWeekday }}
        </div>
        <div class="time">
          {{ currentTime }}
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { addSeconds, format } from 'date-fns';
import { ru } from 'date-fns/locale';

@Component
export default class Header extends Vue {
  currentDateTime = new Date();

  timer = 0;

  get currentTime() {
    return format(this.currentDateTime, 'HH:mm:ss', { locale: ru });
  }

  get currentDate() {
    return format(this.currentDateTime, 'dd MMMM yyyy', { locale: ru });
  }

  get currentWeekday() {
    return format(this.currentDateTime, 'eeee', { locale: ru });
  }

  mounted() {
    this.timer = setInterval(this.updateTime, 1000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }

  updateTime() {
    this.currentDateTime = addSeconds(this.currentDateTime, 1);
  }

  get user() {
    return this.$store.getters.USERNAME;
  }
}
</script>

<style scoped lang="scss">
header {
  display: grid;
  z-index: 1;
  background-color: white;
  box-shadow: 1px 0 4px 4px rgba(0,0,0,.1);
  grid-template-columns: 192px 1fr;

  #logo {
    display: flex;
    background-color: #5AC37D;
    align-items: center;
    padding: 0px 16px;

    img {
      height: 48px;
    }
  }

  #head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;

    #user-block {
      .subheader {
        font-size: 12pt;
      }
      .username-full {
        font-size: 18pt;
        font-weight: 300;
      }
    }

    #date-block {
      text-align: right;
      font-weight: 300;
      .date {
        font-size: 11pt;
      }

      .time {
        font-size: 16pt;
      }
    }
  }
}
</style>
