<template>
  <div class="deals">
    <div id="offsets">
        <div id="header-buttons">
            <button class="button-layout">
            <i class="fas fa-bell" aria-hidden="true"></i>
            <div class="button-text" v-on:click="showTasks=true">
              Задачи в ожидании ({{waitingListCount}})</div>
            </button>
            <button class="button-layout" v-on:click="showManagerList=true">
            <i class="fa fa-search" aria-hidden="true"></i>
            <div class="button-text">Поиск других пользователей</div>
            </button>
        </div>
        <div id="main-layout" v-if="!showManagerList">
            <ProjectList @closeWaitingList="showTasks=false"/>
            <ProjectDetails
            v-if="project!==undefined&&project.id!==undefined&&!showTasks"/>
            <WaitingList @closeWaitingList="showTasks=false" v-if="showTasks"/>
        </div>
        <div class="managers" v-if="showManagerList">
          <ManagerList @closeManagerList="showManagerList=false"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectList from './ProjectList.vue';
import ProjectDetails from './ProjectDetails.vue';
import WaitingList from './WaitingList.vue';
import ManagerList from '../ManagerList.vue';

@Component({
  components: {
    ProjectList,
    ProjectDetails,
    WaitingList,
    ManagerList,
  },
})
export default class Deals extends Vue {
  showTasks = false;

  showManagerList = false;

  mounted() {
    this.$store.dispatch('GET_WAITING_TASKS', this.project.id);
    this.$store.dispatch('GET_COMPANIES');
    this.$store.dispatch('GET_MANAGERS');
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get waitingListCount() {
    return this.$store.getters.WAITING_LIST.length;
  }

  get tasks() {
    return this.$store.getters.WAITING_LIST;
  }

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  get managers() {
    return this.$store.getters.MANAGERS;
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
    #main-layout {
        display: grid;
        grid-template-columns: minmax(650px, auto) minmax(250px, 500px);
        margin: 40px 0;
    }
}

</style>
