<template>
  <div class="analytics">
    <TaskCount />
    <div class="task-chart">
      <TaskCountByProject />
      <TaskCountByEmployee />
    </div>
    <EmployeeNewContacts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskCount from './components/TasksCount.vue';
import TaskCountByProject from './components/TaskCountByProject.vue';
import TaskCountByEmployee from './components/TaskCountByEmployee.vue';
import EmployeeNewContacts from './components/EmployeeNewContacts.vue';

@Component({
  components: {
    TaskCount,
    TaskCountByProject,
    TaskCountByEmployee,
    EmployeeNewContacts,
  },
})
export default class Analytics extends Vue {
}
</script>

<style scoped lang="scss">
.task-chart {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
