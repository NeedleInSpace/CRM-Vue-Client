<template>
  <div class="task">
    <div class="head">
      <div id="left-header">
        <div class="name">Подробности</div>
      </div>
    </div>
    <div class="task-data">
        <div class="task-name" >
          <div class="title">
            Название задачи
          </div>
          <input
            v-model.lazy.trim="task.taskName"
            class="edit-field"
            placeholder="Название"
          />
          <div class="error" v-if="task.taskName===undefined || task.taskName.length===0">
            {{this.error}}
          </div>
        </div>
         <div class="company">
          <div class="title">
            Компания
          </div>
          <select
          v-model="task.taskCompanyId" class="edit-field select-field">
            <option selected disabled>Выберите компанию</option>
            <option
              v-for="company in companies"
              v-bind:key="company.companyId"
              v-bind:value="company.companyId"
            >
              {{ company.name.length!==0? company.name : company.fullName }}
            </option>
            </select>
          <div class="error" v-if="task.taskCompanyId===undefined">
            {{this.error}}
          </div>
        </div>
          <div class="project-block">
            <div class="title">
              Ответственный за выполнение
            </div>
            <select v-model="task.employeeId" class="edit-field select-field">
              <option selected disabled>Выберите сотрудника</option>
              <option
                v-for="manager in managers"
                v-bind:key="manager.employeeId"
                v-bind:value="manager.employeeId"
              >
                {{ manager.name }}
              </option>
            </select>
            <div class="error" v-if="task.employeeId===undefined">
              {{this.error}}
            </div>
          </div>
          <div class="project-block">
            <div class="title">
            Этап проекта
            </div>
            <select v-model="task.taskStageId" class="edit-field select-field">
              <option selected disabled>Выберите этап</option>
              <option
                v-for="projectStage in projectStages"
                v-bind:key="projectStage.id"
                v-bind:value="projectStage.id"
              >
                {{ projectStage.stageName }}
              </option>
            </select>
            <div class="error" v-if="task.taskStageId===undefined">
              {{this.error}}
            </div>
          </div>
        <div class="description">
          <div class="title">
            Описание задачи
          </div>
           <textarea
            v-model.lazy.trim="task.taskDescription"
            class="edit-field description-text"
            placeholder="Описание"
          />
        </div>
        <div class="error" v-if="task.taskDescription===undefined
        || task.taskDescription.length===0">
          {{this.error}}
        </div>
      </div>
      <div class="button-menu">
        <button class="button-layout cancel-button">
          <div class="button-text" v-on:click="cancel">Отменить</div>
        </button>
        <button class="button-layout">
            <div class="button-text" v-on:click="addTask">Добавить задачу</div>
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import Task from '@/models/Task';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { format, parseISO } from 'date-fns';

@Component
export default class AddTask extends Vue {
  task = {} as Task;

  error = '';

  get projectStages() {
    return this.$store.getters.CURRENT_STAGES;
  }

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get contactsOfCompany() {
    return this.$store.getters.COMPANY_CONTACTS;
  }

  get managers() {
    console.log(this.$store.getters.MANAGERS);
    return this.$store.getters.MANAGERS;
  }

  mounted() {
    this.$store.dispatch('GET_PROJECT_STAGES', this.task.taskProjectId);
    this.$store.dispatch('GET_COMPANIES');
    this.$store.dispatch('GET_MANAGERS');
  }

  addTask() {
    if (this.checkForm()) {
      this.task.taskTime = format(new Date(), 'HH:mm:ss');
      this.task.taskDate = new Date();
      this.task.creatorId = this.$store.getters.USER_ID;
      this.task.taskStatusId = 1;
      this.task.taskProjectId = this.project.id;
      this.task.isAssignment = true;
      console.log(this.task);
      this.$store.dispatch('POST_NEW_TASK', [this.task])
        .then((response) => {
          this.task.taskId = response.data;
          this.$store.dispatch('GET_PROJECT_STAGES', this.project.id);
          this.$store.dispatch('GET_TASKS_BY_PROJECT_ID', this.project.id);
          this.$store.commit('SET_CURRENT_TASK', this.task);
        });
      this.cancel();
    }
  }

  checkForm() {
    if (this.task.taskName === undefined || this.task.taskDescription === undefined
    || this.task.taskName.length === 0 || this.task.taskDescription.length === 0
    || this.task.taskCompanyId === undefined) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }

  cancel() {
    this.$emit('cancelAddTask');
  }
}
</script>

<style scoped lang="scss">
.task {
    box-shadow: 1.3px 1.3px 5px #707070;
    height: fit-content;
.head {
  display: flex;
  width: 100%;
  margin: 20px 4%;
  align-items: center;

  #left-header {
    display: inline-block;
    width: 50%;
  }

  #right-header {
    display: inline-block;
    width: 50%;
    text-align: right;
    margin-right: 10.5%;
  }
}

.name {
  display: inline-block;
  font-size: 18pt;
  font-family: calibri;
  display: flex;
  opacity: 87%;
  color: #7f7f7f;
}

.task-data {
  margin: 20px 4%;

  .title {
    font-size: 12pt;
    color: #7f7f7f;
    margin-top: 10px;
  }

  .field {
    font-size: 16pt;
    margin-bottom: 10px;
  }

  .edit-field {
    border: 1px solid #BEBEBE;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 16pt;
    width: 97%;
    outline-style: none;
  }
.edit-attr{
    border-radius: 3px;
    border: 1px solid #BEBEBE;
    padding: 4px;
}
.date{
    width: 30%;
}
.time{
    width: 15%;
}
.place{
    max-width: 45%;
}
textarea {
  resize: none;
  overflow: auto;
  width: 95%;
}

.description-text {
  height: 150px;
  box-shadow: 1px 3px 5px #BEBEBE;
  border: none;
}
.select-field{
    width: 100%;
}
  .error {
    color:red;
    font-size: 10pt;
  }
}
.button-menu {
    float: right;
    display: flex;
    margin: 0 10px 10px;
    .button-text {
        font-size: 12pt;
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
    .cancel-button {
        background: #EF5350;
        margin-right: 20px;
    }
    .cancel-button:hover {
        border: 1px solid #EF5350;
        .button-text {
        color: #EF5350;
        }
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

.edit-attr::-webkit-calendar-picker-indicator{
  display: none;
}
.fa-floppy-o{
  color:#5AC37D;
  font-size: 20px;
  cursor: pointer;
}

::-webkit-input-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* webkit */
::-moz-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* Firefox 19+ */
:-moz-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* Firefox 18- */
:-ms-input-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* IE */
.button-layout {
    background: #5ac37d;
    display: flex;
    border: 1px solid white;
    padding: 8px;
    border-radius: 12px;
    opacity: 0.95;
    text-decoration: none;
    cursor: pointer;
    color:white;
}
.addContact {
  padding: 3px 20%;
  font-size: 12pt;
}
}
</style>
