<template>
  <div class="deals">
    <div class="projects">
      <ProjectsList id="project-list-component"  @select='onSelect'/>
    </div>
    <div class="details">
      <ProjectDetails id="project-details" :projectId='projectId'/>
    </div>
    <div class="stages">
      <ProjectStages id="project-stages" :projectId='projectId'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectsList from './components/ProjectsList.vue';
import ProjectDetails from './components/ProjectDetails.vue';
import ProjectStages from './components/ProjectStages.vue';
import Project from '../models/Project';

@Component({
  components: {
    ProjectsList,
    ProjectDetails,
    ProjectStages,
  },
})
export default class Deals extends Vue {
  projectId = 1;

  onSelect(data: any) {
    this.projectId = data.selectedProject.id;
  }
}
</script>

<style scoped lang="scss">
.deals {
  display:flex;
  .projects{
    width: 28%;
    margin: 2.5% 1%;
    display: inline-block;
    height: 950px;
    box-shadow: 1.3px 1.3px 5px #707070;
    overflow: auto;
  }
  #project-list-component{
    overflow: hidden;
    height: 100%;
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
  .details{
    width: 28%;
    margin: 2.5% 0;
    box-shadow: 1.3px 1.3px 5px #707070;
    height: fit-content;
    min-height: 200px;
  }
  .stages{
    width: 44%;
    margin: 2.5% 1%;
    box-shadow: 1.3px 1.3px 5px #707070;
    height: fit-content;
  }
}
</style>
