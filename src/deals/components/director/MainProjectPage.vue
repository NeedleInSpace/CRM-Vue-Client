<template>
<div>
    <div id="offsets">
        <div id="header-buttons" v-if="userRole==='DIRECTOR'">
            <button class="button-layout">
            <i class="fa fa-list" aria-hidden="true"></i>
            <div class="button-text" v-on:click="openProjectList">Список проектов</div>
            </button>
            <button class="button-layout" v-on:click="waitingListIsOpen=true">
            <i class="fas fa-bell" aria-hidden="true"></i>
            <div class="button-text">
              Задачи в ожидании
              ({{waitingListCount}})
            </div>
            </button>
            <button class="button-layout" v-on:click="showManagerList=true">
            <i class="fa fa-search" aria-hidden="true"></i>
            <div class="button-text">Поиск других пользователей</div>
            </button>
        </div>
        <div class="main-page" v-if="!showManagerList">
            <ProjectBoard @closeWaitingList="waitingListIsOpen=false"
            @newTask="addTaskIsOpen=true"/>
            <AddTask @cancelAddTask="addTaskIsOpen=false"
            v-if="addTaskIsOpen&&userRole==='DIRECTOR'"/>
            <TaskDetails v-if="task!==undefined&&task.taskId!==undefined
            &&!waitingListIsOpen&&!addTaskIsOpen"/>
            <WaitingList @closeWaitingList="waitingListIsOpen=false"
            v-if="waitingListIsOpen&&userRole==='DIRECTOR'"/>
        </div>
        <div class="managers" v-if="showManagerList">
          <ManagerList @closeManagerList="showManagerList=false"/>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectBoard from './ProjectBoard.vue';
import AddTask from './AddTask.vue';
import TaskDetails from './TaskDetails.vue';
import WaitingList from './WaitingList.vue';
import ManagerList from '../ManagerList.vue';

@Component({
  components: {
    ProjectBoard,
    AddTask,
    TaskDetails,
    WaitingList,
    ManagerList,
  },
})
export default class Deals extends Vue {
  addTaskIsOpen = false;

  waitingListIsOpen = false;

  showManagerList = false;

  get userRole() {
    return this.$store.getters.ROLE;
  }

  mounted() {
    this.$store.dispatch('GET_PROJECT_BY_ID', this.$route.params.id)
      .then(() => {
        this.$store.dispatch('GET_PROJECT_STAGES', this.$route.params.id);
        this.$store.dispatch('GET_TASKS_BY_PROJECT_ID', this.$route.params.id);
        this.$store.dispatch('GET_COMPANIES');
        this.$store.dispatch('GET_MANAGERS');
        if (this.userRole === 'DIRECTOR') {
          this.$store.dispatch('GET_PROJECT_WAITING_TASKS', this.$route.params.id);
        }
      });
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get task() {
    return this.$store.getters.CURRENT_TASK;
  }

  get waitingListCount() {
    const currList = this.$store.getters.WAITING_LIST;
    return currList.length;
  }

  openProjectList() {
    this.$router.push('/deals');
  }
}
</script>

<style scoped lang="scss">
#offsets {
  margin: 2%;
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
    .main-page {
        display: grid;
        grid-template-columns: minmax(750px, auto) minmax(310px, auto);
    }
}
</style>
