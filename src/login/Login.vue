<template>
  <div>
    <div id="Login_layout">
      <form class="login_form">
        <label id="form">Авторизация</label><br><br>
        <input required v-model="userLogin" type="text" placeholder="Логин"/> <br><br>

        <input required v-model="password" type="password" placeholder="Пароль"/> <br><br>

        <div id="button" v-on:click="login()">Вход</div>
        <label id="authWarn" v-show="warnFlag">Неверный логин или пароль</label>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  userLogin = '';

  password = '';

  warnFlag = false;

  login() {
    this.$forceUpdate();
    this.$store.dispatch('GET_USER', [this.userLogin, this.password])
      .then((response) => {
        if (response.data.token !== '') {
          this.warnFlag = false;
          this.$router.push('/');
        } else {
          this.warnFlag = true;
        }
      })
      .catch(() => { this.warnFlag = true; });
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
  #form {
    display: inline-block;
    font-size: 20pt;
    margin-bottom: 10px;
  }
  input {
    padding: 3%;
    font-size: 14pt;
    width: 90.5%;
    border-radius: 5px;
    border: 1px solid #bebebe;
  }
  ::-webkit-input-placeholder {
    font-size: 10pt;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  #button {
    display: inline-block;
    width: 89%;
    padding: 4%;
    margin-top: 10px;
    border: 1px solid white;
    border-radius: 8px;
    background-color: #508C64;
    font-weight: bold;
    color: white;
    font-size: 18pt;
    text-align: center;
    cursor: pointer
  }

  #button:hover {
    border: 1px solid #508c64;
    background: white;
    color: #508c64;
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
