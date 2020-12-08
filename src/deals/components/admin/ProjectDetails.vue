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
        <div class="name">
          Подробности
        </div>
         <div class="edit-title" v-if="project !== undefined">
            <div class="edit-mode">
              Режим редактирования
              <div class="edit-switch" v-on:click="edit()">
                <i class="fas fa-toggle-on"
                v-on:click="isEditing=!isEditing" v-show="isEditing"></i>
                <i class="fas fa-toggle-off"
                v-on:click="isEditing=!isEditing" v-show="!isEditing"></i>
              </div>
            </div>
            <div class="delete-button" >
              <i class="far fa-trash-alt" v-on:click="confirmOpened=true" v-show="!isEditing"></i>
            </div>
            <div class="rollback-button" >
              <i class="fa fa-undo" v-on:click="rollBack()" v-show="isEditing"></i>
            </div>
            <div class="save-button" >
              <i class="fa fa-floppy-o" v-on:click="saveChanges()" v-show="isEditing"></i>
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
import Project from '@/models/Project';
import DateConverter from '@/models/DateConverter';
import {
  Component, Prop, Vue, Watch,
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
    alert(this.project.startDate);
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
    border: 1px solid #BEBEBE;
    border-radius: 8px;

    .buttons-menu {
    display: flex;
    padding-top: 15px;
    justify-content: space-between;

    .button {
      display: inline-block;
      border-radius: 12px;
      opacity: 0.95;
      font-size: 16px;
      color: white;
      max-width: 49%;
      text-align: center;
      padding: 8px 14px;
    }

    .confirm-button {
      background: #5AC37D;
    }

    .cancel-button {
      background: #EF5350;
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
  justify-content: space-between;
  width: 90%;
  margin: 4% auto;

  .name {
  font-size: 20px;
  font-family: calibri;
  align-items: center;
  display: flex;
  opacity: 87%;
  justify-content: space-around;
  width: 35%;
  }

  .edit-title {
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;

    .edit-mode {
      color: #7f7f7f;
      font-size:12px;
      display: flex;
      align-items: center;
    }

    .edit-switch {
      margin: 0 5px;
      font-size: 20px;
    }

    .fa-toggle-on{
      color:#5AC37D;
    }

    .fa-toggle-off{
      color: #7f7f7f;;
    }

    .fa-trash-alt {
      color: #707070;
    }

    .fa-floppy-o{
      color:#5AC37D;
      font-size: 20px;
    }

    .fa-undo{
      color: #A11E1E;
    }
  }
}
.details-info {
  margin: 20px 4%;

  .title {
    font-size: 12px;
    color: #7f7f7f;
  }

  .field {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .edit-field {
    border: 1px solid #BEBEBE;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 17px;
    margin-bottom: 10px;
    width:95%
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
