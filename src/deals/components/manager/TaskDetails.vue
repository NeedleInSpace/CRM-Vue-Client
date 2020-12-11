<template>
  <div>
    <div id="main-layout">
      <div id="details-layout">
        <div id="details-header">
          <div id="header-left">
            <router-link to="/deals" class="nav-element" active-class="active">
              <div id="return-button">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
            </router-link>
            <div id="taskName-layout">
              <div id="taskName" class="fieldContent">
                  {{ task.taskName }}
              </div>
            </div>
            <div id="editMode">
              <div id="edit-text">
                  Режим редкатирования
              </div>
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
          </div>
          <div id="header-right">
            <div id="delete-button" v-on:click="onDeleteButton">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div id="fields-layout">
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
            </div>
            <div id="taskCompany-layout" class="taskField">
              <div id="taskCompany" class="fieldTitle">
                Проект
              </div>
              <div class="fieldContent">
                {{ project.shortName }}
              </div>
            </div>
            <div id="taskStage-layout" class="taskField">
              <div id="taskStage" class="fieldTitle">
                Этап
              </div>
              <div class="fieldContent">
                {{ stage.stageName }}
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
                  {{ task.taskDate }}
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
              <div id="taskPlace-layout" class="taskField">
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
                <div class="fieldContent">
                  {{ task.taskDescription }}
                </div>
            </div>
          </div>
          <!-- <div id="editFields-layout" v-if="editMode">
            <EditMode id="editMode-layout"/>
          </div> !-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditMode from './TaskEditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class TaskDetails extends Vue {
  get task() {
    return this.$store.getters.CURRENT_TASK;
  }

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

  beforeMount() {
    console.log(this.$route.params.id);
    this.$store.dispatch('GET_TASK_BY_ID', parseFloat(this.$route.params.id));
  }

  mounted() {
    this.$store.dispatch('GET_PROJECT_BY_ID', this.$store.getters.CURRENT_TASK.taskProjectId);
    this.$store.dispatch('GET_COMPANY_BY_ID', this.$store.getters.CURRENT_TASK.taskCompanyId);
    this.$store.dispatch('GET_CONTACT_BY_ID', this.$store.getters.CURRENT_TASK.contactId);
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 1) {
      this.taskStatus = 'В работе';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 2) {
      this.taskStatus = 'Ожидает подтверждения';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 3) {
      this.taskStatus = 'Выполнена';
    }
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
    display: inline-block;
    min-width: 1000px;
    max-width: auto;
    margin: 25px 25px 0px 25px;
    padding-bottom: 25px;
    text-align: left;
    box-shadow: 1.4px 1.4px 5px #707070;
    border: 1px solid #ffffff;

    #details-layout {
      margin: 0px 15px;

      #details-header {
        justify-content: space-between;
        text-align: left;
        margin: 25px 20px 15px 10px;
        font-size: 28pt;
        color: #7f7f7f;

        #header-left {
          display: inline-block;
          text-align: left;
          width: 50%;

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
          display: inline-block;
          text-align: right;
          vertical-align: top;
          width: 50%;
        }

        #delete-button {
          font-size: 18pt;

          i:hover {
            color: black;
          }
        }
      }

      #fields {
        display: inline-block;
        vertical-align: top;
        width: 35%;

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
