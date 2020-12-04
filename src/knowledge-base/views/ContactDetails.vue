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
            <div id="contactName-layout">
              <div id="contactName" class="fieldContent">
                  {{ contact.contactName }}
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
            <div id="contactCompany-layout" class="contactField">
              <div id="contactCompany" class="fieldTitle">
                Компания
              </div>
              <div class="fieldContent" v-if="contact!==undefined && contact.company!==undefined">
                {{ contact.company.name }}
              </div>
            </div>
            <div
              id="contactPosition-layout"
              class="contactField"
              v-if="contact.position != ''"
            >
              <div id="contactPosition" class="fieldTitle">
                Должность
              </div>
              <div class="fieldContent">{{ contact.position }}</div>
            </div>
            <div
              id="contactMakeDecision-layout"
              class="contactField"
            >
              <div id="contactMakeDecision" class="fieldTitle">
                Лицо принимающее решение
              </div>
              <div class="fieldContent">
                <div v-if="contact.makeDecision">Да</div>
                <div v-if="!contact.makeDecision">Отсутствует</div>
              </div>
            </div>
            <div id="contactMainEmail-layout" class="contactField" v-if="contact.mainEmail != ''">
              <div id="contactMainEmail" class="fieldTitle">
                E-mail
              </div>
              <div class="fieldContent">{{ contact.mainEmail }}</div>
            </div>
            <div
            id="contactOtherEmails-layout"
            class="contactField"
            v-if="contact.otherEmails != null"
            >
              <div id="otherEmails" class="fieldTitle">Другие E-mail</div>
              <div
                id="oEmail"
                v-for="oEmail in contact.otherEmails"
                v-bind:key="oEmail.text"
              >
                <div class="oEmail">
                  {{ oEmail }}
                </div>
              </div>
            </div>
            <div id="contactMainPhone-layout" class="contactField" v-if="contact.mainPhone != ''">
              <div id="contactMainPhone" class="fieldTitle">
                Телефон
              </div>
              <div class="fieldContent">{{ contact.mainPhone }}</div>
            </div>
            <div
            id="contactOtherPhones-layout"
            class="contactField"
            v-if="contact.otherPhones != null"
            >
              <div id="otherPhones" class="fieldTitle">Другие телефоны</div>
              <div
                id="oPhones"
                v-for="oPhones in contact.otherPhones"
                v-bind:key="oPhones.text"
              >
                <div class="oPhones">
                  {{ oPhones }}
                </div>
              </div>
            </div>
            <div id="contactNotes-layout" class="contactField" v-if="contact.notes != null">
              <div id="notes" class="fieldTitle">Заметки</div>
              <div
                id="note"
                v-for="note in contact.notes"
                v-bind:key="note.text"
              >
                <div class="note">
                  {{ note }}
                </div>
              </div>
            </div>
          </div>
          <div id="editFields-layout" v-if="editMode">
            <EditMode id="editMode-layout"/>
          </div>
          <div id="contacts">
            <div id="notes-layout">
                <div id="notes-title">Заметки</div>
                <div
                  id="notes"
                  v-for="note in contact.notes"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditMode from './ContactEditMode.vue';

@Component({
  components: {
    EditMode,
  },
})
export default class ContactDetails extends Vue {
  get contact() {
    return this.$store.getters.CURRENT_CONTACT;
  }

  editMode = false;

  newNote = '';

  beforeCreate() {
    this.$store.dispatch('GET_CONTACT_BY_ID', this.$route.params.id);
  }

  /** Функция обработки нажатия кнопки редактирования */
  onEditButtonClick() {
    this.editMode = true;
  }

  /** Функция обработки нажатия кнопки сброса изменений */
  onRollBackButtonClick() {
    this.$store.dispatch('GET_CONTACT_BY_ID', this.$route.params.id);
    this.editMode = false;
  }

  /** Функция обработки нажатия кнопки сохранений изменений */
  onSaveButtonClick() {
    this.$store.state.company = null;
    this.$store
      .dispatch('PATCH_CONTACT', [this.contact, this.$route.params.id])
      .then(() => {
        this.$store.dispatch('GET_CONTACT_BY_ID', this.$route.params.id);
        this.editMode = false;
      });
  }

  /** Функция обработки нажатия кнопки добавления новой заметки */
  onAddButtonClick() {
    if (this.newNote !== '') {
      this.$store
        .dispatch('POST_NOTE_TO_CONTACT', [this.newNote, this.$route.params.id])
        .then(() => {
          this.$store.dispatch('GET_CONTACT_BY_ID', this.$route.params.id);
          this.newNote = '';
        });
    }
  }

  /** Функция обработки нажатия кнопки удаления компании */
  onDeleteButton() {
    this.$store
      .dispatch('DELETE_CONTACT', this.$route.params.id)
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
        justify-content: space-between;
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

          #contactName-layout {
            display: inline-block;
            margin-left: 25px;

            #contactName {
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

        .contactField {
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
    }
  }
  #notes-layout {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 63%;
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
</style>
