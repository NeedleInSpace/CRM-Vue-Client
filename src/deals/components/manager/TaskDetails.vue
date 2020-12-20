<template>
  <div>
    <div id="main-layout">
      <div id="details-layout">
        <div id="details-header">
          <div id="header-left">
            <div class="name">Подробности</div>
          </div>
          <div id="header-right"  v-if="task!==undefined">
            <div id="editMode">
              <div id="toEdit-button" v-on:click="onEditButtonClick" v-if="!editMode">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
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
            <div class="button-layout" v-on:click="onDeleteButton"  v-if="!editMode">
              <i class="fas fa-check"></i>Сдать задачу
            </div>
          </div>
        </div>
        <div id="fields-layout" v-if="task!==undefined">
          <div id="fields" v-if="!editMode">
            <div id="taskName-layout" class="taskField">
              <div id="taskName" class="fieldTitle">
                Название задачи
              </div>
              <div class="fieldContent">
                {{ task.taskName }}
              </div>
            </div>
            <div id="taskCompany-layout" class="taskField">
              <div id="taskCompany" class="fieldTitle">
                Компания
              </div>
              <div class="fieldContent">
                {{ company.name }}
              </div>
              <div id="project-info">
                {{ project.shortName + ": " + stage.stageName }}
              </div>
            </div>
            <div id="taskContact-layout" class="taskField">
              <div id="taskContact" class="fieldTitle">
                Контактное лицо
              </div>
              <div class="fieldContent">
                {{ contact.contactName }}
              </div>
            </div>
            <div id="meetDate">
              <div id="taskDate-layout" class="taskField">
                <div id="taskDate" class="fieldTitle">
                  Дата
                </div>
                <div class="fieldContent">
                  {{ this.date }}
                </div>
              </div>
              <div id="taskTime-layout" class="taskField">
                <div id="taskTime" class="fieldTitle">
                  Время
                </div>
                <div class="fieldContent">
                  {{ task.taskTime }}
                </div>
              </div>
              <div id="taskPlace-layout" class="taskField"
              v-if="task.taskPlace!==null&&task.taskPlace!==undefined">
                <div id="taskPlace" class="fieldTitle">
                  Место
                </div>
                <div class="fieldContent">
                  {{ task.taskPlace }}
                </div>
              </div>
            </div>
            <div id="taskDescription-layout" class="taskField">
                <div id="taskDescription" class="fieldTitle">
                  Описание задачи
                </div>
                <div class="fieldContent description">
                  {{ task.taskDescription }}
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
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditMode from './TaskEditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class TaskDetails extends Vue {
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

  editMode = false;

  taskStatus = '';

  date = '';

  get task() {
    if (this.$store.getters.CURRENT_TASK.taskName !== undefined) {
      const task = this.$store.getters.CURRENT_TASK;
      this.date = format(new Date(task.taskDate), 'dd.MM.yyyy');
      this.$store.dispatch('GET_PROJECT_BY_ID', task.taskProjectId);
      this.$store.dispatch('GET_COMPANY_BY_ID', task.taskCompanyId);
      this.$store.dispatch('GET_STAGE_BY_ID', task.taskStageId);
      this.$store.dispatch('GET_CONTACT_BY_ID', task.contactId);
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

  /** Функция обработки нажатия кнопки редактирования */
  onEditButtonClick() {
    this.editMode = true;
  }

  /** Функция обработки нажатия кнопки сброса изменений */
  onRollBackButtonClick() {
    this.$store.dispatch('GET_TASK_BY_ID', Number(this.$route.params.id));
    this.editMode = false;
  }

  /** Функция обработки нажатия кнопки сохранений изменений */
  onSaveButtonClick() {
    this.$store
      .dispatch('PATCH_TASK', [this.task])
      .then(() => {
        this.$store.dispatch('GET_TASK_BY_ID', Number(this.$route.params.id));
        this.editMode = false;
      });
  }

  /** Функция обработки нажатия кнопки удаления задачи */
  onDeleteButton() {
    this.$store
      .dispatch('DELETE_TASK', this.$route.params.id)
      .then(() => {
        this.$router.push('/deals');
      });
  }
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
      display: inline-block;
      border: 1px solid white;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;
      cursor: pointer;
      color:white;
    }
    #details-layout {
      margin: 0px 15px;

      #details-header {
        justify-content: space-between;
        text-align: left;
        margin: 25px 20px 15px 10px;
        color: #7f7f7f;
        display: flex;

        #header-left {
          display: inline-block;
          text-align: left;
          width: 50%;

          .name {
            display: inline-block;
            font-size: 20pt;
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

          #taskName-layout {
            display: inline-block;
            margin-left: 25px;

            #taskName {
              font-size: 28pt;
            }
          }

          #editMode {
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
      #meetDate {
        display: flex;
        width: 98%;
      }
      #fields {
        display: inline-block;
        margin-bottom: 10px;
        width: 100%;

        .taskField {
          margin: 8px 10px 5px 10px;
        }

        .fieldTitle {
          font-size: 10pt;
          color: #7f7f7f;
        }

        .fieldContent {
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
}
</style>
