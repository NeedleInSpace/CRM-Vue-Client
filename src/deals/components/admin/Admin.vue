<template>
  <div class="deals">
    <div class="projects">
      <ProjectsList id="project-list-component" @newProject='onAddButtonClicked'/>
    </div>
    <div class="details" v-show="!addButtonClicked">
      <ProjectDetails id="project-details"/>
    </div>
    <div class="details" v-if="addButtonClicked">
      <AddProject id="add-project" @cancel='cancelAddBlock'/>
    </div>
    <div class="stages">
      <ProjectStages id="project-stages"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectsList from './ProjectsList.vue';
import ProjectDetails from './ProjectDetails.vue';
import ProjectStages from './ProjectStages.vue';
import AddProject from './AddProject.vue';

@Component({
  components: {
    ProjectsList,
    ProjectDetails,
    ProjectStages,
    AddProject,
  },
})
export default class Deals extends Vue {
  addButtonClicked = false;

  mounted() {
    this.$store.dispatch('GET_PROJECTS');
    setTimeout(() => {
      if (this.$store.getters.PROJECTS.length > 0) {
        this.$store.commit('SET_CURRENT_PROJECT', this.$store.getters.PROJECTS[0]);
        this.$store.dispatch('GET_PROJECT_STAGES', this.$store.getters.PROJECTS[0].id);
      }
    }, 1000);
  }

  onAddButtonClicked() {
    this.addButtonClicked = true;
  }

  cancelAddBlock() {
    this.addButtonClicked = false;
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
