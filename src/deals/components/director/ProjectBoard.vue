<template>
<div>
    <div class="project">
        <div class="head">
            {{project.shortName}}
            <button class="button-layout" v-if="userRole==='DIRECTOR'">
              <div class="button-text" v-on:click="onAddTaskClick">+ Добавить задачу</div>
            </button>
        </div>
        <div class="board-layout">
          <div class="board">
              <div class="stage_column"
              v-for="stage in projectStages" v-bind:key="stage.id">
                  <div class="stage-head">
                      <div class="name">
                          {{stage.stageName}}
                      </div>
                      <div class="purpose">
                        {{stage.result}}
                      </div>
                  </div>
                  <div class="tasks">
                  <div v-for="task in projectTasks" v-bind:key="task.taskId">
                    <div class="task" v-if="task.taskStageId===stage.id"
                    v-on:click="toTaskDetails(task)">
                    <i class="fas fa-bell" v-show="task.taskStatusId===2"></i>
                    <i class="fas fa-check" v-show="task.taskStatusId===3"></i>
                    <i class="fas fa-times-circle" v-show="task.taskStatusId===4"></i>
                      <div class="company-name">
                        <div class="title">
                          Компания
                        </div>
                        <div class="field-content">
                          {{getCompanyName(task.taskCompanyId)}}
                        </div>
                      </div>
                      <div class="responsible">
                        <div class="title">
                          Ответственный за задачу
                        </div>
                        <div class="field-content">
                        {{getManagerName(task.employeeId)}}
                        </div>
                      </div>
                      <div class="task-name">
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
            </div>
      </div>
    </div>
</div>
</template>
<script lang="ts">

import Task from '@/models/Task';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ProjectDetails extends Vue {
  get userRole() {
    return this.$store.getters.ROLE;
  }

  get stages() {
    return this.$store.getters.CURRENT_STAGES;
  }

  get projectTasks() {
    return this.$store.getters.TASKS;
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get projectStages() {
    return this.$store.getters.CURRENT_STAGES;
  }

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  get managers() {
    return this.$store.getters.MANAGERS;
  }

  onAddTaskClick() {
    this.$emit('newTask');
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
  }
}
</script>

<style scoped lang="scss">
.project {
    display: grid;
    margin-right: 15px;
    box-shadow: 1.3px 1.3px 5px #707070;
    .head {
        margin: 20px;
        font-size: 20pt;
        display:flex;
        justify-content: space-between;
    }
    .board-layout {
      overflow-x: scroll;
      margin: 20px;
    }
    .board {
        display: grid;
        margin: 10px 0;
        grid-auto-flow: column;
        grid-auto-columns: 250px;
        .stage_column {
            box-shadow: 1.3px 1.3px 5px #707070;
            margin: 0 5px;
            display: grid;
            grid-template-rows: 200px 1fr;
            .stage-head {
                border-bottom: 1px solid #5ac37D;
                margin: 5px 6%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .name {
                    font-size: 18pt;
                    text-align: center;
                    margin: auto 0;
                    height: fit-content;
                }
                .purpose {
                    margin: 0px auto 10px;
                    width: fit-content;
                    color: #7c7c7c;
                }
            }
            .task {
              padding: 7px;
              margin: 10px;
              box-shadow: 1.3px 1.3px 5px #707070;
              .fa-bell{
                color: #ffb300;
                float: right;
                margin: 10px 10px 0 0;
                font-size: 15pt;
              }
              .fa-check {
                color: #5ac37d;
                float: right;
                margin: 10px 10px 0 0;
                font-size: 15pt;
              }
              .fa-times-circle {
                color: #EF5350;
                float: right;
                margin: 10px 10px 0 0;
                font-size: 15pt;
              }
              .title {
                font-size: 10pt;
                color: #7f7f7f;
                margin-top: 10px;
              }
              .field-content {
                font-size: 13pt;
              }
            }
        }
    }
}

.button-layout {
  border: 1px solid white;
  padding: 10px;
  border-radius: 12px;
  opacity: 0.95;
  text-decoration: none;
  background: #5ac37d;
  cursor: pointer;
}
.button-text {
  display: inline-block;
  font-size: 14pt;
  color: white;
}

.button-layout:active,
.button-layout:focus {
  outline: none;
}

.button-layout:hover {
  border: 1px solid #508c64;
  background: white;

  .button-text {
      color: #508c64;
  }
}
::-webkit-scrollbar {
  width: 2px;
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
