<template>
  <div>
    <div class="head">
        <div class="name">
          Подробности
        </div>
         <div class="edit-mode">
            <div class="edit-text">
              Режим редактирования
              <div class="edit-switch" v-on:click="edit()">
                <i class="fas fa-toggle-on"
                v-on:click="isEditing=!isEditing" v-show="isEditing"></i>
                <i class="fas fa-toggle-off"
                v-on:click="isEditing=!isEditing" v-show="!isEditing"></i>
              </div>
            </div>
            <div class="rollback-button" >
              <i class="fa fa-undo" v-on:click="rollBack()" v-show="isEditing"></i>
            </div>
            <div class="save-button" >
              <i class="fa fa-floppy-o" v-on:click="saveChanges()" v-show="isEditing"></i>
            </div>
          </div>
      </div>
      <div class="details-info" v-if="project.id !== -1">
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
          <input
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
          <div class="field" v-show="!isEditing">
            {{ project.startDate !== null?
            project.startDate = project.startDate.substring(0,10).split('-').reverse().join('.')
            :'--'}}
          </div>
          <input
            v-model.lazy.trim="project.startDate"
            class="edit-field"
            v-show="isEditing"
            @input="isSaved=false"
          />
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
        v-if="project.description !== null && project.description.length !== 0">
          <div class="title">
            Описание
          </div>
          <div class="field" v-show="!isEditing">
            {{ project.description}}
          </div>
           <input
            v-model.lazy.trim="project.description"
            class="edit-field"
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
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class ProjectsDetils extends Vue {
  @Prop()
  projectId!: number;

  isEditing = false;

  isSaved = true;

  mounted() {
    this.$store.dispatch('GET_PROJECT_BY_ID', 1);
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
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

  saveChanges() {
    this.$store
      .dispatch('PATCH_PROJECT', [this.project, this.project.id])
      .then(() => {
        this.$store.dispatch('GET_PROJECT_BY_ID', this.project.id);
        this.isEditing = false;
        this.isSaved = true;
      });
  }

  @Watch('projectId')
  onChange(newVal: number, oldVal: number) {
    this.$store.dispatch('GET_PROJECT_BY_ID', newVal);
  }
}
</script>

<style scoped lang="scss">
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
    .edit-mode{
      display: flex;
      width: 60%;
      justify-content: space-between;
      align-items: center;

    .edit-text {
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
    }
  }
</style>
