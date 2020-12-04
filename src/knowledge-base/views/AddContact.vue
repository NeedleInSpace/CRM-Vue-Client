<template>
  <div>
    <div id="main-layout">
      <div id="addContact-layout">
        <div id="addContact-header">
          <router-link to="/kb" class="nav-element" active-class="active">
            <div id="return-button">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </div>
          </router-link>
          <div id="contactName-field">
            <input
              v-model.lazy.trim="contact.contactName"
              id="contactName-input"
              placeholder="ФИО"
            />
          </div>
          <div class="error"
          v-if="contact.contactName===undefined || contact.contactName.length===0">
            {{this.error}}
          </div>
        </div>
        <div id="fields-layout">
          <div id="companyId-layout" class="contactField">
            <div id="companyId" class="fieldTitle">Компания</div>
            <select v-model="contact.companyId" id="companyVolumeContent">
              <option disabled value="0">Выберите компанию</option>
              <option
                v-for="company in companies"
                v-bind:key="company.companyId"
                v-bind:value="company.companyId"
              >
                {{ company.fullName }}
              </option>
            </select>
            <div class="error" v-if="contact.companyId===undefined || contact.companyId===0">
              {{this.error}}
            </div>
          </div>
          <div id="position-layout" class="companyField">
            <div id="position" class="fieldTitle">Должность</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="contact.position"
                class="fieldContent"
                placeholder="Должность"
              />
            </div>
          </div>
          <div id="makeDecision-layout" class="contactField">
            <div id="makeDecision" class="fieldTitle">
              Лицо принимающее решения
            </div>
            <input
              v-model="contact.makeDecision"
              type="checkbox"
              class="fieldContent"
              id="makeDecision-checkbox"
            />
          </div>
          <div id="mainEmail-layout" class="companyField">
            <div id="mainEmail" class="fieldTitle">Основной E-mail</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="contact.mainEmail"
                class="fieldContent"
                placeholder="Основной E-mail"
              />
            </div>
          </div>
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
          <div id="mainPhone-layout" class="companyField">
            <div id="mainPhone" class="fieldTitle">Основной телефон</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="contact.mainPhone"
                class="fieldContent"
                placeholder="Основной телефон"
              />
            </div>
          </div>
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
        <div id="buttons-layout">
          <button id="addContactButton-layout" v-on:click="onAddButtonClick">
            <div id="addContactButton-text">+ Добавить контактное лицо</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Contact from '@/models/Contact';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddContact extends Vue {
  contact = {} as Contact;

  emails: string[] = [];

  phones: string[] = [];

  error = '';

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  mounted() {
    this.$store.dispatch('GET_COMPANIES');
    this.contact.companyId = 0;
  }

  /** Функция обработки нажатия кнопки добавления новой почты */
  addEmailButtonClick() {
    this.emails.push('');
  }

  /** Функция обработки нажатия кнопки добавления нового телефона */
  addPhoneButtonClick() {
    this.phones.push('');
  }

  /** Функция обработки нажатия кнопки добавления нового контактного лица */
  onAddButtonClick() {
    if (this.checkForm()) {
      const emailList = document.querySelectorAll<HTMLInputElement>('.emailField');
      const phoneList = document.querySelectorAll<HTMLInputElement>('.phoneField');

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

      this.$store
        .dispatch('POST_NEW_CONTACT', [this.contact])
        .then(() => {
          this.$router.push('/kb');
        });
    }
  }

  checkForm() {
    if (this.contact.contactName === undefined || this.contact.contactName.length === 0
    || this.contact.companyId === undefined || this.contact.companyId === 0) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
::-webkit-input-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* webkit */
::-moz-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* Firefox 19+ */
:-moz-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* Firefox 18- */
:-ms-input-placeholder {
  color: #bebebe;
  opacity: 0.95;
} /* IE */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

#body {
  text-align: center;
  opacity: 0.95;

  #main-layout {
    display: inline-block;
    margin-top: 25px;
    padding-bottom: 25px;
    box-shadow: 1.4px 1.4px 5px #707070;
    border: 1px solid #ffffff;
  }

  .error {
    color:red;
    font-size: 12pt;
  }

  #addContact-header {
    text-align: left;
    margin: 25px 20px 30px 20px;
    font-size: 28pt;
    color: #7f7f7f;

    #return-button {
      display: inline-block;
      color: #7f7f7f;

      i:hover {
        color: black;
      }
    }

    #contactName-field {
      display: inline-block;
      margin: 0px 20px;

      #contactName-input {
        display: inline-block;
        width: 600px;
        font-size: 28pt;
        border: white;
        border-bottom: 1px solid #bebebe;
        opacity: 0.9;
        outline-style: none;
      }
    }
  }

  #fields-layout {
    display: grid;
    grid-auto-columns: minmax(600px, auto);
    text-align: left;
    grid-row-gap: 10px;
    margin: 0px 20px;

    #makeDecision-checkbox {
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

    .list {
      padding-left: 0;
      margin-left: 0;
      margin-top: 0;
      list-style: none;
    }

    .listElement {
      border: 1px solid #ffffff;
      margin-bottom: 5px;

      .listField {
        border: 1px solid #ffffff;
        border-radius: 6px;
        outline-style: none;
      }
    }

    #addEmail-button:hover {
      #addEmail-plus {
        color: #ffb300;
      }
    }

    #addPhone-button:hover {
      #addPhone-plus {
        color: #ffb300;
      }
    }

    .addButton-layout {
      display: inline-block;
      text-align: left;
      width: 200px;
      border: none;
      outline: none;
      background: white;

      .plus {
        display: inline-block;
        font-size: 32pt;
        margin-right: 10px;
        margin-left: -5px;
        color: #5ac37d;
      }

      .addButton-text {
        display: inline-block;
        vertical-align: top;
        margin-top: 16px;
        font-size: 12pt;
        color: #7f7f7f;
      }
    }
  }

  #buttons-layout {
    margin-top: 30px;
    margin-right: 30px;
    text-align: right;

    #addContactButton-layout {
      display: inline-block;
      border: 1px solid white;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;

      #addContactButton-text {
        font-size: 14pt;
        color: white;
      }
    }

    #addContactButton-layout:active,
    #addContactButton-layout:focus {
      outline: none;
    }

    #addContactButton-layout:hover {
      border: 1px solid #508c64;
      background: white;

      #addContactButton-text {
        color: #508c64;
      }
    }
  }
}
</style>
