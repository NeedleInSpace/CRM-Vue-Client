<template>
  <div>
    <TaskCount />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskCount from './components/TasksCount.vue';

@Component({
  components: {
    TaskCount,
  },
})
export default class Analytics extends Vue {
  beforeCreate() {
    this.$store.dispatch('GET_TASK_COUNT_BY_STATUS');
  }
}
</script>

<style scoped lang="scss">
</style>
