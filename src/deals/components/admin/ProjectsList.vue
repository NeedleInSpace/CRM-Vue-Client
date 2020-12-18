<template>
  <div>
    <div class="head">
      <div id="leftPart">
        <div class="name">Проекты</div>
      </div>
      <div id="rightPart">
        <div class = "add-project-button" v-on:click="addNewProject()">+ Добавить проект</div>
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
            project.startDate:'--'}}
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
import { Component, Vue } from 'vue-property-decorator';
import Project from '@/models/Project';

@Component
export default class ProjectsList extends Vue {
  isSorted = false;

  get projects() {
    return this.$store.getters.PROJECTS;
  }

  selectProject(project: Project) {
    this.$store.commit('SET_CURRENT_PROJECT', project);
  }

  addNewProject() {
    this.$emit('newProject');
  }

  sortIt() {
    if (this.isSorted) {
      this.projects.sort((a: Project, b: Project) => a.id - b.id);
      this.isSorted = false;
    } else {
      this.projects.sort((a: Project, b: Project) => {
        if (a.shortName.toLowerCase() < b.shortName.toLowerCase()) {
          return -1;
        }
        if (a.shortName.toLowerCase() > b.shortName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      this.isSorted = true;
    }
  }
}
</script>

<style scoped lang="scss">

.head {
  display: flex;
  width: 100%;
  margin: 20px 4% 0px 4%;

  #leftPart {
    display: inline-block;
    width: 20%;

    .name {
      margin-top: 5px;
      font-size: 20pt;
      display: flex;
      opacity: 87%;
    }
  }

  #rightPart {
    display: inline-block;
    width: 80%;
    text-align: right;
    margin-right: 7%;

    .add-project-button {
      display: inline-block;
      border: 1px solid white;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      font-size: 14pt;
      text-decoration: none;
      background: #5AC37D;
      color: white;
      cursor: pointer;
    }

    .add-project-button:hover {
      border: 1px solid #5ac37d;
      opacity: 1;
      background: white;
      color: #5ac37d;
    }
  }
}

.list {
  margin: 10px 5px;
}
.project-list {
  width: 100%;
  padding: 0;
}
.project:hover {
  border: 1px solid #508c64;
}
.project {
  list-style: none;
  display: inline-block;
  list-style: none;
  width: 90%;
  margin: 10px 2.5%;
  padding: 20px 0 20px 5%;
  box-shadow: 1.3px 1.3px 5px #707070;
  border: 1px solid #ffffff;
  cursor: pointer;

  .short-name {
    margin-bottom: 12px;
  }
  .date {
    margin-bottom: 12px;
  }
  .title {
    font-size: 10pt;
    color: #7f7f7f;
  }

  .field {
    font-size: 14pt;
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
