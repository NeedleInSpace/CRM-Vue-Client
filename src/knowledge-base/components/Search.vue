<template>
    <div class="search-panel">
        <div class="search-input">
            <input placeholder="Поиск по базе знаний" type="text" v-model="search" @input="ddd"/>
            <i class="fas fa-search"/>
            <i class="fas fa-times" @click="clear()"></i>
        </div>
        <div class="search-results" v-show="isOpen">
            <ul>
                <li v-for="(company, i) in companies"
                :key="i" @click="setResult(company.name)"
                ><i class="fas fa-city"></i>
                    <div class="res-text">
                        {{company.name !== null && company.name.length !== 0?
                        company.name +', ': ''}}
                        {{company.fullName !== null ? company.fullName:''}}
                        {{company.consumptionVolume !== null ? ', > '
                        + company.consumptionVolume + ' МВт': ''}}
                    </div>
                    <div class="company-stage">
                        этап
                    </div>
                </li>
                <li v-for="(contact) in compContacts"
                :key="contact.contactPersonId" @click="setResult(contact.contactName)"
                ><i class="fas fa-user"></i>
                    <div class="res-text">
                      {{contact.contactName !== null ? contact.contactName: ''}}
                      {{contact.position !== null ?', ' + contact.position: '' }}
                      {{contact.companyId !== null && contact.company.name.length !== 0?', '
                      + contact.company.name: ', ' + contact.company.fullName}}
                      {{contact.mainEmail !== null ?', ' +  contact.mainEmail: '' }}
                      {{contact.mainPhone !== null ?', ' + contact.mainPhone: '' }}
                    </div>
                    <div class="main-contact" v-if="contact.makeDecision == true">
                        ЛПР
                    </div>
                </li>
                <li v-for="(contact) in contacts"
                :key="contact.contactPersonId" @click="setResult(contact.contactName)"
                ><i class="fas fa-user"></i>
                    <div class="res-text">
                      {{contact.contactName !== null ? contact.contactName: ''}}
                      {{contact.position !== null ?', ' + contact.position: '' }}
                      {{contact.companyId !== null && contact.company.name.length !== 0?', '
                      + contact.company.name: ', ' + contact.company.fullName}}
                      {{contact.mainEmail !== null ?', ' +  contact.mainEmail: '' }}
                      {{contact.mainPhone !== null ?', ' + contact.mainPhone: '' }}
                    </div>
                    <div class="main-contact" v-if="contact.makeDecision == true">
                        ЛПР
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import _, { concat } from 'lodash/';
import axios from 'axios';
import { th } from 'date-fns/locale';
import Company from '@/models/Company';
import Contact from '@/models/Contact';

@Component
export default class Search extends Vue {
    companies: Company[] = [];

    num = 0;

    contacts: Contact[] =[];

    compContacts: Contact[] = [];

    search = '';

    ddd!: _.DebouncedFunc<() => void>;

    isOpen = false;

    mounted() {
      this.$store.dispatch('GET_COMPANIES');
      this.$store.dispatch('GET_CONTACTS');
    }

    get comp() {
      return this.$store.getters.COMPANIES;
    }

    get cont() {
      return this.$store.getters.CONTACTS;
    }

    findCompanies() {
      axios.get('http://localhost:8090/api/search/companies',
        {
          params: {
            name: this.search,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.companies = response.data;
          } else {
            this.companies = [];
          }
          if (this.companies.length === 1) {
            this.findContactsInCompany(this.companies[0]);
          }
        })
        .catch((error) => console.log(error));
    }

    findContactsInCompany(company: Company) {
      axios.get(`http://localhost:8090/api/contacts/company/${company.companyId}`)
        .then((response) => {
          this.compContacts = response.data;
        })
        .catch((error) => console.log(error));
    }

    filterResults() {
      this.companies = this.companies
        .filter((item) => (item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
    }

    contactsFilterResults() {
      this.contacts = this.contacts
        .filter((item) => (item.contactName.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
    }

    findContacts() {
      axios.get('http://localhost:8090/api/search/contacts',
        {
          params: {
            name: this.search,
          },
        })
        .then((response) => {
          this.contacts = response.data;
          if (this.companies.length === 1) {
            this.checkContacts();
          }
        })
        .catch((error) => console.log(error));
    }

    showpanel() {
      this.$emit('input', this.search);
      this.compContacts = [];
      this.companies = this.comp;
      this.contacts = this.cont;
      if (this.search.length > 0) {
        this.filterResults();
        if (this.companies.length === 0) {
          this.findCompanies();
        }
        if (this.companies.length === 1) {
          this.findContactsInCompany(this.companies[0]);
          this.checkContacts();
        }
        this.contactsFilterResults();
        if (this.contacts.length === 0) {
          this.findContacts();
        }
        this.isOpen = true;
      } else {
        this.clear();
      }
    }

    setResult(result: string) {
      this.search = result;
    }

    created() {
      this.ddd = _.debounce(() => { this.showpanel(); }, 2000);
    }

    checkContacts() {
      this.num = 0;
      for (this.num; this.num < this.contacts.length; this.num += 1) {
        if (this.contacts[this.num].companyId === this.companies[0].companyId) {
          this.contacts.splice(this.num, 1);
          this.num -= 1;
        }
      }
    }

    clear() {
      this.search = '';
      this.companies = [];
      this.contacts = [];
      this.compContacts = [];
      this.isOpen = false;
    }
}
</script>

<style scoped lang="scss">
   input {
        font-size: 24px;
        outline: none;
        width: calc(100% - 54px);
        border: none;
        box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.2);
        height: 48px;
        padding-inline-start: 52px;
        font-family: calibri;
    }
    ::placeholder{
        color: #7F7F7F;
    }
    .fa-city,  .fa-user{
                margin: 15px 2px;
    left: 24px;
    color: #7F7F7F;
    height: 15px;
    }
    .fa-search{
            margin: 12px 2px 0;
    font-size: x-large;
    }
    .fa-times{
        position: absolute;
    left: 95%;
    margin: 17px 2px 0;
    font-size: larger;
    }
    i{
            height: 100%;
    left: 12px;
    position: absolute;
    color:#BEBEBE;
    }

   .search-panel {
        width: 60%;
    position: relative;
    margin: 0 15%;
   }

   .search-results {
        position: absolute;
        width: 100%;
        text-align: left;
        margin-top: -1px;
        z-index: 200;
        -webkit-user-select: none;
        background: #fff;
        box-shadow: 0 4px 6px rgba(32,33,36,.28);
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin: 0;
        padding: 0;
        border: 0;
        padding-bottom: 10px;
        overflow: hidden;
    }

    .company-stage{
        display: flex;
        background: #FFB300;
        height: 60%;
        margin: 10px;
        width: calc(max-content + 50px);
        padding: 0 20px;
        border-radius: 8px;
        color: white;
    }

    .main-contact{
        display: flex;
        background: #5AC37D;
        height: 60%;
        margin: 10px;
        width: calc(max-content + 50px);
        padding: 0 20px;
        border-radius: 8px;
        color: white;
    }

    .res-text{
            display: flex;
    align-items: center;
    }

   ul {
        padding: 0;
        margin: 0 2%;
   }

   li {
    list-style-type: none;
    height: 40px;
    border-bottom: 1px solid #BEBEBE;
    margin: 0 0 0 6%;
    font-size: 16px;
    font-family: calibri;
    display: flex;
    justify-content: space-between;
   }
</style>
