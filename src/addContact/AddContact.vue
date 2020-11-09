<template>
    <div>
        <div id = "main-layout">
            <div id = "addContact-layout">
                <div id = "addContact-header">
                    <router-link to="/kb" class="nav-element" active-class="active">
                        <div id = "return-button">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </div>
                    </router-link>
                    <div id = "contactName-field">
                        <input v-model.lazy.trim = "contact.contactName" id = "contactName-input"
                        placeholder = "ФИО" />
                    </div>
                </div>
                <div id = "fields-layout">
                    <div id = "companyId-layout" class = "contactField">
                        <div id = "companyId" class = "fieldTitle">Компания</div>
                        <select v-model = "contact.companyId" id = "companyVolumeContent">
                            <option disabled value = 0>Выберите компанию</option>
                            <option v-for = "company in companies" v-bind:key = "company"
                            v-bind:value = "company.companyId">
                                {{ company.fullName }}
                            </option>
                        </select>
                    </div>
                    <div id = "position-layout" class = "companyField">
                        <div id = "position" class = "fieldTitle">Должность</div>
                        <div class = "fieldBorder">
                            <input v-model.lazy.trim = "contact.position"
                            class = "fieldContent" placeholder = "Должность" />
                        </div>
                    </div>
                    <div id = "makeDecision-layout" class = "contactField">
                        <div id = "makeDecision" class = "fieldTitle">
                            Лицо принимающее решения
                        </div>
                        <input v-model = "contact.makeDecision" type = "checkbox"
                        class = "fieldContent" id = "makeDecision-checkbox"/>
                    </div>
                    <div id = "mainEmail-layout" class = "companyField">
                        <div id = "mainEmail" class = "fieldTitle">Основной E-mail</div>
                        <div class = "fieldBorder">
                            <input v-model.lazy.trim = "contact.mainEmail"
                            class = "fieldContent" placeholder = "Основной E-mail" />
                        </div>
                    </div>
                    <button id = "addEmail-button" class = "addButton-layout"
                    v-on:click = "addEmailButtonClick()">
                        <div id = "addEmail-plus" class = "plus">+</div>
                        <div id = "addEmail-text" class = "addButton-text">Добавить E-mail</div>
                    </button>
                    <ul class = "list">
                        <li class = "listElement" v-for = "email in emails" v-bind:key = "email">
                            <div class = "fieldBorder">
                                <input class = "listField fieldContent emailField"
                                placeholder = "Дополнительный E-mail"/>
                            </div>
                        </li>
                    </ul>
                    <div id = "mainPhone-layout" class = "companyField">
                        <div id = "mainPhone" class = "fieldTitle">Основной телефон</div>
                        <div class = "fieldBorder">
                            <input v-model.lazy.trim = "contact.mainPhone"
                            class = "fieldContent" placeholder = "Основной телефон" />
                        </div>
                    </div>
                    <button id = "addPhone-button" class = "addButton-layout"
                    v-on:click = "addPhoneButtonClick()">
                        <div id = "addPhone-plus" class = "plus">+</div>
                        <div id = "addPhone-text" class = "addButton-text">Добавить телефон</div>
                    </button>
                    <ul class = "list">
                        <li class = "listElement" v-for = "phone in phones" v-bind:key = "phone">
                            <div class = "fieldBorder">
                                <input class = "listField fieldContent phoneField"
                                placeholder = "Дополнительный телефон"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id = "buttons-layout">
                    <button id = "addContactButton-layout" v-on:click = "onAddButtonClick">
                        <div id = "addContactButton-text">+ Добавить контактное лицо</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import store from '@/store';

@Component
export default class Contact extends Vue {
  addEmailButtonClick() {
    this.temp = '';

    this.emails.push('');
  }

  addPhoneButtonClick() {
    this.temp = '';

    this.phones.push('');
  }

  onAddButtonClick() {
    const emailList = document.querySelectorAll('.emailField');
    const phoneList = document.querySelectorAll('.phoneField');
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

    store.dispatch('POST_NEW_CONTACT', [this.contact]);
  }

    companies = store.getters.COMPANIES;

    mounted() {
      this.$store.dispatch('GET_COMPANIES');
    }

    temp = ''

    emails = []

    phones = []

    contact = {
      contactPersonId: null,
      contactName: '',
      companyId: 0,
      position: '',
      makeDecision: false,
      mainEmail: '',
      otherEmails: [],
      creatorId: null,
      lastUpdaterId: null,
      mainPhone: null,
      otherPhones: [],
    }
}

</script>

<style scoped lang="scss">

::-webkit-input-placeholder {color:#BEBEBE; opacity:0.95;}/* webkit */
::-moz-placeholder          {color:#BEBEBE; opacity:0.95;}/* Firefox 19+ */
:-moz-placeholder           {color:#BEBEBE; opacity:0.95;}/* Firefox 18- */
:-ms-input-placeholder      {color:#BEBEBE; opacity:0.95;}/* IE */

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
        border: 1px solid #ffffff
    }

    #addContact-header {
        text-align: left;
        margin-top: 25px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 30px;
        font-size: 28pt;
        color: #7F7F7F;

        #return-button {
            display: inline-block;
            color: #7F7F7F;

            i:hover {
                color: black;
            }
        }

        #contactName-field {
            display: inline-block;
            margin-left: 20px;
            margin-right: 20px;

            #contactName-input {
                display: inline-block;
                width: 600px;
                font-size: 28pt;
                border: white;
                border-bottom: 1px solid #BEBEBE;
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
        margin-left: 20px;
        margin-right: 20px;

        #makeDecision-checkbox {
            margin-top: 5px;
            transform: scale(1.5);
        }

        .fieldTitle {
            color: #7F7F7F;
            font-size: 10pt;
        }

        .fieldBorder {
            display: inline-block;
            margin-top: 5px;
            border-radius: 6px;
            border: 1px solid #BEBEBE;

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
            #addEmail-plus{
                color: #FFB300;
            }
        }

        #addPhone-button:hover {
            #addPhone-plus{
                color: #FFB300;
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
                color: #5AC37D;
            }

            .addButton-text {
                display: inline-block;
                vertical-align: top;
                margin-top: 16px;
                font-size: 12pt;
                color:  #7F7F7F;
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
            background: #5AC37D;

            #addContactButton-text {
                font-size: 14pt;
                color: white;
            }
        }

        #addContactButton-layout:active, #addContactButton-layout:focus {
            outline: none;
        }

        #addContactButton-layout:hover {
            border: 1px solid #508C64;
            background: white;

            #addContactButton-text {
              color: #508C64;
            }
        }
    }
}

</style>
