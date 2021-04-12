<template>
    <div id="main-layout">
      <div id="details"  v-if="contact!==undefined
        &&contact.contactName!==undefined
        &&contact.contactName.length!==0">
        <div id="details-header">
            <div id="header-left">
              <div class="name">Контактное лицо</div>
            </div>
            <div id="header-right"  v-if="contact!==undefined">
            <div id="editMode">
              <div id="toEdit-button" v-on:click="onEditButtonClick" v-if="!editMode">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
              </div>
              <div id="onEditMode-buttons" v-if="editMode">
                  <div id="rollback-button" v-on:click="onRollBackButtonClick">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                  </div>
                  <div id="save-button" v-on:click="onSaveButtonClick">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div id="fields-layout" v-if="!editMode">
          <div id="contactName" class="taskField">
            <div id="contactName" class="fieldTitle">
              ФИО
            </div>
            <div class="fieldContent">
              {{ contact.contactName }}
            </div>
          </div>
          <div class="taskField">
            <div id="companyName" class="fieldTitle">
              Компания
            </div>
            <div v-if="contact.company!==undefined" class="fieldContent">
              {{ contact.company.name }}
            </div>
          </div>
          <div class="taskField">
            <div id="email" class="fieldTitle">
              Почта
            </div>
            <div class="fieldContent">
              {{ contact.mainEmail }}
            </div>
          </div>
          <div class="taskField">
            <div id="phone" class="fieldTitle">
              Телефон
            </div>
            <div class="fieldContent">
              {{ contact.mainPhone }}
            </div>
          </div>
          <div class="taskField">
            <div id="position" class="fieldTitle">
              Должность
            </div>
            <div class="fieldContent">
              {{ contact.position }}
            </div>
          </div>
          <div class="taskField">
            <div id="status" class="fieldTitle">
              Лицо, принимающее решения
            </div>
            <div class="fieldContent">
              <div v-if="contact.makeDecision">
                <i class="fas fa-check"></i>
              </div>
              <div v-if="!contact.makeDecision">-</div>
            </div>
          </div>
          <div class="taskField" v-show="contact.notes!==null">
            <div id="note" class="fieldTitle">
              Заметки
            </div>
            <div class="fieldContent notes">
              <div class="note" v-for="note in contact.notes" v-bind:key="note">
                {{ note }}
              </div>
            </div>
          </div>
        </div>
        <div id="fields-layout" v-if="editMode">
            <EditMode id="editMode-layout"/>
          </div>
      </div>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditMode from '../../../knowledge-base/views/ContactEditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class TaskDetails extends Vue {
  editMode = false;

  get contact() {
    return this.$store.getters.CURRENT_CONTACT;
  }

  onEditButtonClick() {
    this.editMode = true;
  }

  onRollBackButtonClick() {
    this.$store.dispatch('GET_CONTACT_BY_ID', this.contact.contactPersonId);
    this.editMode = false;
  }

  /** Функция обработки нажатия кнопки сохранений изменений */
  onSaveButtonClick() {
    console.log(this.contact);
    this.$store
      .dispatch('PATCH_CONTACT', [this.contact, this.contact.contactPersonId])
      .then(() => {
        console.log(this.contact.contactPersonId);
        this.$store.dispatch('GET_CONTACT_BY_ID', this.contact.contactPersonId);
        this.editMode = false;
      });
  }
}
</script>
<style scoped lang="scss">
#details-header {
        justify-content: space-between;
        text-align: left;
        margin: 25px 20px 15px 10px;
        color: #7f7f7f;
        display: flex;

        #header-left {
          display: inline-block;
          text-align: left;
          .name{
            font-size: 20pt;
            font-family: calibri;
            display: flex;
            opacity: 87%;
          }
        }
}
 #details {
      margin:0 15px
 }
.fieldTitle {
    font-size: 10pt;
    color: #7f7f7f;
}

.fieldContent {
    font-size: 14pt;
    opacity: 0.95;
}
#fields-layout{
  margin-bottom: 12px
}
.taskField {
          margin: 0px 10px 5px 10px;
        }
.notes{
  height: fit-content;
  padding: 10px;
  box-shadow: 1px 3px 5px #BEBEBE;
  border: none;
  overflow-y: scroll;
  height: 100px;
}
.note{
  padding: 5px;
  box-shadow: 1px 3px 5px #BEBEBE;
}
.fa-check{
  color: #5AC37D;
}
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #BEBEBE;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7F7F7F;
}
</style>
