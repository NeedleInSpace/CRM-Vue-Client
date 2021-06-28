<template>
    <div>
        <div class="chart">
            <div class="header">
              Новые клиенты
            </div>
            <EmployeeChart :chart-data="chartData" :options="chartOptions" />
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
import EmployeeChart from '../charts/TaskCountChart.vue';

@Component({
  components: {
    EmployeeChart,
  },
})
export default class EmployeeNewContacts extends Vue {
  activeButton = 'all';

  chartData = {
    labels: [''],
    datasets: [{
      label: '',
      data: [0, 0, 0],
      backgroundColor: '#5ac37d',
    }],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  beforeCreate() {
    this.$store.dispatch('GET_EMPLOYEE_CONTACTS_CHART')
      .then((response) => {
        this.$store.commit('SET_EMPLOYEE_CONTACTS_CHART', response.data);
        this.getPeriodData('all');
      });
  }

  get employeeChartData() {
    return this.$store.getters.EMPLOYEE_CONTACTS_CHART;
  }

  getPeriodData(period: string) {
    if (this.employeeChartData[0] !== undefined) {
      this.chartData = {
        labels: this.employeeChartData[0].employeeIds,
        datasets: [
          {
            label: this.employeeChartData[0].label,
            data: this.employeeChartData[0][period],
            backgroundColor: '#5ac37d',
          },
          {
            label: this.employeeChartData[1].label,
            data: this.employeeChartData[1][period],
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
</style>
