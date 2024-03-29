<template>
  <div>
    <ul id="companies-list">
      <li class="company" v-for="company in companies" v-bind:key="company.companyId">
        <div v-on:click="toCompanyDetails(company.companyId)">
          <div id="companyName-layout" class="companyField">
            <div id="companyName" class="fieldContent">{{ company.name }}</div>
          </div>
          <div id="companyName-layout" class="companyField" v-if="company.fullName != ''">
            <div id="companyFullName" class="fieldTitle">Название компании</div>
            <div class="fieldContent">{{ company.fullName }}</div>
          </div>
          <div id="companyActivity-layout" class="companyField" v-if="company.kindOfActivity != ''">
            <div id="companyActivity" class="fieldTitle">Род деятельности</div>
            <div class="fieldContent">{{ company.kindOfActivity }}</div>
          </div>
          <div
            id="companyVolume-layout"
            class="companyField"
            v-if="company.consumptionVolume != null"
          >
            <div id="companyVolume" class="fieldTitle">Объём потребления</div>
            <div class="fieldContent">{{ company.consumptionVolume }}</div>
          </div>
          <div id="generatingCapacity-layout" class="companyField">
            <div id="generatingCapacity" class="fieldTitle">Генерирующие мощности</div>
            <div class="fieldContent" v-if="company.generatingCapacity">Имеются</div>
            <div class="fieldContent" v-if="!company.generatingCapacity">Отсутствуют</div>
          </div>
          <div id="innkppokpo-layout">
            <div id="inn-layout" class="companyField" v-if="company.inn != null">
              <div id="inn" class="fieldTitle">ИНН</div>
              <div class="fieldContent">{{ company.inn }}</div>
            </div>
            <div id="kpp-layout" class="companyField" v-if="company.kpp != null">
              <div id="kpp" class="fieldTitle">КПП</div>
              <div class="fieldContent">{{ company.kpp }}</div>
            </div>
            <div id="okpo-layout" class="companyField" v-if="company.okpo != null">
              <div id="okpo" class="fieldTitle">ОКПО</div>
              <div class="fieldContent">{{ company.okpo }}</div>
            </div>
          </div>
          <div id="email-layout" class="companyField" v-if="company.email != ''">
            <div id="email" class="fieldTitle">E-mail</div>
            <div class="fieldContent">{{ company.email }}</div>
          </div>
          <div id="phone-layout" class="companyField" v-if="company.phone != null">
            <div id="phone" class="fieldTitle">Телефон</div>
            <div class="fieldContent">{{ company.phone }}</div>
          </div>
          <div id="project-layout" class="companyField" v-if="company.projects != null">
            <div id="project" class="fieldTitle">Участие в проектах</div>
            <li class="project" v-for="project in company.projects" v-bind:key="project">
              <div class="project-layout">
                <div class="project-text">{{ project }}</div>
              </div>
            </li>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CompanyList extends Vue {
  get companies() {
    return this.$store.getters.COMPANIES;
  }

  mounted() {
    this.$store.dispatch('GET_COMPANIES');
  }

  /**
   * Функция редиректа на страницу с подробной информацией о компании.
   * @param {string} companyId - id компании
   */
  toCompanyDetails(companyId: string) {
    this.tempUrl = '/kb/companyDetails/';

    this.$router.push(this.tempUrl.concat(companyId));
  }

  tempUrl = '';
}
</script>

<style scoped lang="scss">
#companies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding-left: 0;
  margin-left: 0;
  text-align: left;

  .company {
    display: inline-block;
    list-style: none;
    vertical-align: top;
    margin: 10px 5px 0px 5px;
    padding: 10px 5px 10px 5px;
    box-shadow: 1.3px 1.3px 5px #707070;
    border: 1px solid #ffffff;
    cursor: pointer;
  }

  .company:hover {
    border: 1px solid #508c64;
  }

  #companyName {
    font-size: 24pt;
    padding-bottom: 5px;
  }

  .companyField {
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

  #inn-layout,
  #kpp-layout,
  #okpo-layout {
    display: inline-block;
  }

  .project-layout {
    display: inline-block;
    text-align: center;
    padding: 2.5px 6px;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 1px;
    background: #ffb300;
  }

  .project-text {
    font-size: 11pt;
    color: white;
  }
}
</style>
