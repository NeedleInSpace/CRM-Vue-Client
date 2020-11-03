<template>
    <div>
        <ul id ="contactPersons-list">
            <li class = "contact" v-for= "contact in contactPersons" v-bind:key= "contact.FIO">
                <div id = "contactFIO-layout" class = "contactField">
                    <div id = "contactFIO" class = "fieldContent">{{ contact.FIO }}</div>
                </div>
                <div id = "contactCompany-layout" class = "contactField">
                    <div id = "contactCompany" class = "fieldTitle">Компания</div>
                    <div class = "fieldContent">{{ contact.company }}</div>
                </div>
                <div id = "contactPosition-layout" class = "contactField">
                    <div id = "contactPosition" class = "fieldTitle">Должность</div>
                    <div class = "fieldContent">{{ contact.position }}</div>
                </div>
                <div v-if = "contact.makeDecision" id = "contactDecision-layout"
                    class = "contactField">
                    <div id = "makeDecisionField-text" class = "fieldContent">
                        Лицо принимающее решения
                    </div>
                </div>
                <div id = "contactEmail-layout" class = "contactField">
                    <div id = "contactEmail" class = "fieldTitle">E-mail</div>
                    <div class = "fieldContent">{{ contact.email }}</div>
                </div>
                <div id = "contactPhone-layout" class = "contactField">
                    <div id = "contactPhone" class = "fieldTitle">Телефон</div>
                    <div class = "fieldContent">{{ contact.phone }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ContactPersonList extends Vue {
    contactPersons = [
      {
        FIO: 'Petrov Petr Petrovich',
        company: 'Stroim',
        position: 'Electric',
        makeDecision: true,
        email: 'ppp@first.com',
        phone: '+7 (999) 001-22-77',
      },
      {
        FIO: 'Sergeev Sergey Sergeevich',
        company: 'Stroim',
        position: 'Kto-to',
        makeDecision: false,
        email: 'sss@first.com',
        phone: '+7 (999) 001-22-27',
      },
      {
        FIO: 'Mihailov Mihail Mihailovich',
        company: 'Stroim',
        position: 'Kto-to',
        makeDecision: false,
        email: 'mmm@second.com',
        phone: '+7 (999) 342-88-99',
      },
    ];
}

</script>

<style scoped lang="scss">

#contactPersons-list {
  display: block;
  padding-left: 0;
  margin-left: 0;
  text-align: left;

  .contact {
        display: inline-block;
        list-style: none;
        vertical-align: top;
        width: 45%;
        margin-top: 10px;
        margin-right: 5px;
        margin-left: 5px;
        padding-top:10px;
        padding-left: 5px;
        padding-bottom: 10px;
        box-shadow: 1.3px 1.3px 5px #707070;
        border: 1px solid #ffffff
        // background: yellow;
    }

    .contact:hover {
        border-color: #508C64;
    }

    #contactFIO {
        font-size: 24pt;
        padding-bottom: 5px;
    }

    .contactField {
        margin-top: 4px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 5px;
        // background: royalblue;
    }

    .fieldTitle {
        font-size: 10pt;
        color: #7F7F7F;
    }

    .fieldContent {
        font-size: 14pt;
        opacity: 0.95;
    }

    #contactDecision-layout {
          display: inline-block;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 2px;
          padding-bottom: 2px;
          border-radius: 12px;
          opacity: 0.95;
          background: #5AC37D;

          #makeDecisionField-text {
            font-size: 14pt;
            color: white;
          }
        }
}

</style>
