<template>
  <div>
    <div class="complete-confirm" v-show="confirmDeleteOpen"
    v-if="task!==undefined&&task.creatorId===userId&&userRole==='DIRECTOR'">
      <div class="gray"></div>
      <div class="delete-window">
        Подтвердить удаление задачи?
        <div class="buttons-menu">
          <div class="buttons">
            <div class="button-layout cancel-button"
            v-on:click="confirmDeleteOpen=false">
              <div class="button-text">Отмена</div>
            </div>
            <div class="button-layout confirm-button" v-on:click="deleteTask()">
              <div class="button-text">Подтвердить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="complete-confirm" v-show="confirmIsOpen"
    v-if="task!==undefined&&task.creatorId===userId&&userRole==='DIRECTOR'">
      <div class="gray"></div>
      <div class="complete-window">
        <div class="confirm-header">
          <div class="name"> Завершить этап </div>
          <i class="fas fa-times" v-on:click="confirmIsOpen=false"></i>
        </div>
        <div class="comment">
          <textarea v-model="task.comment" class="comment-text"/>
        </div>
        <div class="buttons-menu">
          <div class="buttons">
            <div class="button-layout cancel-button" v-on:click="completeTask(false)">
                <div class="button-text">Отклонить</div>
            </div>
            <div class="button-layout" v-on:click="completeTask(true)">
                <div class="button-text">Подтвердить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task-details">
      <div class="details-header">
          <div class="header-top">
              <div class="name">Подробности</div>
              <div id="edit-mode" v-if="task.taskStatusId===1&&!editMode
                  &&task.creatorId===this.$store.getters.USER_ID&&userRole==='DIRECTOR'">
                <i class="fa fa-pencil" title="Редактировать"
                  aria-hidden="true" v-on:click="editMode=true">
                </i>
                <i class="far fa-trash-alt" title="Удалить"
                  v-on:click="confirmDeleteOpen=true">
                </i>
              </div>
              <div id="edit-mode" v-if="editMode">
                <i class="fa fa-undo" aria-hidden="true"
                v-on:click="onRollBackButtonClick"></i>
                <i class="fa fa-floppy-o" aria-hidden="true"
                v-on:click="onSaveButtonClick"></i>
              </div>
          </div>
          <div class="status">
            <div class="status-text"> {{taskStatus}} </div>
          </div>
      </div>
          <div id="fields-layout" v-if="task!==undefined">
            <div class="fields">
              <div id="task-name-layout" class="task-field">
                <div id="task-name" class="title">
                      Название задачи
                </div>
                <div class="field-content" v-if="!editMode">
                    {{ task.taskName }}
                </div>
                <div class="field-border" v-if="editMode">
                  <input
                      v-model.lazy.trim="task.taskName"
                      class="field-content"
                      placeholder="Название задачи"
                  />
                  <div class="error" v-if="task.taskName===undefined || task.taskName.length===0">
                      {{this.error}}
                  </div>
                </div>
              </div>
              <div id="task-description-layout" class="taskfield">
                <div id="task-description" class="title">
                      Суть задачи
                </div>
                <div class="field-content" v-if="!editMode">
                    {{ task.taskDescription }}
                </div>
                <div class="field-border" v-if="editMode">
                  <input
                      v-model.lazy.trim="task.taskDescription"
                      class="field-content"
                      placeholder="Название задачи"
                  />
                  <div class="error" v-if="task.taskDescription===undefined
                  || task.taskDescription.length===0">
                      {{this.error}}
                  </div>
                </div>
              </div>
              <div id="task-company-layout" class="task-field">
                <div id="task-company" class="title">
                  Компания
                </div>
                <div class="field-content">
                  {{ company.name }}
                </div>
              </div>
              <div id="task-responsible-layout" class="task-field">
                <div id="task-responsible" class="title">
                    Ответственный сотрудник
                </div>
                <div class="field-content" v-if="!editMode">
                  {{getManagerName(task.employeeId)}}
                </div>
                <div class="select-field" v-if="task.taskStatusId===1&&editMode">
                  <select v-model="task.employeeId">
                    <option selected disabled>Выберите сотрудника</option>
                    <option
                      v-for="manager in managers"
                      v-bind:key="manager.employeeId"
                      v-bind:value="manager.employeeId"
                    >
                      {{ manager.name }} ({{getManagerTasksCount(manager.employeeId)}})
                    </option>
                  </select>
                </div>
              </div>
              <div id="task-date-layout" class="task-field">
                <div class="task-date">
                  <div class="title">
                        Дата создания
                  </div>
                  <div class="field-content">
                      {{ formatedDate }}
                  </div>
                </div>
                <div class="task-duration">
                  <div class="title">
                        Время в обработке
                  </div>
                  <div class="field-content">
                      {{ duration }}
                  </div>
                </div>
              </div>
              <div class="addition" v-if="task.taskStatusId!==1">
                <div id="task-result" class="task-field">
                  <div class="title">
                    Результат
                  </div>
                  <div class="field-content">
                      {{ task.result !== null &&  task.result.length!==0? task.result : '--'}}
                  </div>
                </div>
                <div id="task-comment-layout" class="task-field" v-if="task.comment!==null">
                  <div id="task-comment" class="title">
                    Комментарий
                  </div>
                  <div class="field-content description">
                    {{ task.comment }}
                  </div>
                  <div class="field-border" v-if="editMode">
                    <input
                        v-model.lazy.trim="task.comment"
                        class="field-content"
                        placeholder="Комментарий"
                    />
                  </div>
                </div>
                <div id="task-documents" class="task-field"
                v-if="documents.length!==0">
                  <div class="title">
                    Дополнительные материалы
                  </div>
                  <div class="file-icon"
                  v-for="doc in documents" v-bind:key="doc.docId">
                    <div class="document" v-on:click="downloadFile(doc.docId, doc.documentTitle)">
                      <i class="far fa-file-alt"></i>
                      {{ doc.documentTitle }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div class="buttons" v-if="task.taskStatusId===2
      &&task.creatorId===userId&&userRole==='DIRECTOR'">
          <div class="button-layout">
              <div class="button-text">Перейти к сотруднику</div>
          </div>
          <div class="button-layout" v-on:click="confirmIsOpen=true">
              <div class="button-text">Вынести решение</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component({})
export default class Deals extends Vue {
  confirmIsOpen = false;

  taskStatus = '';

  changeManager = false;

  editMode = false;

  confirmDeleteOpen = false;

  get userId() {
    return this.$store.getters.USER_ID;
  }

  get userRole() {
    return this.$store.getters.ROLE;
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get task() {
    const currTask = this.$store.getters.CURRENT_TASK;
    this.$store.dispatch('GET_TASK_DOCUMENTS', currTask.taskId);
    this.$store.dispatch('GET_COMPANY_BY_ID', currTask.taskCompanyId);
    this.$store.dispatch('GET_MANAGER_TASKS_COUNT');
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 1) {
      this.taskStatus = 'В работе';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 2) {
      this.taskStatus = 'Ожидает подтверждения';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 3) {
      this.taskStatus = 'Выполнена';
    }
    return currTask;
  }

  get company() {
    return this.$store.getters.CURRENT_COMPANY;
  }

  get managers() {
    return this.$store.getters.MANAGERS;
  }

  getManagerName(managerId: string) {
    for (let i = 0; i < this.managers.length; i += 1) {
      if (this.managers[i].employeeId === managerId) {
        return this.managers[i].name;
      }
    }
    return '';
  }

  get formatedDate() {
    return format(this.task.taskDate, 'dd.MM.yyyy');
  }

  getManagerTasksCount(managerId: number) {
    // this.$store.dispatch('GET_MANAGER_TASKS_COUNT', managerId);
    const countMap = this.$store.getters.MANAGER_TASKS_COUNT;
    for (let i = 0; i < countMap.length; i += 1) {
      if (countMap[i][0] === managerId) {
        return countMap[i][1];
      }
    }
    return 0;
  }

  get duration() {
    let dayString = '';
    const currDate = new Date();
    const duration = Math.trunc((currDate.valueOf() - this.task.taskDate.valueOf()) / 3600000 / 24);
    if (duration === 1) {
      dayString = 'день';
    } else if (duration < 5 && duration !== 0) {
      dayString = 'дня';
    } else {
      dayString = 'дней';
    }
    return `${duration} ${dayString}`;
  }

  get documents() {
    return this.$store.getters.TASK_DOCUMENTS;
  }

  downloadFile(documentId: number, documentTitle: string) {
    this.$store.dispatch('DOWNLOAD_DOCUMENT', documentId)
      .then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', documentTitle);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
  }

  completeTask(isCompleted: boolean) {
    if (isCompleted) {
      this.task.taskStatusId = 3;
    } else {
      this.task.taskStatusId = 4;
    }
    this.$store.dispatch('PATCH_TASK', [this.task])
      .then((response) => {
        this.confirmIsOpen = false;
        this.$store.dispatch('GET_TASKS_BY_PROJECT_ID', this.project.id);
        this.$store.dispatch('GET_PROJECT_WAITING_TASKS', this.project.id);
      });
  }

  managerSelected(event: any) {
    this.$store.dispatch('PATCH_TASK', [event.target.value]);
  }

  onSaveButtonClick() {
    this.$store
      .dispatch('PATCH_TASK', [this.task])
      .then(() => {
        this.$store.dispatch('GET_TASK_BY_ID', this.task.taskId);
        this.editMode = false;
      });
  }

  onRollBackButtonClick() {
    this.$store.dispatch('GET_TASK_BY_ID', this.task.taskId);
    this.editMode = false;
  }

  deleteTask() {
    this.$store
      .dispatch('DELETE_TASK', this.task.taskId)
      .then(() => {
        this.$store.dispatch('GET_TASKS_BY_PROJECT_ID', this.$route.params.id);
        this.$store.commit('SET_CURRENT_TASK', undefined);
        this.confirmDeleteOpen = false;
      });
  }
}
</script>

<style scoped lang="scss">
.task-details {
    box-shadow: 1.3px 1.3px 5px #707070;
    height: fit-content;
    display: flex;
    flex-direction: column;
    .details-header {
        margin: 20px 0;
        align-items: center;
        .header-top {
          display:flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 6%;
          .name {
            font-size: 18pt;
            opacity: 87%;
            color: #7f7f7f;
          }
          .fa-pencil, .fa-undo{
            margin-right: 10px;
          }
        }
        .status {
          width: 60%;
          background: #ffb300;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          padding: 1px 0;
          text-align: center;
          float: right;
          margin: 10px 0;
          .status-text{
            color: white
          }
        }
        .fa, .far {
          cursor: pointer;
          color: #7f7f7f;
        }
    }
    .fields {
        margin: 0px 6% 20px;
        .title {
          color: #7f7f7f;
          font-size: 11pt;
        }
        .task-field {
          margin-bottom: 10px;
        }
        .field-border {
          display: inline-block;
          margin-top: 5px;
          border-radius: 6px;
          border: 1px solid #bebebe;
          width: 100%;
          .field-content {
            margin: 3px;
            font-size: 14pt;
            border: white;
            outline-style: none;
            width: 97%;
          }
        }
        .field-content {
          font-size: 14pt;
          opacity: 0.95;
          display: flex;
          align-items: center;
        }
        #task-date-layout {
          display: flex;
          justify-content: space-between;
        }
        .task-date, .task-duration {
          width: 50%;
        }
        .fa-exchange-alt {
          color: #7f7f7f;
          margin-left: 7px;
          cursor: pointer;
        }
        .file-icon {
          margin-right: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 35%;
          font-size: 13pt;
          opacity: 0.95;
          cursor: pointer;
        }
        .fa-file-alt {
          color: #7f7f7f;
          margin-right: 7px;
          cursor: pointer;
        }
    }
}
.select-field {
  position: relative;
  color: #7f7f7f;
  font-size: 13pt;
}
select {
  font-size: 12pt;
}
.select-field select {
  padding: 5px 25px 5px 1px;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-radius: 8px;
  border: 1px solid white;
  width: 100%;
}
.select-field:after {
 position: absolute;
  top: 25%;
  right: .5em;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f362";
}
.gray {
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 100%;
  background: #BEBEBE;
  opacity: 50%;
  left: 0;
  top: 0;
}
.confirm-header {
  display: flex;
  justify-content: space-between;
  font-size: 18pt;
  color: #7f7f7f;
  align-items: center;
  .fa-times{
    color: #BEBEBE;
    margin-left: 10px;
    cursor: pointer;
  }
}
.complete-window {
    z-index: 300;
    width: 35%;
    position: fixed;
    top: calc(50% - 50px);
    left: calc(50% - 250px);
    background: white;
    padding: 14px 20px;
    font-size: 14pt;
    border: 1px solid #BEBEBE;
    border-radius: 8px;
    .comment {
      margin-top: 30px;
      .comment-text {
        font-size: 13pt;
        height: 80px;
        width: 95%;
        border: 1px solid #7f7f7f;
        border-radius: 8px;
        resize: none;
        padding: 10px 10px;
        line-height: 15px;
        overflow: auto;
      }
    }
    .buttons {
      float: right;
    }
}
.delete-window {
  z-index: 200;
  position: fixed;
  left: calc(50% - 150px);
  background: white;
  padding: 14px 20px;
  font-size: 14pt;
  border: 1px solid #BEBEBE;
  border-radius: 8px;
  .buttons {
    justify-content: center;
  }
}
.buttons{
  display: flex;
  align-items: center;
  margin: 10px;

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
    margin-left: 7px;
  }
  .cancel-button {
    background: #EF5350;
  }
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
.cancel-button:hover {
  border: 1px solid #EF5350;
  background: white;

  .button-text {
    color: #EF5350;
  }
}
</style>
