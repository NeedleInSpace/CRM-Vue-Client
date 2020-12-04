<template>
  <div>
    <div id="main-layout">
      <div id="buttons">
        <div id="calendarButton">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <button class="button-layout">
          <div class="button-text" v-on:click="onAddStageClick">+ Добавить задачу</div>
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
          <div class="task" v-for="task in day.tasks" v-bind:key="task.taskId">
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

@Component
export default class Calendar extends Vue {
  get companies() {
    return this.$store.getters.COMPANIES;
  }

  getCompanyName(taskCompanyId: any) {
    for (let i = 0; i < this.companies.length; i += 1) {
      if (this.companies[i].companyId === taskCompanyId) {
        return this.companies[i].name;
      }
    }
    return '';
  }

  get days() {
    const tasks = this.$store.getters.TASKS;
    const arr: any[] = [];

    const first = new Date();
    const second = new Date();
    const third = new Date();

    second.setDate(first.getDate() + 1);
    third.setDate(first.getDate() + 2);

    const lowerFirst = format(first, 'eeee', { locale: ru });
    const lowerSecond = format(second, 'eeee', { locale: ru });
    const lowerThird = format(third, 'eeee', { locale: ru });

    arr[0] = {
      dayNumber: format(first, 'dd.MM'),
      dayName: lowerFirst[0].toUpperCase() + lowerFirst.slice(1),
      tasks: tasks[0],
    };
    arr[1] = {
      dayNumber: format(second, 'dd.MM'),
      dayName: lowerSecond[0].toUpperCase() + lowerSecond.slice(1),
      tasks: tasks[1],
    };
    arr[2] = {
      dayNumber: format(third, 'dd.MM'),
      dayName: lowerThird[0].toUpperCase() + lowerThird.slice(1),
      tasks: tasks[2],
    };

    return arr;
  }

  onAddStageClick() {
    alert(this.days[0]);
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
