<template>
  <div>
    <div id="main-layout">
      <div id="buttons">
        <div id="calendarButton" v-on:click="openCalendar">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <button class="button-layout">
          <div class="button-text" v-on:click="onAddTaskClick">+ Добавить задачу</div>
        </button>
      </div>
      <div id="calendar-list">
        <div class="day" v-for="day in days" v-bind:key="day.dayName">
          <div class="day-header">
            <div class="day-name">
              {{ day.dayName }}
            </div>
            <div class="day-number">
              {{ day.dayNumber }}
            </div>
          </div>
          <div v-for="task in tasks" v-bind:key="task.taskId">
            <div v-on:click="toTaskDetails(task)">
              <div class="task" v-if="getFormatedDate(task.taskDate)===day.dayNumber"
              v-bind:style="{ 'box-shadow': checkTime(task.taskTime, task.taskDate)}">
                <div class="fields-layout">
                  <div class="taskField">
                    <div class="taskField-title">
                      Компания
                    </div>
                    <div class="taskField-content">{{ getCompanyName(task.taskCompanyId) }}</div>
                  </div>
                  <div class="taskField">
                    <div class="taskField-title">
                      Время
                    </div>
                    <div class="taskField-content">{{ task.taskTime }}</div>
                  </div>
                  <div class="taskField">
                    <div class="taskField-title">
                      Название задачи
                    </div>
                    <div class="taskField-content">{{ task.taskName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import { ru, ta } from 'date-fns/locale';
import Task from '@/models/Task';

@Component
export default class Calendar extends Vue {
  temp = '';

  currentDateTime = new Date();

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  checkTime(taskTime: string, taskDate: Date) {
    const tempDate = new Date(taskDate.toString().replace('00:00:00', taskTime));
    const diffTime = tempDate.getTime() - this.currentDateTime.getTime();
    if (taskDate.getDay() === this.currentDateTime.getDay()) {
      if (diffTime <= 3600000 && diffTime >= 0) {
        return '1.3px 1.3px 5px #FFB300';
      }
      if (diffTime < 0) { // добавить проерки на завершение задачи
        return '1.3px 1.3px 5px red';
      }
    }
    return '1.3px 1.3px 5px #707070';
  }

  getCompanyName(taskCompanyId: string) {
    for (let i = 0; i < this.companies.length; i += 1) {
      if (this.companies[i].companyId === taskCompanyId) {
        return this.companies[i].name;
      }
    }
    return '';
  }

  getFormatedDate(date: Date) {
    if (date === undefined) {
      return '';
    }
    this.temp = '';

    return format(date, 'dd.MM');
  }

  get tasks() {
    return this.$store.getters.TASKS;
  }

  get firstDay() {
    return this.$store.getters.FIRST_DAY;
  }

  mounted() {
    if (this.firstDay === null) {
      this.$forceUpdate();
    }
  }

  /**
   * Функция редиректа на страницу с подробной информацией о задаче.
   * @param {string} taskId - id задач
   */
  toTaskDetails(task: Task) {
    this.$store.commit('SET_CURRENT_TASK', task);
  }

  tempUrl = '';

  get days() {
    const arr: any[] = [];

    const first = this.firstDay;
    const second = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth());
    const third = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth());

    second.setDate(first.getDate() + 1);
    third.setDate(first.getDate() + 2);

    const lowerFirst = format(first, 'eeee', { locale: ru });
    const lowerSecond = format(second, 'eeee', { locale: ru });
    const lowerThird = format(third, 'eeee', { locale: ru });

    arr[0] = {
      date: first,
      dayNumber: format(first, 'dd.MM'),
      dayName: lowerFirst[0].toUpperCase() + lowerFirst.slice(1),
    };
    arr[1] = {
      date: second,
      dayNumber: format(second, 'dd.MM'),
      dayName: lowerSecond[0].toUpperCase() + lowerSecond.slice(1),
    };
    arr[2] = {
      date: third,
      dayNumber: format(third, 'dd.MM'),
      dayName: lowerThird[0].toUpperCase() + lowerThird.slice(1),
    };

    return arr;
  }

  openCalendar() {
    this.$emit('open');
  }

  onAddTaskClick() {
    this.$emit('newTask');
  }
}

</script>

<style scoped lang="scss">

#main-layout {
  margin: 20px 10px;

  #buttons {
    display: inline-block;
    text-align: right;
    width: 100%;

    #calendarButton {
      display: inline-block;
      margin-right: 25px;
      color: #7f7f7f;
      font-size: 20pt;
      cursor: pointer;

      i:hover {
        color: black;
      }
    }

    .button-layout {
      display: inline-block;
      border: 1px solid white;
      margin-right: 5px;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;
      cursor: pointer;

      .button-text {
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

      .button-text {
        color: #508c64;
      }
    }
  }

  #calendar-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .day {
      margin: 20px 8px;
      box-shadow: 1.3px 1.3px 5px #707070;

      .day-header {
        margin: 10px;
        border-bottom: 1px solid #707070;
        opacity: 0.9;

        .day-name {
          margin-bottom: 5px;
          text-align: center;
          font-size: 18pt;
          opacity: 0.9;
        }

        .day-number {
          margin-bottom: 5px;
          text-align: center;
          font-size: 18pt;
          opacity: 0.9;
        }
      }

      .task {
        margin: 20px 10px;
        box-shadow: 1.3px 1.3px 5px #707070;
        border: 1px solid #ffffff;
        cursor: pointer;

        .fields-layout {
          padding: 10px 15px;

          .taskField {
            margin: 5px 0px;

            .taskField-title {
              font-size: 10pt;
              color: #7f7f7f;
            }

            .taskField-content {
              font-size: 12pt;
              opacity: 0.75;
              font-weight: bold;
            }
          }
        }
      }

      .task:hover {
        border: 1px solid #508c64;
      }
    }
  }
}

</style>
