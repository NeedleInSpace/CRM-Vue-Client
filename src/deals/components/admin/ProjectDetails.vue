<template>
  <div>
    <div class="delete-confirm" v-show="confirmOpened">
      <div class="gray"></div>
      <div class="delete-window">
        Подтвердить удаление проекта?
        <br>
        Изменения будут необратимы.
        <div class="buttons-menu">
          <div class="button cancel-button" v-on:click="confirmOpened=false">Отмена</div>
          <div class="button confirm-button" v-on:click="deleteProject()">Подтвердить</div>
        </div>
      </div>
    </div>
    <div class="head">
      <div id="leftPart">
        <div class="name">
          Подробности
        </div>
      </div>
      <div id="rightPart">
        <div class="edit-title" v-if="project !== undefined">
          <div class="edit-mode">
            <div id="redact">Редактирование</div>
            <div class="edit-switch" v-on:click="edit()">
              <i class="fas fa-toggle-on"
              v-on:click="rollBack()" v-show="isEditing"></i>
              <i class="fas fa-toggle-off"
              v-on:click="isEditing=!isEditing" v-show="!isEditing"></i>
            </div>
          </div>
          <div class="delete-button" >
            <i class="far fa-trash-alt" v-on:click="confirmOpened=true" v-show="!isEditing"></i>
          </div>
          <div class="save-button" >
            <i class="fa fa-floppy-o" v-on:click="saveChanges()" v-show="isEditing"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="details-info" v-if="project !== undefined && project.id !== -1">
        <div class="short-name" v-if="project.shortName.length !== 0">
          <div class="title">
            Краткое название проекта
          </div>
          <div class="field" v-show="!isEditing">
            {{ project.shortName }}
          </div>
          <input
            v-model.lazy.trim="project.shortName"
            class="edit-field"
            placeholder="Краткое название"
            v-show="isEditing"
            @input="isSaved=false"
          />
        </div>
        <div class="full-name" v-if="project.fullName.length !== 0">
          <div class="title">
            Полное название проекта
          </div>
          <div class="field" v-show="!isEditing">
            {{ project.fullName }}
          </div>
          <textarea
            v-model.lazy.trim="project.fullName"
            class="edit-field"
            placeholder="Полное название"
            v-show="isEditing"
            @input="isSaved=false"
          />
        </div>
         <div class="stage-num">
          <div class="title">
            Количество этапов
          </div>
          <div class="field">
            {{ project.stagesNumber  }}
          </div>
        </div>
        <div class="date">
          <div class="title">
            Дата старта проекта
          </div>
          <div class="field">
            {{ project.startDate !== null?
            project.startDate
            :'--'}}
          </div>
        </div>
        <div class="member-num">
          <div class="title">
            Количество участников
          </div>
          <div class="field">
            {{ project.memberNumber  }}
          </div>
        </div>
        <div class="description"
        v-if="isEditing || (project.description && project.description.length !== 0)">
          <div class="title">
            Описание
          </div>
          <div class="field" v-show="!isEditing">
            {{ project.description}}
          </div>
           <textarea
            v-model.lazy.trim="project.description"
            class="edit-field description-text"
            placeholder="Описание"
            v-show="isEditing"
            @input="isSaved=false"
          />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import DateConverter from '@/models/DateConverter';
import {
  Component, Vue,
} from 'vue-property-decorator';

@Component
export default class ProjectsDetils extends Vue {
  isEditing = false;

  isSaved = true;

  confirmOpened = false;

  get project() {
    if (this.$store.getters.CURRENT_PROJECT.id !== undefined) {
      const project = this.$store.getters.CURRENT_PROJECT;
      project.startDate = DateConverter.fasttimeToDate(project.startDate);
      return project;
    }
    return undefined;
  }

  edit() {
    if (!this.isEditing) {
      this.rollBack();
    }
  }

  rollBack() {
    this.$store.dispatch('GET_PROJECT_BY_ID', this.project.id);
    this.isEditing = false;
  }

  deleteProject() {
    this.$store
      .dispatch('DELETE_PROJECT', this.project.id)
      .then(() => {
        this.$store.dispatch('GET_PROJECT_BY_ID', this.$store.getters.PROJECTS[0].id);
        this.$store.dispatch('GET_PROJECTS');
        this.confirmOpened = false;
      });
  }

  saveChanges() {
    this.$store
      .dispatch('PATCH_PROJECT', [this.project, this.project.id])
      .then(() => {
        this.$store.dispatch('GET_PROJECT_BY_ID', this.project.id);
        this.$store.dispatch('GET_PROJECTS');
        this.isEditing = false;
        this.isSaved = true;
      });
  }
}
</script>

<style scoped lang="scss">
.delete-window {
    z-index: 300;
    position: absolute;
    top: calc(50% - 50px);
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

.gray {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  background: #BEBEBE;
  opacity: 50%;
    left: 0;
  top: 0;
}

.head {
  display: flex;
  width: 100%;
  margin: 20px 4% 0px 4%;

  #leftPart {
    display: inline-block;
    width: 40%;

    .name {
      font-size: 20pt;
      align-items: center;
      display: flex;
      opacity: 87%;
    }
  }

  #rightPart {
    display: inline-block;
    width: 60%;
    text-align: right;
    margin-right: 10%;

    .edit-title {
      display: inline-block;
      align-items: center;

      .edit-mode {
        color: #7f7f7f;
        font-size: 12pt;
        display: inline-block;
        align-items: center;

        #redact {
          display: inline-block;
        }
      }

      .edit-switch {
        display: inline-block;
        margin: 0 10px;
        font-size: 14pt;
        cursor: pointer;

        .fa-toggle-on{
          color:#5AC37D;
        }

        .fa-toggle-on:hover {
          color: #A11E1E;
        }

        .fa-toggle-off {
          color: #7f7f7f;
        }

        .fa-toggle-off:hover {
          color:#5AC37D;
        }
      }

      .delete-button {
        display: inline-block;
        cursor: pointer;

        .fa-trash-alt {
          display: inline-block;
          font-size: 14pt;
          color: #707070;
        }

        .fa-trash-alt:hover {
          color: #A11E1E;
        }
      }

      .save-button {
        display: inline-block;
        color: black;
        font-size: 14pt;
        cursor: pointer;
      }

      .save-button:hover {
        color:#5AC37D;
      }
    }
  }
}
.details-info {
  margin: 20px 4%;

  .title {
    font-size: 10pt;
    color: #7f7f7f;
  }

  .field {
    font-size: 14pt;
    margin-bottom: 10px;
  }

  .edit-field {
    border: 1px solid #BEBEBE;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 14pt;
    margin-bottom: 10px;
    width:95%;
    outline-style: none;
  }
  textarea {
    resize: none;
    overflow: auto;
  }
  .description-text {
    height: 150px;
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
