<template>
  <div>
    <div id="background" v-if="showCalendar">
      <div id = "fadeBackground">
      </div>
      <CalendarWidget id="calendar-widget" @close='closeCalendar'/>
    </div>
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
        <Calendar id="calendar" @open='openCalendar' @newTask='onAddButtonClicked'/>
        <div class="details">
          <div id="details-layout">
            <div id="taskDetails-layout" v-if="currentTask===undefined||currentTask.length===0">
              <AddTask id="add-task-layout"/>
            </div>
            <div id="taskDetails-layout" v-if="currentTask!==undefined&&currentTask.length!==0">
              <TaskDetails id="task-details"/>
            </div>
          </div>
          <div id="details-layout"
            v-if="currentTask!==undefined&&currentTask.contactId!==undefined" >
            <ContactDetails id="contact-details"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from './Calendar.vue';
import CalendarWidget from './CalendarWidget.vue';
import AddTask from './AddTask.vue';
import TaskDetails from './TaskDetails.vue';
import ContactDetails from './ContactDetails.vue';

@Component({
  components: {
    Calendar,
    CalendarWidget,
    AddTask,
    TaskDetails,
    ContactDetails,
  },
})
export default class Manager extends Vue {
  showCalendar = false;

  get currentTask() {
    return this.$store.getters.CURRENT_TASK;
  }

  mounted() {
    this.$store.dispatch('GET_THREE_DAY_TASKS', new Date());
    this.$store.dispatch('GET_COMPANIES');
    console.log(this.currentTask);
  }

  openCalendar() {
    this.showCalendar = true;
  }

  closeCalendar() {
    this.showCalendar = false;
  }

  onAddButtonClicked() {
    this.$store.commit('SET_CURRENT_TASK', '');
  }
}

</script>

<style scoped lang="scss">

#fadeBackground {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
}

#calendar-widget {
  position: absolute;
  z-index: 2;
  top:50%;
  left:50%;
  text-align: left;
  background-color: white;
  opacity: 1;
  margin:-200px 0 0 -200px;
  border-radius: 10px;
}

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
      cursor: pointer;

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
    grid-template-columns: minmax(650px, auto) minmax(250px, 500px);

    #calendar {
      margin-right: 20px;
      box-shadow: 1.3px 1.3px 5px #707070;
      height: fit-content;
    }
    #contact-details{
      box-shadow: 1.3px 1.3px 5px #707070;
    }
    #details-layout {
      display: grid;
      grid-template-rows: minmax(200px, auto);
      grid-auto-flow: dense;

      #taskDetails-layout {
        margin-bottom: 20px;
        box-shadow: 1.3px 1.3px 5px #707070;
        height:fit-content;
      }

      #personDetails-layout {
        box-shadow: 1.3px 1.3px 5px #707070;
      }
    }
  }
}

</style>
