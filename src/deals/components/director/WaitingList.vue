<template>
  <div class="waiting-list">
    <div class="head">
      <div class="name">Задачи, ожидающие подтверждения</div>
    </div>
    <div class="list">
        <div v-if="tasks.length===0">
          <div class="empty">
            Нет задач
          </div>
        </div>
        <div v-for="task in tasks" v-bind:key="task.taskId">
            <div class="task" v-on:click="toTaskDetails(task)">
                <i class="fas fa-bell"></i>
                <div id="company-name">
                    <div class="title">
                    Компания
                    </div>
                    <div class="field-content">
                      {{getCompanyName(task.taskCompanyId)}}
                    </div>
                </div>
                <div id="responsible">
                    <div class="title">
                    Ответственный за задачу
                    </div>
                    <div class="field-content">
                      {{getManagerName(task.employeeId)}}
                    </div>
                </div>
                <div id="task-name">
                    <div class="title">
                    Название задачи
                    </div>
                    <div class="field-content">
                      {{task.taskName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Task from '@/models/Task';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class WaitingList extends Vue {
  get project() {
    return this.$store.getters.CURRENT_PROJECT;
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

  getCompanyName(taskCompanyId: string) {
    for (let i = 0; i < this.companies.length; i += 1) {
      if (this.companies[i].companyId === taskCompanyId) {
        return this.companies[i].name;
      }
    }
    return '';
  }

  getManagerName(managerId: string) {
    for (let i = 0; i < this.managers.length; i += 1) {
      if (this.managers[i].employeeId === managerId) {
        return this.managers[i].name;
      }
    }
    return '';
  }

  toTaskDetails(task: Task) {
    this.$emit('closeWaitingList');
    this.$store.commit('SET_CURRENT_TASK', task);
    if (this.$route.params.id === undefined) {
      const tempUrl = '/deals/projectBoard/';
      this.$router.push(tempUrl.concat(task.taskProjectId.toString()));
    }
  }
}
</script>

<style scoped lang="scss">
.waiting-list {
    height: fit-content;
    box-shadow: 1.3px 1.3px 5px #707070;
    display: flex;
    flex-direction: column;
    max-height: 640px;
    overflow: hidden;
    .head {
      margin: 20px 5px 20px 25px;
      .name {
        font-size: 18pt;
        opacity: 0.95;
      }
    }
    .list {
      margin: 3px 10px 25px;
      overflow: auto;
      .task {
        box-shadow: 1.3px 1.3px 5px #707070;
        padding: 10px;
        margin: 20px 0;
        margin: 5px 5px 20px;
        .title {
          color: #7f7f7f;
          font-size: 10pt;
        }
        .field-content {
          font-size: 14pt;
        }
        .fa-bell {
          color: #ffb300;
          float: right;
          margin: 10px 10px 0 0;
          font-size: 15pt;
        }
      }
    }
    .empty {
      font-size: 13pt;
      margin: 10px 15px;
      color: #7f7f7f;
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
