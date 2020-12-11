<template>
  <div>
    <div id="main-layout">
        <div id="details-layout">
          <div id="details-header">
            <div id="header-left">
              <router-link to="/kb" class="nav-element" active-class="active">
                <div id="return-button">
                  <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </div>
              </router-link>
              <div id="companyName-layout">
                <div id="companyName" class="fieldContent">
                  {{ company.name }}
                </div>
              </div>
              <div id="editMode">
                <div id="edit-text">
                  Режим редкатирования
                </div>
                <div id="toEdit-button" v-on:click="onEditButtonClick" v-if="!editMode">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
                <div id="onEditMode-buttons" v-if="editMode">
                  <div id="rollback-button" v-on:click="onRollBackButtonClick">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                  </div>
                  <div id="save-button" v-on:click="onSaveButtonClick">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            <div id="header-right">
              <div id="delete-button" v-on:click="onDeleteButton">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div id="fields-layout">
            <div id="fields" v-if="!editMode">
              <div id="companyName-layout" class="companyField" v-if="company.fullName != ''">
                <div id="companyFullName" class="fieldTitle">
                  Название компании
                </div>
                <div class="fieldContent">{{ company.fullName }}</div>
              </div>
              <div
                id="companyActivity-layout"
                class="companyField"
                v-if="company.kindOfActivity != ''"
              >
                <div id="companyActivity" class="fieldTitle">
                  Род деятельности
                </div>
                <div class="fieldContent">{{ company.kindOfActivity }}</div>
              </div>
              <div
                id="companyVolume-layout"
                class="companyField"
                v-if="company.consumptionVolume != null"
              >
                <div id="companyVolume" class="fieldTitle">
                  Объём потребления
                </div>
                <div class="fieldContent">{{ company.consumptionVolume }}</div>
              </div>
              <div id="generatingCapacity-layout" class="companyField">
                <div id="generatingCapacity" class="fieldTitle">
                  Генерирующие мощности
                </div>
                <div class="fieldContent">{{ company.generatingCapacity }}</div>
              </div>
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
              <div id="email-layout" class="companyField" v-if="company.email != ''">
                <div id="email" class="fieldTitle">E-mail</div>
                <div class="fieldContent">{{ company.email }}</div>
              </div>
              <div id="phone-layout" class="companyField" v-if="company.phone != null">
                <div id="phone" class="fieldTitle">Телефон</div>
                <div class="fieldContent">{{ company.phone }}</div>
              </div>
            </div>
            <div id="editFields-layout" v-if="editMode">
              <EditMode id="editMode-layout"/>
            </div>
            <div id="contacts">
              <div id="contacts-title">Контактные лица</div>
              <div id="contacts-table">
                <div id="contactsTable-columns">
                  <div id="columnName" class="columnTitle row-field">ФИО</div>
                  <div id="columnPosition" class="columnTitle row-field">
                    Должность
                  </div>
                  <div id="columnMainEmail" class="columnTitle row-field">
                    E-mail
                  </div>
                  <div id="columnMainPhone" class="columnTitle row-field phoneField">
                    Телефон
                  </div>
                </div>
                <div id="contactsTable-rows">
                  <div
                    v-for="contact in companyContacts"
                    v-bind:key="contact.contactPersonId"
                    class="contactsTable-row"
                  >
                    <div class="row-field">
                      {{ contact.contactName }}
                    </div>
                    <div class="row-field">
                      {{ contact.position }}
                    </div>
                    <div class="row-field">
                      {{ contact.mainEmail }}
                    </div>
                    <div class="row-field phoneField">
                      {{ contact.mainPhone }}
                    </div>
                  </div>
                </div>
              </div>
              <div id="notes-layout">
                <div id="notes-title">Заметки</div>
                <div
                  id="notes"
                  v-for="note in company.notes"
                  v-bind:key="note.text"
                >
                  <div class="note">
                    {{ note }}
                  </div>
                </div>
                <div id="input-border">
                  <input
                    v-model.lazy.trim="newNote"
                    id="notes-input"
                    placeholder="Напишите текст заметки..."
                  />
                </div>
                <div id="buttons-layout">
                  <button id="addNoteButton-layout" v-on:click="onAddButtonClick">
                    <div id="addNoteButton-text">+ Добавить заметку</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditMode from './EditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class CompanyDetails extends Vue {
  get company() {
    return this.$store.getters.CURRENT_COMPANY;
  }

  get companyContacts() {
    return this.$store.getters.COMPANY_CONTACTS;
  }

  editMode = false;

  newNote = '';

  beforeCreate() {
    this.$store.dispatch('GET_COMPANY_BY_ID', this.$route.params.id);
    this.$store.dispatch('GET_COMPANY_CONTACTS', this.$route.params.id);
  }

  /** Функция обработки нажатия кнопки редактирования */
  onEditButtonClick() {
    this.editMode = true;
  }

  /** Функция обработки нажатия кнопки сброса изменений */
  onRollBackButtonClick() {
    this.$store.dispatch('GET_COMPANY_BY_ID', this.$route.params.id);
    this.editMode = false;
  }

  /** Функция обработки нажатия кнопки сохранений изменений */
  onSaveButtonClick() {
    this.$store
      .dispatch('PATCH_COMPANY', [this.company, this.$route.params.id])
      .then(() => {
        this.$store.dispatch('GET_COMPANY_BY_ID', this.$route.params.id);
        this.editMode = false;
      });
  }

  /** Функция обработки нажатия кнопки добавления новой заметки */
  onAddButtonClick() {
    if (this.newNote !== '') {
      this.$store
        .dispatch('POST_NOTE_TO_COMPANY', [this.newNote, this.$route.params.id])
        .then(() => {
          this.$store.dispatch('GET_COMPANY_BY_ID', this.$route.params.id);
          this.newNote = '';
        });
    }
  }

  /** Функция обработки нажатия кнопки удаления компании */
  onDeleteButton() {
    this.$store
      .dispatch('DELETE_COMPANY', this.$route.params.id)
      .then(() => {
        this.$router.push('/kb');
      });
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
    min-width: 1000px;
    max-width: auto;
    margin: 25px 25px 0px 25px;
    padding-bottom: 25px;
    text-align: left;
    box-shadow: 1.4px 1.4px 5px #707070;
    border: 1px solid #ffffff;

    #details-layout {
      margin: 0px 15px;

      #details-header {
        text-align: left;
        margin: 25px 20px 15px 10px;
        font-size: 28pt;
        color: #7f7f7f;

        #header-left {
          display: inline-block;
          text-align: left;
          width: 50%;

          #return-button {
            display: inline-block;
            color: #7f7f7f;

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

          #editMode {
            display: inline-block;
            margin-left: 25px;

            #edit-text {
              display: inline-block;
              font-size: 10pt;
            }

            #toEdit-button {
              display: inline-block;
              margin-left: 10px;
              font-size: 12pt;

              i:hover {
                color: black;
              }
            }

            #onEditMode-buttons {
              display: inline-block;

              #rollback-button {
                display: inline-block;
                margin-left: 10px;
                font-size: 12pt;

                i:hover {
                  color: black;
                }
              }

              #save-button {
                display: inline-block;
                margin-left: 10px;
                font-size: 12pt;

                i:hover {
                  color: black;
                }
              }
            }
          }
        }

        #header-right {
          display: inline-block;
          text-align: right;
          vertical-align: top;
          width: 50%;
        }

        #delete-button {
          font-size: 18pt;

          i:hover {
            color: black;
          }
        }
      }

      #fields {
        display: inline-block;
        vertical-align: top;
        width: 35%;

        .companyField {
          margin: 8px 10px 5px 10px;
        }

        .fieldTitle {
          font-size: 10pt;
          color: #7f7f7f;
        }

        .fieldContent {
          font-size: 14pt;
          opacity: 0.95;
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

      #editFields-layout {
        display: inline-block;
        vertical-align: top;
        width: 35%;
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
          display: grid;
          margin-top: 20px;

          .columnTitle {
            color: #7f7f7f;
          }

          #contactsTable-columns {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 100px;
            grid-template-rows: minmax(30px, auto);
            border-bottom: 1px solid #b9b9b9;
          }

          .contactsTable-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 100px;
            grid-template-rows: minmax(35px, auto);
            border-top: 1px solid #b9b9b9;
            vertical-align: middle;
          }

          .row-field {
            display: flex;
            text-align: center;
            opacity: 95%;
            justify-content: center;
            align-items: center;
            font-size: 10pt;
            border-right: 1px solid #b9b9b9;
          }

          .phoneField {
            border-right: 0px solid #b9b9b9;
          }
        }

        #notes-layout {
          margin-top: 25px;

          #notes-title {
            font-size: 16pt;
          }

          #notes {
            display: block;
            min-height: 20px;
            width: 100%;
            margin-top: 10px;
            box-shadow: 1.4px 1.4px 5px #707070;
            border: 1px solid #ffffff;

            .note {
              display: inline-block;
              margin-left: 10px;
            }
          }

          #input-border {
            display: inline-block;
            width: 100%;
            margin-top: 10px;
            border-radius: 6px;
            border: 1px solid #bebebe;

            #notes-input {
              margin: 5px;
              width: 97%;
              font-size: 14pt;
              border-radius: 6px;
              border: white;
              outline-style: none;
            }
          }

          #buttons-layout {
            margin-top: 15px;
            margin-right: -5px;
            text-align: right;

            #addNoteButton-layout {
              display: inline-block;
              border: 1px solid white;
              padding: 10px;
              border-radius: 12px;
              opacity: 0.95;
              text-decoration: none;
              background: #5ac37d;

              #addNoteButton-text {
                font-size: 14pt;
                color: white;
              }
            }

            #addNoteButton-layout:active,
            #addNoteButton-layout:focus {
              outline: none;
            }

            #addNoteButton-layout:hover {
              border: 1px solid #508c64;
              background: white;

              #addNoteButton-text {
                color: #508c64;
              }
            }
          }
        }
      }
    }
  }
}
</style>
