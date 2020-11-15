<template>
  <div>
    <div id="main-layout">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditMode extends Vue {
  get company() {
    return this.$store.getters.CURRENT_COMPANY;
  }

  beforeCreate() {
    this.$store.dispatch('GET_COMPANY_BY_ID', this.$route.params.id);
  }

  options = [
    {
      text: 'Неизвестно',
      value: 0,
    },
    {
      text: '< 1 МВт',
      value: 0,
    },
    {
      text: '1 МВт - 2 МВт',
      value: 0,
    },
    {
      text: '2 МВт - 3 МВт',
      value: 0,
    },
  ];
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
}

</style>
