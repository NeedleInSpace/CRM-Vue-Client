<template>
  <div>
    <div id="main-layout">
      <div id="addCompany-layout">
        <div id="addCompany-header">
          <router-link to="/kb" class="nav-element" active-class="active">
            <div id="return-button">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </div>
          </router-link>
          <div id="companyName-field">
            <input
              v-model.lazy.trim="company.name"
              id="companyName-input"
              placeholder="Наименование компании"
            />
          </div>
        </div>
        <div id="fields-layout">
          <div id="companyFullName-layout" class="companyField">
            <div id="companyFullName" class="fieldTitle">Полное название</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="company.fullName"
                class="fieldContent"
                placeholder="Полное название"
              />
            </div>
          </div>
          <div id="companyActivity-layout" class="companyField">
            <div id="companyActivity" class="fieldTitle">Род деятельности</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="company.kindOfActivity"
                class="fieldContent"
                placeholder="Род деятельности"
              />
            </div>
          </div>
          <div id="companyVolume-layout" class="companyField">
            <div id="companyVolume" class="fieldTitle">Объём потребления</div>
            <select v-model="company.consumptionVolume" id="companyVolumeContent">
              <option
                v-for="option in options"
                v-bind:key="option.text"
                v-bind:value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div id="generatingCapacity-layout" class="companyField">
            <div id="generatingCapacity" class="fieldTitle">
              Генерирующие мощности
            </div>
            <input
              v-model="company.generatingCapacity"
              type="checkbox"
              class="fieldContent"
              id="generatingCapacity-checkbox"
            />
          </div>
          <div id="inn-layout" class="companyField">
            <div id="inn" class="fieldTitle">ИНН</div>
            <div id="innFieldBorder" class="fieldBorder">
              <input
                v-model.lazy.trim="company.inn"
                type="number"
                id="innFieldContent"
                class="fieldContent"
                placeholder="ИНН"
              />
            </div>
          </div>
          <div id="kpp-layout" class="companyField">
            <div id="kpp" class="fieldTitle">КПП</div>
            <div id="kppFieldBorder" class="fieldBorder">
              <input
                v-model.lazy.trim="company.kpp"
                type="number"
                id="kppFieldContent"
                class="fieldContent"
                placeholder="КПП"
              />
            </div>
          </div>
          <div id="okpo-layout" class="companyField">
            <div id="okpo" class="fieldTitle">ОКПО</div>
            <div id="okpoFieldBorder" class="fieldBorder">
              <input
                v-model.lazy.trim="company.okpo"
                type="number"
                id="okpoFieldContent"
                class="fieldContent"
                placeholder="ОКПО"
              />
            </div>
          </div>
          <div id="email-layout" class="companyField">
            <div id="companyActivity" class="fieldTitle">E-mail</div>
            <div class="fieldBorder">
              <input v-model.lazy.trim="company.email" class="fieldContent" placeholder="E-mail" />
            </div>
          </div>
          <div id="phone-layout" class="companyField">
            <div id="companyActivity" class="fieldTitle">Телефон</div>
            <div class="fieldBorder">
              <input
                v-model.lazy.trim="company.phone"
                type="number"
                class="fieldContent"
                placeholder="Телефон"
              />
            </div>
          </div>
        </div>
        <div id="buttons-layout">
          <button id="addCompanyButton-layout" v-on:click="onAddButtonClick">
            <div id="addCompanyButton-text">+ Добавить компанию</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Company extends Vue {
  onAddButtonClick() {
    this.temp = '';

    this.$store.dispatch('POST_NEW_COMPANY', [this.company])
      .then((response) => {
        console.log(response);
        this.$router.push('/kb');
      })
      .catch((error) => {
        console.error(error);
        this.$router.push('/kb');
      });
  }

  temp = '';

  options = [
    {
      text: 'Неизвестно',
      value: null,
    },
    {
      text: '< 1 МВт',
      value: null,
    },
    {
      text: '1 МВт - 2 МВт',
      value: null,
    },
    {
      text: '2 МВт - 3 МВт',
      value: null,
    },
  ];

  company = {
    companyId: null,
    name: '',
    fullName: '',
    kindOfActivity: '',
    consumptionVolume: null,
    generatingCapacity: false,
    inn: null,
    kpp: null,
    okpo: null,
    email: null,
    phone: null,
    projects: null,
  };
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

  #addCompany-header {
    text-align: left;
    margin-top: 25px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 25px;
    font-size: 28pt;
    color: #7f7f7f;

    #return-button {
      display: inline-block;
      color: #7f7f7f;

      i:hover {
        color: black;
      }
    }

    #companyName-field {
      display: inline-block;
      margin-left: 20px;
      margin-right: 20px;

      #companyName-input {
        display: inline-block;
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
    grid-auto-columns: minmax(400px, auto);
    text-align: left;
    grid-row-gap: 10px;
    margin-left: 20px;
    margin-right: 20px;

    #generatingCapacity-checkbox {
      margin-top: 5px;
      transform: scale(1.5);
    }

    #companyVolumeContent {
      margin-top: 5px;
    }

    #innFieldBorder,
    #kppFieldBorder,
    #okpoFieldBorder {
      width: 108px;
    }

    #innFieldContent,
    #kppFieldContent,
    #okpoFieldContent {
      width: 95px;
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

  #buttons-layout {
    margin-top: 30px;
    margin-right: 30px;
    text-align: right;

    #addCompanyButton-layout {
      display: inline-block;
      border: 1px solid white;
      padding: 10px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;
      background: #5ac37d;

      #addCompanyButton-text {
        font-size: 14pt;
        color: white;
      }
    }

    #addCompanyButton-layout:active,
    #addCompanyButton-layout:focus {
      outline: none;
    }

    #addCompanyButton-layout:hover {
      border: 1px solid #508c64;
      background: white;

      #addCompanyButton-text {
        color: #508c64;
      }
    }
  }
}
</style>
