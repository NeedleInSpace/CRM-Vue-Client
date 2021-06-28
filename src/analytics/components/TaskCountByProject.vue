<template>
    <div class="chart">
      <div class="header">
        Текущее состояние задач по проекту
        <div>
            <select @change="projectSelected($event)"
            v-model="taskProjectId" class="edit-field select-field">
              <option selected disabled>Выберите проект</option>
              <option
                v-for="project in projects"
                v-bind:key="project.id"
                v-bind:value="project.id"
              >
                {{ project.shortName }}
              </option>
            </select>
        </div>
        <div class="error">{{error}} </div>
      </div>
      <div>
          <TaskCountChart :chart-data="chartData" :options="chartOptions" />
          <div class="button-menu">
                <div class="button-layout" :class="{active: activeButton === 'day' }"
                 v-on:click="getPeriodData('day')">
                    <div class="button-text" >День</div>
                </div>
                <div class="button-layout" :class="{active: activeButton === 'week' }"
                v-on:click="getPeriodData('week')">
                    <div class="button-text" >Неделя</div>
                </div>
                <div class="button-layout" :class="{active: activeButton === 'month' }"
                v-on:click="getPeriodData('month')">
                    <div class="button-text" >Месяц</div>
                </div>
                <div class="button-layout" :class="{active: activeButton === 'year' }"
                v-on:click="getPeriodData('year')">
                    <div class="button-text" >Год</div>
                </div>
                <div class="button-layout" :class="{active: activeButton === 'all' }"
                v-on:click="getPeriodData('all')">
                    <div class="button-text" >Все</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskCountChart from '../charts/TaskCountChart.vue';

@Component({
  components: {
    TaskCountChart,
  },
})
export default class TaskCount extends Vue {
  taskProjectId = '';

  activeButton = '';

  error = '';

  statuses = ['В работе', 'Выполнено', 'Отклонено'];

  chartData = {
    labels: this.statuses,
    datasets: [{
      label: '',
      data: [0, 0, 0],
      backgroundColor: '#5ac37d',
    }],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1,
        },
        afterDataLimits(scale: { max: number }) {
          scale.max += 1; // eslint-disable-line no-param-reassign
        },
      }],
    },
  }

  mounted() {
    this.$store.dispatch('GET_PROJECTS');
  }

  projectSelected($event: any) {
    this.$store.dispatch('GET_TASK_COUNT_BY_PROJECT_CHART', this.taskProjectId)
      .then((response) => {
        this.$store.commit('SET_TASK_COUNT_BY_PROJECT_CHART', response.data);
        this.getPeriodData('all');
      });
    this.error = '';
  }

  get projects() {
    return this.$store.getters.PROJECTS;
  }

  get taskChartData() {
    return this.$store.getters.TASK_COUNT_BY_PROJECT_CHART;
  }

  getPeriodData(period: string) {
    if (this.taskChartData.length === 0) {
      this.error = 'Выберите проект';
    } else if (this.taskChartData !== undefined) {
      this.chartData = {
        labels: this.statuses,
        datasets: [
          {
            label: this.taskChartData.label,
            data: this.taskChartData[period],
            backgroundColor: '#5ac37d',
          },
        ],
      };
      this.activeButton = period;
    }
  }
}
</script>
<style scoped lang="scss">
.button-menu {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #5ac37d;
  box-shadow: 1px 0 4px 4px rgba(0,0,0,.1);

  .button-layout {
    display: flex;
    height: 48px;
    color: white;
    text-decoration: none;
    align-items: center;
    width: 20%;

    .button-text {
      margin: 0 auto;
    }

    &.active, &:hover {
      background-color: white;
      color: #5ac37d;
    }
  }
}

.chart {
  margin: 50px 20px;
  box-shadow: 1.3px 1.3px 5px #707070;
  padding: 20px;
}

.header {
  font-size: 20pt;
  margin-bottom: 20px;
  opacity: 85%;
}
.edit-field {
    border: 1px solid #BEBEBE;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 16pt;
    width: 97%;
    outline-style: none;
}
.error {
  color: red;
  font-size: 12pt;
}
</style>
