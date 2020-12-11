<template>
  <div>
    <div id="main-layout">
      <div id="contactName-layout" class="contactField">
        <div id="contactName" class="fieldTitle">ФИО</div>
        <div class="fieldBorder">
          <input
            v-model.lazy.trim="contact.contactName"
            class="fieldContent"
            placeholder="ФИО"
          />
        </div>
      </div>
      <div id="contactCompany-layout" class="contactField">
        <div id="contactCompany" class="fieldTitle">Компания</div>
        <div class="fieldBorder">
          <input
            v-model.lazy.trim="contact.company.name"
            class="fieldContent"
            placeholder="Компания"
          />
        </div>
      </div>
      <div id="contactPosition-layout" class="contactField">
        <div id="contactPosition" class="fieldTitle">Должность</div>
        <div class="fieldBorder">
          <input
            v-model.lazy.trim="contact.position"
            class="fieldContent"
            placeholder="Должность"
          />
        </div>
      </div>
      <div id="contactMakeDecision-layout" class="contactField">
        <div id="contactMakeDecision" class="fieldTitle">
          Лицо принимающее решение
        </div>
        <input
          v-model="contact.makeDecision"
          type="checkbox"
          class="fieldContent"
          id="contactMakeDecision-checkbox"
        />
      </div>
      <div id="contactMainEmail-layout" class="contactField">
        <div id="contactMainEmail" class="fieldTitle">E-mail</div>
        <div class="fieldBorder">
          <input
            v-model.lazy.trim="contact.mainEmail"
            class="fieldContent"
            placeholder="E-mail"
          />
        </div>
      </div>
      <div id="contactOtherEmails-layout" class="contactField">
        <div id="contactOtherEmails" class="fieldTitle">Другие E-mail</div>
        <div id="contactOtherEmailsFieldBorder" class="fieldBorder">
          <button id="addEmail-button" class="addButton-layout" v-on:click="addEmailButtonClick()">
            <div id="addEmail-plus" class="plus">+</div>
            <div id="addEmail-text" class="addButton-text">Добавить E-mail</div>
          </button>
          <ul class="list">
            <li class="listElement" v-for="email in emails" v-bind:key="email">
              <div class="fieldBorder">
                <input
                  class="listField fieldContent emailField"
                  placeholder="Дополнительный E-mail"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div id="contactMainPhone-layout" class="contactField">
        <div id="contactMainPhone" class="fieldTitle">Телефон</div>
        <div class="fieldBorder">
          <input
            v-model.lazy.trim="contact.mainPhone"
            class="fieldContent"
            placeholder="Телефон"
          />
        </div>
      </div>
      <div id="contactOtherPhones-layout" class="contactField">
        <div id="contactOtherPhones" class="fieldTitle">Другие телефоны</div>
        <div class="fieldBorder">
          <div
            id="oPhones"
            v-for="oPhones in contact.otherPhones"
            v-bind:key="oPhones.text"
          >
            <input
              v-model.lazy.trim="oPhones.text"
              class="fieldContent"
            />
            <li> {{ oPhones }} </li>
          </div>
        </div>
      </div>
      <div id="adCcontactOtherPhones-layout" class="contactField">
        <button id="addPhone-button" class="addButton-layout" v-on:click="addPhoneButtonClick()">
          <div id="addPhone-plus" class="plus">+</div>
          <div id="addPhone-text" class="addButton-text">Добавить телефон</div>
        </button>
        <ul class="list">
          <li class="listElement" v-for="phone in phones" v-bind:key="phone">
            <div class="fieldBorder">
              <input
                class="listField fieldContent phoneField"
                placeholder="Дополнительный телефон"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditMode extends Vue {
  get contact() {
    return this.$store.getters.CURRENT_CONTACT;
  }

  beforeCreate() {
    this.$store.dispatch('GET_CONTACT_BY_ID', this.$route.params.id);
  }

  /** Функция обработки нажатия кнопки добавления новой почты */
  addEmailButtonClick() {
    this.temp = '';
    // this.phones.push('');
  }

  /** Функция обработки нажатия кнопки добавления нового телефона */
  addPhoneButtonClick() {
    this.temp = '';
    // this.emails.push('');
  }

  /** Функция обработки нажатия кнопки добавления нового контактного лица */
  onSaveButtonClick() {
    const emailList = document.querySelectorAll<HTMLInputElement>('.emailField');
    const phoneList = document.querySelectorAll<HTMLInputElement>('.phoneField');
    this.temp = '';

    emailList.forEach((email) => {
      if (email.value !== '') {
        this.contact.otherEmails.push(email.value);
      }
    });

    phoneList.forEach((phone) => {
      if (phone.value !== '') {
        this.contact.otherPhones.push(phone.value);
      }
    });
  }

  temp = '';

  emails: string[] = [];

  phones: string[] = [];
}
</script>

<style scoped lang="scss">

#main-layout{
  #fields-layout {
    display: grid;
    grid-auto-columns: minmax(400px, auto);
    text-align: left;
    grid-row-gap: 10px;
    margin-left: 20px;
    margin-right: 20px;

    #contactMakeDecision-checkbox {
      margin-top: 5px;
      transform: scale(1.5);
    }

    .fieldTitle {
      color: #7f7f7f;
      font-size: 10pt;
    }

    .fieldBorder {
      display: inline-block;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #bebebe;

      .fieldContent {
        margin: 5px;
        font-size: 14pt;
        border: white;
        outline-style: none;
      }
    }
  }
}
</style>
