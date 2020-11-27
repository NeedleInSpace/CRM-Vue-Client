<template>
  <div>
    <div id="Login_layout">
      <form class="login_form">
        <label id="form">Авторизация</label><br><br>
        <input required v-model="userLogin" type="text" placeholder="Логин"/> <br><br>

        <input required v-model="password" type="password" placeholder="Пароль"/> <br><br>

        <button id="button" v-on:click="login()">Вход</button>
        <label id="authWarn" v-show="warnFlag">Неверный логин или пароль</label>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '../store';

@Component
export default class Login extends Vue {
  userLogin = '';

  password = '';

  warnFlag = false;

  login() {
    store.dispatch('GET_USER', [this.userLogin, this.password]).then(() => {
      if (store.getters.TOKEN !== '') {
        this.warnFlag = false;
        this.$router.push('/');
      } else {
        this.warnFlag = true;
      }
    });
  }
}
</script>

<style scoped lang="scss">
  #Login_layout {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #5AC37D;
  }
  .login_form {
    background-color: white;
    box-shadow: 1px 0 4px 4px rgba(0,0,0,.1);
    display: inline-block;
    vertical-align: middle;
    border-radius: 8px;
    font-size: 18pt;
    left: 37%;
    top: 25%;
    position: absolute;
    margin: 0 auto;
    width: 25%;
    padding: 2%;
  }
  input {
    padding: 3%;
    font-size: 14pt;
    width: 90%;
  }
  ::-webkit-input-placeholder {
    font-size: 10pt;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  #button {
    border: #508C64;
    width: 97.5%;
    padding: 5%;
    color: white;
    background-color: #508C64;
    font-size: 18pt;
  }
  #authWarn {
    color: red;
    font-size: 10pt;
  }
  #authWarn:ch {
    color: red;
    font-size: 10pt;
  }
</style>
