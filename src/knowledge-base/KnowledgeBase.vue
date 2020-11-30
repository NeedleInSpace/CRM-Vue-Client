<template>
  <div>
    <div id="main-layout">
       <div id = "search-layout">
        <Search id ="search"/>
      </div>
      <div id="companiesForm-layout">
        <div id="companiesForm-header">
          <div id="activeCompanyElements-layout">
            <div id="title">Компании</div>
            <div id="icons">
              <i class="fas fa-filter" />
            </div>
          </div>
          <div id="addCompany-layout">
            <router-link to="/kb/addCompany" class="nav-element" active-class="active">
              <div id="addCompany-button">
                <div id="addCompanyButton-text">+ Добавить компанию</div>
              </div>
            </router-link>
          </div>
        </div>
        <div id="companies-layout">
          <CompanyList id="companyList" />
        </div>
      </div>
      <div id="contactsForm-layout">
        <div id="contactsForm-header">
          <div id="activeContactElements-layout">
            <div id="title">Контактные лица</div>
          </div>
          <div id="addContact-layout">
            <router-link to="/kb/addContact" class="nav-element" active-class="active">
              <div id="addContact-button">
                <div id="addContactButton-text">+ Добавить лицо</div>
              </div>
            </router-link>
          </div>
        </div>
        <div id="contactPersons-layout">
          <ContactPersonList id="contactPersonList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CompanyList from '@/knowledge-base/components/CompanyList.vue';
import ContactPersonList from './components/ContactPersonList.vue';

@Component({
  components: {
    CompanyList,
    ContactPersonList,
  },
})
export default class KnowledgeBase extends Vue {}
</script>

<style scoped lang="scss">
#main-layout {
  margin: 2.5% 1%;

  #search-layout{
    margin: 0 auto 15px;
  }
  #companiesForm-layout {
    display: inline-block;
    margin-right: 1%;
    width: 49%;
    box-shadow: 1.3px 1.3px 5px #707070;

    #companiesForm-header {
      margin: 20px 35px 0px 25px;

      #activeCompanyElements-layout {
        display: inline-block;
        width: 50%;
        vertical-align: middle;

        #title {
          display: inline-block;
          font-size: 28pt;
          opacity: 0.95;
        }

        #icons {
          display: inline-block;
          margin-left: 15px;
          color: #707070;

          i:hover {
            color: black;
          }
        }
      }

      #addCompany-layout {
        display: inline-block;
        vertical-align: middle;
        text-align: right;
        width: 50%;

        #addCompany-button {
          display: inline-block;
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

        #addCompany-button:hover {
          border: 1px solid #508c64;
          background: white;

          #addCompanyButton-text {
            color: #508c64;
          }
        }
      }
    }

    #companies-layout {
      display: inline-block;
      width: 96%;
      height: 96%;
      margin: 2%;
    }
  }

  #contactsForm-layout {
    display: inline-block;
    vertical-align: top;
    width: 49%;
    box-shadow: 1.3px 1.3px 5px #707070;

    #contactsForm-header {
      margin: 20px 35px 0px 25px;

      #activeContactElements-layout {
        display: inline-block;
        width: 50%;
        vertical-align: middle;

        #title {
          font-size: 28pt;
          opacity: 0.95;
        }
      }

      #addContact-layout {
        display: inline-block;
        vertical-align: middle;
        text-align: right;
        width: 50%;

        #addContact-button {
          display: inline-block;
          padding: 10px;
          border-radius: 12px;
          opacity: 0.95;
          background: #5ac37d;

          #addContactButton-text {
            font-size: 14pt;
            color: white;
          }
        }

        #addContact-button:hover {
          border: 1px solid #508c64;
          background: white;

          #addContactButton-text {
            color: #508c64;
          }
        }
      }
    }

    #contactPersons-layout {
      display: inline-block;
      width: 96%;
      height: 96%;
      margin: 2%;
    }
  }
}

.nav-element {
  text-decoration: none;
}
</style>
