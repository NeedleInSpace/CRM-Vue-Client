<template>
  <div>
    <div id="main-layout">
      <div id="calendar-header">
        <div id="return-button" class="centered" v-on:click="closeCalendar">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
        <div id="today-layout" class="unselectable" v-on:click="toToday">
          <div id="today">
            {{ today.getDate() }}
            {{ choosenMonthes[today.getMonth()] }}
            {{ today.getFullYear() }}
          </div>
        </div>
      </div>
      <div id="choosenMonth">
        <div id="month-text" class="unselectable">
          {{ monthes[currentMonth] }}
          {{ currentYear }}
        </div>
        <div class="month-navigation centered" v-on:click="prevMonth">
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
        <div class="month-navigation centered" v-on:click="nextMonth">
          <i class="fa fa-chevron-up" aria-hidden="true"></i>
        </div>
      </div>
      <div id="calendar-names">
        <div class="dayName centered" v-for="name in dayNames" v-bind:key="name">
          <div class="dayName-text unselectable">
            {{ name }}
          </div>
        </div>
      </div>
      <div id="calendar-days">
        <div class="cell" v-for="(day, index) in days" v-bind:key="index"
        v-on:click="select(day)">
          <div class="selected-background background centered" v-if="day===selectedDay && day!==''">
            <div class="day-text">
              {{ day }}
            </div>
          </div>
          <div class="today-background background centered" v-else-if="isToday(day)">
            <div class="day-text">
              {{ day }}
            </div>
          </div>
          <div class="normal-background background centered" v-else-if="day!==''">
            <div class="day-text unselectable">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
      <div class="error" v-if="error">
        Пожалуйста, выберите дату
      </div>
      <div id="buttons-layout">
        <button id="acceptButton-border" class="button-layout">
          <div id="acceptButton-text" class="button-text"
          v-on:click="onAcceptClick">Перейти</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CalendarWidget extends Vue {
  today = new Date();

  currentYear = 0;

  currentMonth = 0;

  selectedDay = '-';

  monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'];

  choosenMonthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'];

  dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  days = [] as string[];

  error = false;

  fillCalendar(date: Date) {
    const month = new Date(date.getFullYear(), date.getMonth());
    const numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    this.currentMonth = month.getMonth();
    this.currentYear = month.getFullYear();

    let firstDay = month.getDay();
    if (firstDay === 0) {
      firstDay = 7;
    }

    for (let i = 0; i < firstDay - 1; i += 1) {
      this.days.push('');
    }

    for (let i = 1; i <= numberOfDays; i += 1) {
      this.days.push(i.toString());
    }

    for (let i = this.days.length; i < 42; i += 1) {
      this.days.push('');
    }
  }

  isToday(day: string) {
    // alert(1);
    return Number(this.today.getFullYear()) === this.currentYear
      && Number(this.today.getMonth()) === this.currentMonth
      && this.today.getDate() === Number(day);
  }

  toToday() {
    this.updateCurrentInfo(this.today);
    this.selectedDay = this.today.getDate().toString();
  }

  prevMonth() {
    this.updateCurrentInfo(new Date(this.currentYear, this.currentMonth, 0));
  }

  nextMonth() {
    this.updateCurrentInfo(new Date(this.currentYear, this.currentMonth, 32));
  }

  updateCurrentInfo(newDate: Date) {
    this.currentMonth = newDate.getMonth();
    this.currentYear = newDate.getFullYear();

    this.days = [];
    this.selectedDay = '-';
    this.fillCalendar(newDate);
  }

  select(day: string) {
    if (day !== '') {
      this.error = false;
      this.selectedDay = day;
    }
  }

  onAcceptClick() {
    if (this.selectedDay === '-') {
      this.error = true;
    } else {
      if (this.$route.params.id !== undefined
        && this.$route.params.id !== this.$store.getters.USER_ID) {
        this.$store.dispatch('GET_THREE_DAY_TASKS',
          [new Date(this.currentYear, this.currentMonth,
            Number(this.selectedDay)), this.$route.params.id]);
      } else {
        this.$store.dispatch('GET_THREE_DAY_TASKS',
          [new Date(this.currentYear, this.currentMonth,
            Number(this.selectedDay)), this.$store.getters.USER_ID]);
      }
      this.closeCalendar();
    }
  }

  closeCalendar() {
    this.$emit('close');
  }

  mounted() {
    this.fillCalendar(new Date());
  }

  temp = '';
}

</script>

<style scoped lang="scss">

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.centered {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-flow: row nowrap;
}

#main-layout {
  display: block;
  margin: 10px 15px;

  #calendar-header {
    display: grid;
    grid-template-columns: 1fr 6fr;
    padding-top: 5px;
    padding-bottom: 15px;
    margin-right: 7px;
    text-align: right;
    border-bottom: 1px solid #7f7f7f;

    #return-button {
      font-size: 26pt;
      color: #7f7f7f;
      cursor: pointer;

      i:hover {
        color: black;
      }
    }

    #today {
      display: inline-block;
      margin: 5px 5px 5px 0px;
      font-size: 18pt;
      color: #508C64;
      cursor: pointer
    }

    #today:hover {
      color: #5AC37D;
    }
  }

  #choosenMonth {
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 16pt;
    color: #707070;

    .month-navigation {
      font-size: 20pt;
      cursor: pointer;

      i:hover {
        color: black;
      }
    }

    #month-text {
      display: inline-block;
      margin-left: 15px;
    }
  }

  #calendar-names {
    display: grid;
    grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
    margin-top: 10px;

    .dayName {
      border: 1px solid #ffffff;

      .dayName-text {
        font-size: 14pt;
        color: #707070;
      }
    }
  }

  #calendar-days {
    display: grid;
    grid-template-rows: 50px 50px 50px 50px 50px;
    grid-template-columns: 50px 50px 50px 50px 50px 50px 50px;
    margin-top: 5px;

    .cell {
      display: inline-block;
      text-align: center;
      width: 100%;
      height: 100%;
      cursor: default;

      .background {
        .day-text {
          font-size: 14pt;
        }
      }

      .today-background {
        border: 1px solid #707070;
      }

      .normal-background:hover,
      .today-background:hover {
        background-color: #508C64;
        border: 1px solid #508C64;

        .day-text {
          color: white;
        }
      }

      .selected-background {
        background-color: #5ac37d;
        border: 1px solid #5ac37d;

        .day-text {
          color: white;
        }
      }
    }
  }

  .error {
    text-align: left;
    margin-top: 10px;
    margin-left: 2px;
    color: red;
    opacity: 0.8;
  }

  #buttons-layout {
    display: grid;
    margin: 10px 0px 15px 0px;
    text-align: right;

    #acceptButton-border {
      background: #5ac37d;
      cursor: pointer;
    }

    #acceptButton-border:hover {
      border: 1px solid #5ac37d;
      opacity: 1;
      background: white;

      #acceptButton-text {
        color: #5ac37d;
      }
    }

    .button-layout {
      display: inline-block;
      border: 1px solid white;
      padding: 8px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;

      .button-text {
        font-size: 14pt;
        color: white;
      }
    }

    .button-layout:active,
    .button-layout:focus {
      outline: none;
    }
  }
}

</style>
