<template>
  <div>
    <div class="head">
        <div class="name">
          Проекты
          <img alt="sort" src="../../assets/sort.svg" v-on:click="sortIt">
        </div>
        <div class = "add-project-button">
          <i class="fas fa-plus"></i>
          Добавить проект
        </div>
      </div>
    <div class="list">
    <ul class="project-list">
      <li class="project" v-for="project in projects"
      v-bind:key="project.projectId" @click='selectProject(project)'>
        <div class="short-name">
          <div class="title">
            Сокращенное название
          </div>
          <div class="field">
            {{ project.shortName }}
          </div>
        </div>
        <div class="date">
          <div class="title">
            Дата создания
          </div>
          <div class="field">
            {{ project.startDate !== null?
            project.startDate.substring(0,10).split('-').reverse().join('.'):'--'}}
          </div>
        </div>
        <div class="stage-num">
          <div class="title">
            Количество этапов
          </div>
          <div class="field">
            {{ project.stagesNumber  }}
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Project from '@/models/Project';

@Component
export default class ProjectsList extends Vue {
  get projects() {
    return this.$store.getters.PROJECTS.sort((a: Project, b: Project) => a.id - b.id);
  }

  mounted() {
    this.$store.dispatch('GET_PROJECTS');
  }

  selectProject(project: Project) {
    this.$emit('select', {
      selectedProject: project,
    });
  }

  sortIt() {
    return this.projects.sort((a: Project, b: Project) => {
      if (a.shortName < b.shortName) {
        return -1;
      }
      if (a.shortName > b.shortName) {
        return 1;
      }
      return 0;
    });
  }
}
</script>

<style scoped lang="scss">
.head {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 4% auto;
  }

  .name {
    font-size: 20px;
    font-family: calibri;
    align-items: center;
    display: flex;
    opacity: 87%;
    justify-content: space-around;
    width: 35%;
  }

  .add-project-button {
    display: inline-block;
    padding: 10px;
    border-radius: 12px;
    opacity: 0.95;
    text-decoration: none;
    background: #5AC37D;
    color: white;
    max-width: 49%;
    text-align: center;
  }
.head {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 4% auto;
  }

  .name {
    font-size: 20px;
    font-family: calibri;
    align-items: center;
    display: flex;
    opacity: 87%;
    justify-content: space-around;
    width: 35%;
  }

  .add-project-button {
    display: inline-block;
    padding: 10px;
    border-radius: 12px;
    opacity: 0.95;
    text-decoration: none;
    background: #5AC37D;
    color: white;
    max-width: 49%;
    text-align: center;
  }

  .list {
    width: 94%;
    margin: 20px auto 0;
    box-shadow: 1.3px 1.3px 5px #707070;
    height: 90%;
    overflow: auto;
  }
  .project-list {
    padding: 0;
  }
  .project:hover {
    box-shadow: 2px 2px 5px #508C64;
  }
  .project {
    list-style: none;
    display: inline-block;
    list-style: none;
    width: 84%;
    margin: 10px 2.5%;
    padding: 20px 0 20px 10%;
    box-shadow: 1.3px 1.3px 5px #707070;
    border: 1px solid #ffffff;
    .short-name {
      margin-bottom: 12px;
    }
    .date {
      margin-bottom: 12px;
    }
    .title {
      font-size: 12px;
      color: #7f7f7f;
    }

    .field {
      font-size: 17px;
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
