<template>
  <div>
    <div id="offsets">
      <div id="header-buttons">
        <button class="button-layout">
          <i class="fa fa-list" aria-hidden="true"></i>
          <div class="button-text">Список проектов</div>
        </button>
        <button class="button-layout">
          <i class="fa fa-search" aria-hidden="true"></i>
          <div class="button-text">Просмотр других пользователей</div>
        </button>
      </div>
      <div id="main-layout">
        <Calendar id="calendar"/>
        <div id="details-layout">
          <div id="taskDetails-layout">
            Подробности по задаче.
          </div>
          <div id="personDetails-layout">
            Подробности по КЛ.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/Calendar.vue';

@Component({
  components: {
    Calendar,
  },
})
export default class Manager extends Vue {
  mounted() {
    this.$store.dispatch('GET_THREE_DAY_TASKS', [1, new Date()]);
    this.$store.dispatch('GET_COMPANIES');
  }
}

</script>

<style scoped lang="scss">

#offsets {
  margin: 2%;
  margin-right: 5%;

  #header-buttons {
    display: inline-block;
    text-align: right;
    width: 100%;
    margin-bottom: 20px;

    .button-layout {
      display: inline-block;
      border: 1px solid white;
      margin-left: 15px;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;

      i {
        display: inline-block;
        font-size: 14pt;
        margin-right: 10px;
        color: white;
      }

      .button-text {
        display: inline-block;
        font-size: 14pt;
        color: white;
      }
    }

    .button-layout:active,
    .button-layout:focus {
      outline: none;
    }

    .button-layout:hover {
      border: 1px solid #508c64;
      background: white;

      i {
        color: #508c64;
      }

      .button-text {
        color: #508c64;
      }
    }
  }

  #main-layout {
    display: grid;
    grid-template-columns: minmax(650px, auto) minmax(250px, auto);

    #calendar {
      margin-right: 20px;
      box-shadow: 1.3px 1.3px 5px #707070;
    }

    #details-layout {
      display: grid;
      // margin-right: 50px;
      grid-template-rows: minmax(200px, auto) minmax(200px, auto);
      grid-auto-flow: dense;

      #taskDetails-layout {
        margin-bottom: 20px;
        box-shadow: 1.3px 1.3px 5px #707070;
      }

      #personDetails-layout {
        box-shadow: 1.3px 1.3px 5px #707070;
      }
    }
  }
}

</style>
