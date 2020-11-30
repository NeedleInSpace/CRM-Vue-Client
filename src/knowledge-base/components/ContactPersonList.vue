<template>
  <div>
    <ul id="contactPersons-list">
      <li class="contact" v-for="contact in contactPersons" v-bind:key="contact.contactPersonId">
        <div id="contactName-layout" class="contactField" v-if="contact.contactName != null">
          <div id="contactName" class="fieldContent">
            {{ contact.contactName }}
          </div>
        </div>
        <div v-for="company in companies" v-bind:key="company.companyId">
          <div
            id="contactCompany-layout"
            class="contactField"
            v-if="contact.companyId == company.companyId"
          >
            <div id="contactCompany" class="fieldTitle">Компания</div>
            <div class="fieldContent">{{ company.fullName }}</div>
          </div>
        </div>
        <div id="contactPosition-layout" class="contactField" v-if="contact.position != ''">
          <div id="contactPosition" class="fieldTitle">Должность</div>
          <div class="fieldContent">{{ contact.position }}</div>
        </div>
        <div v-if="contact.makeDecision" id="contactDecision-layout" class="contactField">
          <div id="makeDecisionField-text" class="fieldContent">
            Лицо принимающее решения
          </div>
        </div>
        <div id="contactEmail-layout" class="contactField" v-if="contact.mainEmail != ''">
          <div id="contactEmail" class="fieldTitle">E-mail</div>
          <div class="fieldContent">{{ contact.mainEmail }}</div>
        </div>
        <div id="contactPhone-layout" class="contactField" v-if="contact.mainPhone != null">
          <div id="contactPhone" class="fieldTitle">Телефон</div>
          <div class="fieldContent">{{ contact.mainPhone }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ContactPersonList extends Vue {
  get contactPersons() {
    return this.$store.getters.CONTACTS;
  }

  get companies() {
    return this.$store.getters.COMPANIES;
  }

  mounted() {
    this.$store.dispatch('GET_CONTACTS');
  }
}
</script>

<style scoped lang="scss">
#contactPersons-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding-left: 0;
  margin-left: 0;
  text-align: left;

  .contact {
    display: inline-block;
    list-style: none;
    vertical-align: top;
    margin: 10px 5px 0px 5px;
    padding: 10px 5px;
    box-shadow: 1.3px 1.3px 5px #707070;
    border: 1px solid #ffffff;
  }

  .contact:hover {
    border-color: #508c64;
  }

  #contactName {
    font-size: 24pt;
    padding-bottom: 5px;
  }

  .contactField {
    margin: 5px 10px;
  }

  .fieldTitle {
    font-size: 10pt;
    color: #7f7f7f;
  }

  .fieldContent {
    font-size: 14pt;
    opacity: 0.95;
  }

  #contactDecision-layout {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    opacity: 0.95;
    background: #5ac37d;

    #makeDecisionField-text {
      font-size: 14pt;
      color: white;
    }
  }
}
</style>
