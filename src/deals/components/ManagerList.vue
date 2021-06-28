<template>
  <div class="manager-layout">
    <div class="head">
      <div id="leftPart">
        <div class="name">Менеджеры</div>
      </div>
      <i class="fas fa-times" v-on:click="closeManagerList"></i>
    </div>
    <div class="list">
    <div class="manager-list">
      <div v-for="manager in managers"
      v-bind:key="manager.employeeId">
      <div class="manager" v-if="manager.employeeId!==currentUserId">
        <div class="manager-card"
        @click='selectManager(manager.employeeId)'>
            <div class="icon">
                <i class="fas fa-user-alt"></i>
            </div>
            <div class="info">
                <div class="name">
                    <div class="title">
                        ФИО
                    </div>
                    <div class="field">
                        {{ manager.name }}
                    </div>
                </div>
                <div class="task-count">
                    <div class="title">
                        Количество задач в работе
                    </div>
                    <div class="field">
                        {{ getManagerTasksCount(manager.employeeId) }}
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ManagersList extends Vue {
  isSorted = false;

  tempUrl = '';

  mounted() {
    this.$store.dispatch('GET_MANAGERS');
    this.$store.dispatch('GET_MANAGER_TASKS_COUNT');
  }

  get managers() {
    return this.$store.getters.MANAGERS;
  }

  get currentUserId() {
    return this.$store.getters.USER_ID;
  }

  selectManager(managerId: string) {
    this.$store.commit('SET_FIRST_DAY', null);
    this.$store.dispatch('GET_THREE_DAY_TASKS', [new Date(), managerId]);
    this.tempUrl = '/deals/managerBoard/';
    this.$router.push(this.tempUrl.concat(managerId));
  }

  getManagerTasksCount(managerId: number) {
    const countMap = this.$store.getters.MANAGER_TASKS_COUNT;
    for (let i = 0; i < countMap.length; i += 1) {
      if (countMap[i][0] === managerId) {
        return countMap[i][1];
      }
    }
    return 0;
  }

  closeManagerList() {
    this.$emit('closeManagerList');
  }
}
</script>

<style scoped lang="scss">
.manager-layout {
  display: flex;
  flex-direction: column;
  box-shadow: 1.3px 1.3px 5px #707070;
  width: 60%;
  margin: 0 auto;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 4% 0px 4%;

  #leftPart {
    display: inline-block;
    width: 20%;

    .name {
      margin-top: 5px;
      font-size: 20pt;
      display: flex;
      opacity: 87%;
    }
  }

  .fa-times {
    color:#7f7f7f;
    font-size: 18pt;
  }
}
.icon {
    font-size: 45pt;
    color: #5ac37d;
    opacity: 80%;
    margin-right: 40px;
    display: flex;
    align-items: center;
}
.list {
  margin: 10px 5px;
}
.manager-list {
  display: grid;
  width: 100%;
  padding: 0;
}
.manager-card:hover {
  border: 1px solid #508c64;
}
.manager-card {
  list-style: none;
  display: flex;
  list-style: none;
  width: 90%;
  margin: 10px 2.5%;
  padding: 20px 0 20px 5%;
  box-shadow: 1.3px 1.3px 5px #707070;
  border: 1px solid #ffffff;
  cursor: pointer;

  .short-name {
    margin-bottom: 12px;
  }
  .title {
    font-size: 10pt;
    color: #7f7f7f;
  }

  .field {
    font-size: 14pt;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #BEBEBE;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #BEBEBE;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7F7F7F;
}
</style>
