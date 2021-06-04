<template>
  <nav class="nav-list">
    <router-link to="/kb" class="nav-element"
      exact-active-class="active">
      <i class="fas fa-database"/> База знаний
    </router-link>
    <router-link to="/deals" class="nav-element"
      active-class="active">
      <i class="fas fa-hands-helping"/> Сделки
    </router-link>
    <router-link to="/analytics" class="nav-element"
      active-class="active">
      <i class="fas fa-chart-bar"></i> Аналитика
    </router-link>
    <div v-on:click="logout()">
      <router-link to="/login" class="nav-element"
      active-class="active">
        <i class="fas fa-sign-out-alt" /> Выход
      </router-link>
    </div>
  </nav>
</template>
<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavigationPanel extends Vue {
  get userRole() {
    return this.$store.getters.ROLE;
  }

  logout() {
    window.location.reload();
    this.$store.dispatch('POST_LOGOUT');
  }
}
</script>

<style scoped lang="scss">
.nav-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #508C64;
  box-shadow: 1px 0 4px 4px rgba(0,0,0,.1);

  .nav-element {
    display: flex;
    height: 48px;
    color: white;
    text-decoration: none;
    align-items: center;
    padding-left: 16px;

    i {
      width: 38px;
      text-align: center;
    }

    &.active, &:hover {
      background-color: white;
      color: #508C64;
    }
  }
  .fa-chart-bar {
    font-size: 18px;
  }
}
</style>
