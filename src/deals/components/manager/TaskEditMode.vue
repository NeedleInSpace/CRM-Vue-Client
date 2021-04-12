<template>
  <div>
    <div id="main-layout">
        <div id="taskName-layout" class="taskField">
            <div id="taskName" class="fieldTitle">Название задачи</div>
            <div class="fieldBorder">
                <input
                    v-model.lazy.trim="task.taskName"
                    class="fieldContent"
                    placeholder="Название задачи"
                />
                <div class="error" v-if="task.taskName===undefined || task.taskName.length===0">
                    {{this.error}}
                </div>
            </div>
        </div>
        <div id="taskCompany-layout" class="taskField">
            <div id="taskCompany" class="fieldTitle">Компания</div>
            <div class="fieldBorder">
                <div class="fieldContent">
                    {{ project.shortName }}
                </div>
            </div>
        </div>
                <div id="taskStage-layout" class="taskField">
            <div id="taskStage" class="fieldTitle">Этап</div>
            <div class="fieldBorder">
                <div class="fieldContent">
                    {{ stage.stageName }}
                </div>
            </div>
        </div>
        <div id="taskContact-layout" class="taskField">
            <div id="taskContact" class="fieldTitle">Контактное лицо</div>
            <div class="fieldBorder">
                <div class="fieldContent">
                    <select v-model="task.contactId" class="edit-field select-field">
                        <option
                            v-for="cont in contactsOfCompany"
                            v-bind:key="cont.contactPersonId"
                            v-bind:value="cont.contactPersonId"
                        >
                            {{ cont.contactName }}
                        </option>
                    </select>
                    <div class="error" v-if="task.contactId===undefined">
                        {{this.error}}
                    </div>
                </div>
            </div>
        </div>
        <div id="meetDate">
            <div id="taskDate-layout" class="taskField">
                <div id="taskDate" class="fieldTitle">Дата</div>
                <div class="fieldBorder">
                    <input
                        v-model.lazy.trim="this.date"
                        class="fieldContent date"
                        placeholder="Дата"
                    />
                    <div class="error" v-if="task.taskDate===undefined || task.taskDate.length===0">
                        {{this.error}}
                    </div>
                </div>
            </div>
            <div id="taskTime-layout" class="taskField">
                <div id="taskTime" class="fieldTitle">Время</div>
                <div class="fieldBorder">
                    <input
                        v-model.lazy.trim="task.taskTime"
                        class="fieldContent time"
                        placeholder="Время"
                    />
                    <div class="error" v-if="task.taskTime===undefined || task.taskTime.length===0">
                        {{this.error}}
                    </div>
                </div>
            </div>
          </div>
          <div id="taskPlace-layout" class="taskField">
              <div id="taskPlace" class="fieldTitle">Место</div>
              <div class="fieldBorder">
                  <input
                      v-model.lazy.trim="task.taskPlace"
                      class="fieldContent"
                      placeholder="Место"
                  />
              </div>
          </div>
        <div id="taskDescription-layout" class="taskField">
            <div id="taskDescription" class="fieldTitle">Описание задачи</div>
            <div class="fieldBorder">
                <input
                    v-model.lazy.trim="task.taskDescription"
                    class="fieldContent"
                    placeholder="Описание задачи"
                />
                <div class="error" v-if="task.taskDescription===undefined
                || task.taskDescription.length===0">
                    {{this.error}}
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
export default class EditMode extends Vue {
  date = '';

  get task() {
    const task = this.$store.getters.CURRENT_TASK;
    this.date = format(new Date(task.taskDate), 'dd.MM.yyyy');
    return task;
  }

  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }

  get stage() {
    return this.$store.getters.CURRENT_STAGE;
  }

  get company() {
    return this.$store.getters.CURRENT_COMPANY;
  }

  get contact() {
    return this.$store.getters.CURRENT_CONTACT;
  }

  get contactsOfCompany() {
    return this.$store.getters.COMPANY_CONTACTS;
  }

  taskStatus = '';

  beforeCreate() {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('GET_TASK_BY_ID', this.$route.params.id);
    }
    this.$store.dispatch('GET_PROJECT_BY_ID', this.$store.getters.CURRENT_TASK.taskProjectId);
    this.$store.dispatch('GET_STAGE_BY_ID', this.$store.getters.CURRENT_TASK.taskStageId);
    this.$store.dispatch('GET_COMPANY_BY_ID', this.$store.getters.CURRENT_TASK.taskCompanyId);
    this.$store.dispatch('GET_CONTACT_BY_ID', this.$store.getters.CURRENT_TASK.contactId);
    console.log(this.$store.getters.CURRENT_TASK.taskCompanyId);
    this.$store.dispatch('GET_COMPANY_CONTACTS', this.$store.getters.CURRENT_TASK.taskCompanyId);
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 1) {
      this.taskStatus = 'В работе';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 2) {
      this.taskStatus = 'Ожидает подтверждения';
    }
    if (this.$store.getters.CURRENT_TASK.taskStatusId === 3) {
      this.taskStatus = 'Выполнена';
    }
  }

  onSaveButtonClick() {
    this.temp = '';
  }

  checkForm() {
    if (this.task.taskName === undefined || this.task.taskDescription === undefined
    || this.task.taskName.length === 0 || this.task.taskDescription.length === 0
    || this.task.contactId === undefined || this.task.taskCompanyId === undefined
    || this.task.taskDate === undefined || this.task.taskTime === undefined) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }

  error = '';

  temp = '';
}
</script>

<style scoped lang="scss">

#main-layout{
  #editMode-layout{
    margin-bottom:15px;
  }
  .select-field{
    border: white;
    width: 100%;
  }
  #fields-layout {
    display: grid;
    grid-auto-columns: minmax(400px, auto);
    text-align: left;
    grid-row-gap: 10px;

    .fieldTitle {
      color: #7f7f7f;
      font-size: 10pt;
    }

    .fieldBorder {
      display: inline-block;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #bebebe;
      width: 100%;

      .fieldContent {
        margin: 3px;
        font-size: 14pt;
        border: white;
        outline-style: none;
      }
    }
  }
.time{
  width: 75px;
}
.date{
  width: 95px;
}
#meetDate{
  display: flex;
  justify-content: space-between;
}
#taskDate-layout, #taskTime-layout{
      width: 45%;
}
}
</style>
