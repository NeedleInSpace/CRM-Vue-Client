<template>
  <div>
    <div class="complete-confirm" v-show="confirmDeleteOpen"
    v-if="task!==undefined">
      <div class="gray"></div>
      <div class="delete-window">
        Подтвердить удаление задачи?
        <div class="buttons-menu">
          <div class="button cancel-button" v-on:click="confirmDeleteOpen=false">Отмена</div>
          <div class="button confirm-button" v-on:click="deleteTask()">Подтвердить</div>
        </div>
      </div>
    </div>
    <div class="complete-confirm" v-show="confirmIsOpen"
    v-if="task!==undefined">
      <div class="gray"></div>
      <div class="complete-window">
        <div class="buttons-menu">
          <div class="last-task">
            Последняя задача этапа
            <div class="switch">
              <i class="fas fa-toggle-on"
              v-show="isLastTask"
              v-on:click="isLastTask = false"></i>
              <i class="fas fa-toggle-off"
              v-show="!isLastTask"
              v-on:click="isLastTask = true"></i>
            </div>
          </div>
          <div class="buttons">
            <div class="button-layout" v-on:click="completeTask()">
                <i class="fas fa-check"></i>
                <div v-show="isLastTask">Завершить этап</div>
                <div v-show="!isLastTask">Сдать задачу</div>
            </div>
            <i class="fas fa-times" v-on:click="confirmIsOpen=false"></i>
          </div>
        </div>
        <div class="addition">
          Результат задачи
          <div class="task-result">
            <input
              v-model.lazy.trim="taskResult"
              class="field-content"
            />
          </div>
          <div class="documents" v-show="isLastTask">
            <label for="file"><i class="fas fa-plus"></i> Прикрепить файл</label>
            <input id="file" type="file" ref="myfile" multiple v-on:change="handleFileUploads()" >
            <div class="file-info">
              <div class="file-icon" v-for="file in this.files" v-bind:key="file.name">
                <i class="far fa-file-alt"></i>
                {{file.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-layout">
      <div id="details-layout">
        <div id="details-header">
          <div id="header-left">
            <div class="name">Подробности</div>
          </div>
          <div id="header-right"  v-if="task!==undefined">
            <div id="edit-mode">
              <div id="toEdit-button">
                  <i class="far fa-list-alt" title="Перейти к списоку этапов"
                  v-on:click="openStages"></i>
                  <i class="fa fa-pencil" title="Редактировать"
                  aria-hidden="true" v-on:click="onEditButtonClick"
                  v-if="task.taskStatusId===1&&!editMode
                  &&task.creatorId===this.$store.getters.USER_ID"></i>
                  <i class="far fa-trash-alt" title="Удалить"
                  v-on:click="confirmDeleteOpen=true"
                  v-if="task.taskStatusId===1&&!editMode
                  &&task.creatorId===this.$store.getters.USER_ID"></i>
              </div>
              <div id="onEditMode-buttons" v-if="editMode">
                  <div id="rollback-button" v-on:click="onRollBackButtonClick">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                  </div>
                  <div id="save-button" v-on:click="onSaveButtonClick">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </div>
              </div>
            </div>
            <div class="button-layout" v-show="task.taskStatusId===1"
            v-on:click="confirmIsOpen = true"  v-if="!editMode">
              <i class="fas fa-check"></i>Сдать задачу
            </div>
          </div>
        </div>
        <div id="fields-layout" v-if="task!==undefined">
          <div id="fields" v-if="!editMode">
            <div id="task-name-layout" class="task-field">
              <div id="task-name" class="title">
                Название задачи
              </div>
              <div class="field-content">
                {{ task.taskName }}
              </div>
            </div>
            <div id="task-company-layout" class="task-field">
              <div id="task-company" class="title">
                Компания
              </div>
              <div class="field-content">
                {{ company.name }}
              </div>
              <div id="project-info">
                {{ project.shortName + ": " + stage.stageName }}
              </div>
            </div>
            <div id="task-contact-layout" class="task-field"
            v-if="contact!==undefined&&contact.contactPersonId!==undefined">
              <div id="task-contact" class="field-title">
                Контактное лицо
              </div>
              <div class="field-content">
                {{ contact.contactName }}
              </div>
            </div>
            <div id="meet-date">
              <div id="task-date-layout" class="task-field">
                <div id="task-date" class="title">
                  Дата
                </div>
                <div class="field-content">
                  {{ this.date }}
                </div>
              </div>
              <div id="task-time-layout" class="task-field">
                <div id="task-time" class="title">
                  Время
                </div>
                <div class="field-content">
                  {{ task.taskTime }}
                </div>
              </div>
              <div id="task-place-layout" class="task-field"
              v-if="task.taskPlace!==null&&task.taskPlace!==undefined">
                <div id="task-place" class="title">
                  Место
                </div>
                <div class="field-content">
                  {{ task.taskPlace }}
                </div>
              </div>
            </div>
            <div id="task-description-layout" class="task-field">
                <div id="task-description" class="title">
                  Описание задачи
                </div>
                <div class="field-content description">
                  {{ task.taskDescription }}
                </div>
            </div>
            <div id="task-comment-layout" class="task-field" v-if="task.comment!==null">
                <div id="task-comment" class="title">
                  Комментарий
                </div>
                <div class="field-content description">
                  {{ task.comment }}
                </div>
            </div>
          </div>
        </div>
        <div id="fields-layout" v-if="editMode">
            <EditMode id="editMode-layout"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditMode from './TaskEditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class TaskDetails extends Vue {
  isLastTask = false;

  confirmIsOpen = false;

  files = [] as Array<File>;

  confirmDeleteOpen = false;

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get stage() {
    return this.$store.getters.CURRENT_STAGE;
  }

  get company() {
    return this.$store.getters.CURRENT_COMPANY;
  }

  get contact() {
    return this.$store.getters.CURRENT_CONTACT;
  }

  get getFiles() {
    return this.$store.getters.TASK_DOCUMENTS;
  }

  get tasks() {
    return this.$store.getters.TASKS;
  }

  editMode = false;

  taskStatus = '';

  date = '';

  taskResult = '';

  get task() {
    if (this.$store.getters.CURRENT_TASK.taskName !== undefined) {
      this.taskResult = '';
      const task = this.$store.getters.CURRENT_TASK;
      this.date = format(new Date(task.taskDate), 'dd.MM.yyyy');
      this.$store.dispatch('GET_PROJECT_BY_ID', task.taskProjectId);
      this.$store.dispatch('GET_COMPANY_BY_ID', task.taskCompanyId);
      this.$store.dispatch('GET_STAGE_BY_ID', task.taskStageId);
      if (task.contactId !== null) {
        this.$store.dispatch('GET_CONTACT_BY_ID', task.contactId);
      }
      this.$store.dispatch('GET_COMPANY_CONTACTS', task.taskCompanyId);
      if (task.taskStatusId === 1) {
        this.taskStatus = 'В работе';
      }
      if (task.taskStatusId === 2) {
        this.taskStatus = 'Ожидает подтверждения';
      }
      if (task.taskStatusId === 3) {
        this.taskStatus = 'Выполнена';
      }
      return task;
    }
    return undefined;
  }

  openStages() {
    this.$store.dispatch('GET_PROJECT_STAGES', this.project.id)
      .then(() => this.$emit('openStages'));
  }

  completeTask() {
    if (this.isLastTask) {
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i += 1) {
        const file = this.files[i];
        formData.append('files', file);
      }
      this.$store
        .dispatch('SEND_DOCUMENTS', [this.task.taskId, formData]);
      this.task.taskStatusId = 2; // задача ожидает подтверждения
    } else {
      this.task.taskStatusId = 3;
    }
    this.task.result = this.taskResult;
    this.$store.dispatch('PATCH_TASK', [this.task]);
    this.confirmIsOpen = false;
  }

  /** Функция обработки нажатия кнопки редактирования */
  onEditButtonClick() {
    if (this.task.taskStatusId === 1) {
      this.editMode = true;
    }
  }

  /** Функция обработки нажатия кнопки сброса изменений */
  onRollBackButtonClick() {
    this.$store.dispatch('GET_TASK_BY_ID', this.task.taskId);
    this.editMode = false;
  }

  /** Функция обработки нажатия кнопки сохранений изменений */
  onSaveButtonClick() {
    this.$store
      .dispatch('PATCH_TASK', [this.task])
      .then(() => {
        this.$store.dispatch('GET_TASK_BY_ID', this.task.taskId);
        this.editMode = false;
      });
  }

  /** Функция обработки нажатия кнопки удаления задачи */
  deleteTask() {
    this.$store
      .dispatch('DELETE_TASK', this.task.taskId)
      .then(() => {
        let dayMonthFormatedDay;
        let fullDayFormatedDate;
        try {
          dayMonthFormatedDay = format(this.task.taskDate, 'dd.MM');
          fullDayFormatedDate = format(this.task.taskDate, 'yyyy-MM-dd');
        } catch {
          dayMonthFormatedDay = format(parseISO(this.task.taskDate.toString()), 'dd.MM');
          fullDayFormatedDate = format(parseISO(this.task.taskDate.toString()), 'yyyy-MM-dd');
        }
        for (let i = 0; i < this.tasks.length; i += 1) {
          if (format(this.tasks[i].taskDate, 'dd.MM') === dayMonthFormatedDay) {
            this.tasks.splice(i, 1);
            i -= 1;
          }
        }
        this.$store
          .dispatch('GET_DAY_TASKS', [this.$store.getters.USER_ID, fullDayFormatedDate])
          .then((response) => {
            this.$store.commit('SET_CURRENT_TASK', undefined);
            this.$store.commit('SET_COMPANY_CONTACTS', '');
            this.$store.commit('SET_CURRENT_COMPANY', undefined);
          })
          .catch(() => {
            console.log('ошибка');
          });
        this.$store.dispatch('GET_OVERDUE_TASKS', new Date())
          .then(() => {
            this.$store.commit('SET_CURRENT_TASK', undefined);
          });
      });
    this.confirmDeleteOpen = false;
  }

  @Ref('myfile') readonly form!: HTMLInputElement;

  handleFileUploads() {
    this.files = [];
    this.files = this.$refs.myfile.files;
    console.log(this.files[0]);
  }

  /* downloadFile(documentId: number) {
    this.$store.dispatch('DOWNLOAD_DOCUMENT', documentId)
      .then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.txt');
        document.body.appendChild(fileLink);
        fileLink.click();
      });
  } */
}
</script>

<style scoped lang="scss">
::-webkit-input-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* webkit */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

#body {
  text-align: center;
  opacity: 0.95;

  #main-layout {

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
    .buttons{
      display: flex;
      align-items: center;
    }
    }
    #details-layout {
      margin: 0px 15px;

      #details-header {
        justify-content: space-between;
        text-align: left;
        margin: 25px 10px 15px 10px;
        color: #7f7f7f;
        display: flex;
        align-items: center;

        #header-left {
          display: inline-block;
          text-align: left;
          width: 50%;

          .name {
            font-size: 18pt;
            font-family: calibri;
            display: flex;
            opacity: 87%;
          }

          #return-button {
            display: inline-block;
            color: #7f7f7f;

            i:hover {
              color: black;
            }
          }

          #task-name-layout {
            display: inline-block;
            margin-left: 25px;

            #task-name {
              font-size: 28pt;
            }
          }

          #edit-mode {
            display: inline-block;
            margin-left: 25px;
            margin-right: 10px;

            #edit-text {
              display: inline-block;
              font-size: 10pt;
            }

            #toEdit-button {
              display: inline-block;
              margin-left: 10px;
              font-size: 12pt;

              i:hover {
                color: black;
              }
            }

            #onEditMode-buttons {
              display: inline-block;

              #rollback-button {
                display: inline-block;
                margin-left: 10px;
                font-size: 12pt;

                i:hover {
                  color: black;
                }
              }

              #save-button {
                display: inline-block;
                margin-left: 10px;
                font-size: 12pt;

                i:hover {
                  color: black;
                }
              }
            }
          }
        }

        #header-right {
          display: inline-flex;
          vertical-align: top;
          align-items: center;

          #toEdit-button {
            margin-right: 10px;
            display: flex;
          }
        }

        #delete-button {
          font-size: 18pt;

          i:hover {
            color: black;
          }
        }
      }
      #project-info {
        display: inline-block;
        padding: 3px 15px;
        border-radius: 12px;
        opacity: 0.95;
        text-decoration: none;
        background: #FFB300;
      }
      #meet-date {
        display: flex;
        width: 98%;
      }
      #fields {
        display: inline-block;
        margin-bottom: 10px;
        width: 100%;

        .task-field {
          margin: 8px 10px 5px 10px;
        }

        .title {
          font-size: 10pt;
          color: #7f7f7f;
        }

        .field-content {
          font-size: 14pt;
          opacity: 0.95;
        }

        .description{
          height: fit-content;
          padding: 10px;
          box-shadow: 1px 3px 5px #BEBEBE;
          border: none;
        }
      }

      #editFields-layout {
        display: inline-block;
        vertical-align: top;
        width: 35%;
      }
    }
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
}
.buttons-menu{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.last-task{
  font-size: 13pt;
  color: #BEBEBE;
  display: flex;
}
.field-content {
  margin: 3px;
  font-size: 14pt;
  border: white;
  outline-style: none;
}
.switch{
  font-size: 14pt;
  margin-left: 10px;
  color: #5ac37d;
}
.fa-toggle-on, .fa-toggle-off {
  font-size: 17pt;
}
.task-result{
  display: inline-block;
  margin-top: 2px;
  border-radius: 6px;
  border: 1px solid #bebebe;
  width: 100%;
  width: 98%;
  min-height: 100px;
}
.fa-plus{
  color: #5ac37d;
}
.addition{
  margin: 20px 0 0;
  font-size: 13pt;
}
.documents{
  margin-top: 15px;
  margin-bottom: 5px;
}
.fas, .fa, .far{
  margin-right: 3px;
  cursor: pointer;
}
.fa-times{
  color: #BEBEBE;
  margin-left: 10px;
  cursor: pointer;
}
#file{
  display:none;
}
.file-icon {
  margin-right: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 25%;
  font-size: 11pt;
}
.file-info {
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
}
.fa-file-alt {
  color: #7f7f7f;
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

    .buttons-menu {
    display: flex;
    padding-top: 15px;

    .button {
      display: inline-block;
      border-radius: 12px;
      opacity: 0.95;
      font-size: 16pt;
      color: white;
      text-align: center;
      padding: 8px 14px;
      margin: 10px 0px;
      cursor: pointer;
    }

    .confirm-button {
      background: #5AC37D;
    }

    .cancel-button {
      background: #EF5350;
      margin-right: 20px;
    }
  }
}
.fa-pencil, .fa-list-alt {
  margin-right: 10px;
}
</style>
