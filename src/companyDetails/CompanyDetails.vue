<template>
    <div>
        <div id = "main-layout">
            <div v-for = "company in companies" v-bind:key= "company">
                <div id = "details-layout" v-if = "company.companyId == $route.params.id">
                    <div id = "details-header">
                        <router-link to="/kb" class="nav-element" active-class="active">
                            <div id = "return-button">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            </div>
                        </router-link>
                        <div id = "companyName-layout">
                            <div id = "companyName" class = "fieldContent">{{ company.name }}</div>
                        </div>
                    </div>
                    <div id = "fields-layout">
                        <div id = "fields">
                            <div id = "companyName-layout" class = "companyField"
                            v-if = "company.fullName != ''">
                                <div id = "companyFullName" class = "fieldTitle">
                                    Название компании
                                </div>
                                <div class = "fieldContent">{{ company.fullName }}</div>
                            </div>
                            <div id = "companyActivity-layout" class = "companyField"
                            v-if = "company.kindOfActivity != ''">
                                <div id = "companyActivity" class = "fieldTitle">
                                    Род деятельности
                                </div>
                                <div class = "fieldContent">{{ company.kindOfActivity }}</div>
                            </div>
                            <div id = "companyVolume-layout" class = "companyField"
                            v-if = "company.consumptionVolume != null">
                                <div id = "companyVolume" class = "fieldTitle">
                                    Объём потребления
                                </div>
                                <div class = "fieldContent">{{ company.consumptionVolume }}</div>
                            </div>
                            <div id = "generatingCapacity-layout" class = "companyField">
                                <div id = "generatingCapacity" class = "fieldTitle">
                                    Генерирующие мощности
                                </div>
                                <div class = "fieldContent">{{ company.generatingCapacity }}</div>
                            </div>
                            <div id = "inn-layout" class = "companyField"
                            v-if = "company.inn != null">
                                <div id = "inn" class = "fieldTitle">ИНН</div>
                                <div class = "fieldContent">{{ company.inn }}</div>
                            </div>
                            <div id = "kpp-layout" class = "companyField"
                            v-if = "company.kpp != null">
                                <div id = "kpp" class = "fieldTitle">КПП</div>
                                <div class = "fieldContent">{{ company.kpp }}</div>
                            </div>
                            <div id = "okpo-layout" class = "companyField"
                            v-if = "company.okpo != null">
                                <div id = "okpo" class = "fieldTitle">ОКПО</div>
                                <div class = "fieldContent">{{ company.okpo }}</div>
                            </div>
                            <div id = "email-layout" class = "companyField"
                            v-if = "company.email != ''">
                                <div id = "email" class = "fieldTitle">E-mail</div>
                                <div class = "fieldContent">{{ company.email }}</div>
                            </div>
                            <div id = "phone-layout" class = "companyField"
                            v-if = "company.phone != null">
                                <div id = "phone" class = "fieldTitle">Телефон</div>
                                <div class = "fieldContent">{{ company.phone }}</div>
                            </div>
                            <div id = "project-layout" class = "companyField"
                            v-if = "company.projects != null">
                                <div id = "project" class = "fieldTitle">Участие в проектах</div>
                                <li class = "project" v-for= "project in company.projects"
                                 v-bind:key= "project">
                                    <div class = "project-layout">
                                        <div class = "project-text">{{ project }}</div>
                                    </div>
                                </li>
                            </div>
                        </div>
                        <div id = "contacts">
                            <div id = "contacts-title">
                                Контактные лица
                            </div>
                            <div id = "contacts-table">
                                <div id = "contactsTable-columns">
                                    <div id = "columnName" class = "columnTitle row-field">
                                        ФИО
                                    </div>
                                    <div id = "columnPosition" class = "columnTitle row-field">
                                        Должность
                                    </div>
                                    <div id = "columnMainEmail" class = "columnTitle row-field">
                                        E-mail
                                    </div>
                                    <div id = "columnMainPhone"
                                    class = "columnTitle row-field phoneField">
                                        Телефон
                                    </div>
                                </div>
                                <div id = "contactsTable-rows">
                                    <div v-for = "contact in contacts" v-bind:key= "contact">
                                        <div class = "row-field">
                                            {{ contact.contactName }}
                                        </div>
                                        <div class = "row-field">
                                            {{ contact.position }}
                                        </div>
                                        <div class = "row-field">
                                            {{ contact.mainEmail }}
                                        </div>
                                        <div class = "row-field phoneField">
                                            {{ contact.mainPhone }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id = "notes-layout">
                                <div id = "notes-title">
                                    Заметки
                                </div>
                                <div id = "notes">
                                </div>
                                <div id = "input-border">
                                    <input v-model.lazy.trim = "company.phone" type = "number"
                                    id = "notes-input" placeholder = "Напишите текст заметки..." />
                                </div>
                                <div id = "buttons-layout">
                                    <button id = "addNoteButton-layout"
                                    v-on:click = "onAddButtonClick">
                                        <div id = "addNoteButton-text">+ Добавить компанию</div>
                                    </button>
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
import axios from 'axios';
import store from '@/store';
import router from '@/router';

@Component
export default class Company extends Vue {
    companies = [];

    contacts = null;

    route = 'http://localhost:8090/api/contacts/company/';

    setContacts(response) {
      this.contacts = response;
    }

    created() {
      axios
        .get(this.route.concat(this.$route.params.id))
        .then((response) => (this.setContacts(response.data)));
    }

    beforeMount() {
      this.$store.dispatch('GET_COMPANIES');
      this.companies = store.getters.COMPANIES;
      this.$forceUpdate();
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
        min-width: 1000px;
        max-width: auto;
        // grid-template-columns: minmax(500px, 1fr) minmax(600px, 1fr);
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 25px;
        padding-bottom: 25px;
        text-align: left;
        box-shadow: 1.4px 1.4px 5px #707070;
        border: 1px solid #ffffff;

        #details-layout {
            margin-left: 15px;
            margin-right: 15px;

            #details-header {
                text-align: left;
                margin-top: 25px;
                margin-left: 10px;
                margin-right: 20px;
                margin-bottom: 15px;
                font-size: 28pt;
                color: #7F7F7F;

                #return-button {
                    display: inline-block;
                    color: #7F7F7F;

                    i:hover {
                        color: black;
                    }
                }

                #companyName-layout {
                    display: inline-block;
                    margin-left: 25px;

                    #companyName {
                    font-size: 28pt;
                    }
                }
            }

            #fields {
                display: inline-block;
                vertical-align: top;
                width: 35%;

                .companyField {
                    margin-top: 8px;
                    margin-left: 10px;
                    margin-right: 10px;
                    margin-bottom: 5px;
                }

                .fieldTitle {
                    font-size: 10pt;
                    color: #7F7F7F;
                }

                .fieldContent {
                    font-size: 14pt;
                    opacity: 0.95;
                }

                .project-layout {
                    display: inline-block;
                    text-align: center;
                    padding-top: 2.5px;
                    padding-bottom: 2.5px;
                    padding-left: 6px;
                    padding-right: 6px;
                    border-radius: 8px;
                    margin-top: 5px;
                    margin-bottom: 1px;
                    background: #FFB300;
                }

                .project-text {
                    font-size: 11pt;
                    color: white;
                }
            }

            #contacts {
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 63%;

                #contacts-title {
                    font-size: 16pt;
                }

                #contacts-table {
                    display: block;
                    width: 100%;
                    margin-top: 20px;

                    .columnTitle {
                        color:  #7F7F7F;
                    }

                    .row-field {
                        display: inline-block;
                        vertical-align: top;
                        width: 28%;
                        margin-top: 2px;
                        margin-bottom: 13px;
                        margin-left: 5px;
                        font-size: 10pt;
                    }

                    .phoneField {
                        width: 10%;
                    }
                }

                #notes-layout {
                    margin-top: 25px;

                    #notes-title {
                        font-size: 16pt;
                    }

                    #notes {
                        display: block;
                        min-height: 60px;
                        width: 100%;
                        margin-top: 10px;
                        box-shadow: 1.4px 1.4px 5px #707070;
                        border: 1px solid #ffffff;
                    }

                    #input-border {
                        display: inline-block;
                        width: 100%;
                        margin-top: 10px;
                        border-radius: 6px;
                        border: 1px solid #BEBEBE;

                        #notes-input {
                            margin: 5px;
                            width: 97%;
                            font-size: 14pt;
                            border-radius: 6px;
                            border: white;
                            outline-style: none;
                        }
                    }
                }
            }
        }
    }
}

</style>
