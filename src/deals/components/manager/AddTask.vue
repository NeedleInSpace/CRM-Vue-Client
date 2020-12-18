<template>
  <div>
    <div class="head">
      <div id="left-header">
        <div class="name">Подробности</div>
      </div>
      <div id="right-header">
        <i class="fa fa-floppy-o" v-on:click="addTask()"></i>
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
          <select @change="companySelected($event)"
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
        <div class="contact">
          <div class="title">
            Контактное лицо
          </div>
          <select v-model="task.contactId" class="edit-field select-field">
              <option selected disabled>Выберите контактное лицо</option>
              <option
                v-for="contact in contactsOfCompany"
                v-bind:key="contact.contactPersonId"
                v-bind:value="contact.contactPersonId"
              >
                {{ contact.contactName }}
              </option>
            </select>
          <div class="error" v-if="task.contactId===undefined">
            {{this.error}}
          </div>
        </div>
        <div class="attr">
          <div class="project-block">
            <div class="title">
              Проект
            </div>
            <select @change="projectSelected($event)"
            v-model="task.taskProjectId" class="edit-field select-field">
              <option selected disabled>Выберите проект</option>
              <option
                v-for="project in projects"
                v-bind:key="project.id"
                v-bind:value="project.id"
              >
                {{ project.shortName }}
              </option>
            </select>
            <div class="error" v-if="task.taskProjectId===undefined">
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
        </div>
        <div class="attr">
          <div class="date">
            <div class="title">
              Дата
            </div>
            <input min=currDate
            class="edit-field edit-attr" v-model="task.taskDate" type="date">
            <div class="error" v-if="task.taskDate===undefined || task.taskDate.length===0">
              {{this.error}}
            </div>
          </div>
          <div class="time">
            <div class="title">
              Время
            </div>
            <input class="edit-field edit-attr" v-model="task.taskTime" type="time">
            <div class="error" v-if="task.taskTime===undefined || task.taskTime.length===0">
              {{this.error}}
            </div>
          </div>
           <div class="place">
            <div class="title">
              Место
            </div>
            <input class="edit-field edit-attr" v-model="task.taskPlace" placeholder="Место">
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

  currDate: Date = new Date();

  mounted() {
    this.$store.dispatch('GET_PROJECTS');
  }

  get projectStages() {
    return this.$store.getters.CURRENT_STAGES;
  }

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  get projects() {
    return this.$store.getters.PROJECTS;
  }

  get contactsOfCompany() {
    return this.$store.getters.COMPANY_CONTACTS;
  }

  companySelected(event: any) {
    this.$store.dispatch('GET_COMPANY_CONTACTS', [event.target.value]);
  }

  projectSelected(event: any) {
    this.$store.dispatch('GET_PROJECT_STAGES', this.task.taskProjectId);
  }

  get tasks() {
    return this.$store.getters.TASKS;
  }

  addTask() {
    if (this.checkForm()) {
      this.task.taskTime = this.task.taskTime.concat(':00');
      this.task.employeeId = this.$store.getters.USER_ID;
      this.task.taskStatusId = 1;
      this.$store.dispatch('POST_NEW_TASK', [this.task])
        .then(() => {
          for (let i = 0; i < this.tasks.length; i += 1) {
            if (format(this.tasks[i].taskDate, 'dd.MM') === format(parseISO(this.task.taskDate.toString()), 'dd.MM')) {
              this.tasks.splice(i, 1);
              i -= 1;
            }
          }
          this.$store.dispatch('GET_DAY_TASKS', [this.$store.getters.USERNAME, this.task.taskDate]);
        });
      this.$emit('cancel');
      this.$store.commit('SET_COMPANY_CONTACTS', '');
    }
  }

  checkForm() {
    if (this.task.taskName === undefined || this.task.taskDescription === undefined
    || this.task.taskName.length === 0 || this.task.taskDescription.length === 0
    || this.task.contactId === undefined || this.task.taskCompanyId === undefined
    || this.task.taskDate === undefined || this.task.taskTime === undefined) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
.head {
  display: flex;
  // justify-content: space-between;
  width: 100%;
  margin: 20px 4%;

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
  font-size: 20pt;
  font-family: calibri;
  display: flex;
  opacity: 87%;
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
    width: 95%;
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
    width: 98%;
}
  .error {
    color:red;
    font-size: 10pt;
  }
}

.attr {
    display: flex;
    justify-content: space-between;
    width: 98%;
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
.project-block {
  width: 45%;
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

</style>
