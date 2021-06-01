<template>
    <div>
        <div class="chart" v-if="loaded&&taskChartData.length !== 0&&this.chartData.length!==0">
          <TaskCountChart :chart-data="allData" :options="chartOptions" />
        </div>
        <div class="chart" v-if="loaded&&taskChartData.length !== 0&&this.chartData.length!==0">
          <TaskCountChart :chart-data="chartData" :options="chartOptions" />
          <div class="button-menu">
              <button class="button-layout" v-on:click="getPeriodData('day')">
                  <div class="button-text" >День</div>
              </button>
              <button class="button-layout" v-on:click="getPeriodData('week')">
                  <div class="button-text" >Неделя</div>
              </button>
              <button class="button-layout" v-on:click="getPeriodData('month')">
                  <div class="button-text" >Месяц</div>
              </button>
              <button class="button-layout" v-on:click="getPeriodData('year')">
                  <div class="button-text" >Год</div>
              </button>
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
  loaded = false;

  chartData = {};

  allData = {};

  statuses = ['В работе', 'Выполнено', 'Отклонено'];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
      }],
    },
  }

  mounted() {
    this.getAllData();
    this.getPeriodData('day');
    this.loaded = true;
    console.log(this.taskChartData);
  }

  get taskChartData() {
    return this.$store.getters.TASK_COUNT_CHART;
  }

  getPeriodData(period: string) {
    this.getAllData();
    this.chartData = {};
    if (this.taskChartData !== undefined) {
      this.chartData = {
        labels: this.statuses,
        datasets: [
          {
            label: this.taskChartData.label,
            data: this.taskChartData[period],
          },
        ],
      };
    }
    return this.chartData;
  }

  getAllData() {
    this.allData = {};
    if (this.taskChartData !== undefined) {
      this.allData = {
        labels: this.statuses,
        datasets: [
          {
            label: this.taskChartData.label,
            data: this.taskChartData.all,
          },
        ],
      };
    }
    return this.allData;
  }

  get chartDatas() {
    return this.chartData;
  }
}
</script>

<style scoped lang="scss">
.button-menu {
  display: inline-block;
    text-align: right;
    width: 100%;
    margin-bottom: 20px;
    .button-layout {
      display: inline-block;
      border: 1px solid white;
      margin-left: 15px;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;
      cursor: pointer;

      i {
        display: inline-block;
        font-size: 14pt;
        margin-right: 10px;
        color: white;
      }

      .button-text {
        display: inline-block;
        font-size: 14pt;
        color: white;
      }
    }

    .button-layout:active,
    .button-layout:focus {
      outline: none;
    }

    .button-layout:hover {
      border: 1px solid #508c64;
      background: white;

      i {
        color: #508c64;
      }

      .button-text {
        color: #508c64;
      }
    }
}
</style>
