<template>
  <div>
    <div id="main-layout" v-if="currentProject.id!=0">
      <div id="head">
        <div id="leftPart">
          <div id="name">
            Этапы
          </div>
          <div id="editMode" v-if="stages.length!=0">
            <div id="edit-text">
              Редкатирование
            </div>
            <i id="toEditMode" class="fas fa-toggle-off" v-if="!editMode"
            v-on:click="editMode=true"></i>
            <i id="fromEditMode" class="fas fa-toggle-on" v-if="editMode"
            v-on:click="onRollback()"></i>
            <div id="onEditMode-buttons" v-if="editMode">
              <div id="save-button" v-on:click="onSave()">
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <div id="rightPart">
          <button id="addButton-layout">
            <div id="addButton-text" v-on:click="onAddStageClick">+ Добавить этап</div>
          </button>
        </div>
      </div>
      <div id="list">
        <div id="stages-layout" v-if="stages.length!=0">
          <div class="error" v-if="error.length!==0">
            {{this.error}}
          </div>
          <li class="stage" v-for="stage in stages" v-bind:key="stage.stageId">
            <div id="buttons" v-if="editMode">
              <div id="delete-button" v-if="stage.stageNumber==stages.length-1"
              v-on:click="onDelete(stage.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
            <div id="fields">
              <div class="field-layout">
                <div class="field-title">Название этапа</div>
                <div class="field-content" v-if="!editMode">
                  {{ stage.stageName }}
                </div>
                <div class="fieldBorder" v-if="editMode">
                  <input
                    v-model.lazy.trim="stage.stageName"
                    class="fieldContent"
                    placeholder="Род деятельности"
                  />
                </div>
              </div>
              <div class="field-layout">
                <div class="field-title">Описание этапа</div>
                <div class="field-content" v-if="!editMode">
                  {{ stage.description }}
                </div>
                <div class="fieldBorder" v-if="editMode">
                  <input
                    v-model.lazy.trim="stage.description"
                    class="fieldContent"
                    placeholder="Род деятельности"
                  />
                </div>
              </div>
              <div class="field-layout">
                <div class="field-title">Критерий окончания этапа</div>
                <div class="field-content" v-if="!editMode">
                  {{ stage.result }}
                </div>
                <div class="fieldBorder" v-if="editMode">
                  <input
                    v-model.lazy.trim="stage.result"
                    class="fieldContent"
                    placeholder="Род деятельности"
                  />
                </div>
              </div>
            </div>
          </li>
        </div>
        <div id="addStage" class="stage" v-if="addingStage">
          <AddStage id="add-stage" @cancelAddStage="onCancelAddStage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Component, Vue,
} from 'vue-property-decorator';
import Stage from '@/models/Stage';
import AddStage from './AddStage.vue';

@Component({
  components: {
    AddStage,
  },
})
export default class ProjectStages extends Vue {
  addingStage = false;

  editMode = false;

  error = '';

  temp = null;

  get currentProject() {
    this.$store.dispatch('GET_PROJECT_STAGES', this.$store.getters.CURRENT_PROJECT.id);
    return this.$store.getters.CURRENT_PROJECT;
  }

  get stages() {
    return this.$store.getters.CURRENT_STAGES
      .sort((a: Stage, b: Stage) => a.stageNumber - b.stageNumber);
  }

  /** Функция, обрабатывающая сброс изменений */
  onRollback() {
    this.$store.dispatch('GET_PROJECT_STAGES', this.currentProject.id);
    this.editMode = false;
    this.error = '';
  }

  /** Функция, обрабатывающая сохранение изменений */
  onSave() {
    for (let i = 0; i < this.stages.length; i += 1) {
      const stage = this.stages[i];
      if (stage.stageName === undefined || stage.description === undefined
      || stage.result === undefined || stage.stageName.length === 0
      || stage.description.length === 0 || stage.result.length === 0) {
        this.error = 'Заполните все поля';
        break;
      } else {
        this.error = '';
        this.$store.dispatch('PATCH_STAGE', stage);
        this.editMode = false;
        this.$store.dispatch('GET_PROJECT_STAGES', this.$store.getters.CURRENT_PROJECT.id);
      }
    }
  }

  /** Функция обработки удаления этапа */
  onDelete(id: number) {
    this.$store.commit('DELETE_STAGE', id);
    this.$store.dispatch('DELETE_STAGE', id);
    this.editMode = false;
  }

  /** Функция перехода в режим редактирования */
  onAddStageClick() {
    this.addingStage = true;
  }

  /** Функция отмены добавления нового этапа */
  onCancelAddStage() {
    this.addingStage = false;
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

#main-layout {
  display: grid;
  margin: 15px 15px;

  #head {
    display: inline-block;

    #leftPart {
      display: inline-block;
      width: 70%;

      #name {
        display: inline-block;
        font-size: 20pt;
        opacity: 0.85;
      }

      #editMode {
        display: inline-block;
        margin-left: 10px;
        font-size: 12pt;

        i:hover {
          color: black;
        }

        #edit-text {
          display: inline-block;
          margin-left: 10px;
          // margin-top: 10px;
          color:  #707070;
        }

        #toEditMode {
          display: inline-block;
          margin-left: 10px;
          font-size: 14pt;
          color:  #707070;
        }

        #toEditMode:hover {
          color: black;
        }

        #fromEditMode {
          display: inline-block;
          margin-left: 10px;
          font-size: 14pt;
          color: #5ac37d;
        }

        #onEditMode-buttons {
          display: inline-block;

          #save-button {
            display: inline-block;
            margin-left: 10px;
            font-size: 14pt;
            color: #5ac37d;
            i:hover {
              color: black;
            }
          }
        }
      }
    }

    #rightPart {
      display: inline-block;
      text-align: right;
      width: 30%;

      #addButton-layout {
        display: inline-block;
        border: 1px solid white;
        padding: 10px;
        border-radius: 12px;
        opacity: 0.95;
        text-decoration: none;
        background: #5ac37d;

        #addButton-text {
          font-size: 14pt;
          color: white;
        }
      }

      #addButton-layout:active,
      #addButton-layout:focus {
        outline: none;
      }
      #addButton-layout:hover {
        border: 1px solid #508c64;
        background: white;

        #addButton-text {
          color: #508c64;
        }
      }
    }
  }

  #list {
    display: grid;
    margin-top: 20px;
    margin-bottom: 15px;
    box-shadow: 1.3px 1.3px 5px #707070;

    #stages-layout {
      margin: 10px 2px;

      .error {
        margin-left: 10px;
        color:red;
        font-size: 12pt;
      }

      .stage {
        display: grid;
        list-style: none;
        margin: 10px;
        box-shadow: 1.3px 1.3px 5px #707070;
        border: 1px solid #ffffff;

        #buttons {
          text-align: right;

          #delete-button {
            display: inline-block;
            margin: 10px 20px 0px 0px;
            font-size: 14pt;
            color:  #707070;

            i:hover {
              color: #EF5350;
            }
          }
        }

        .field-layout {
          display: grid;
          margin: 7px 10px;

          .field-title {
            font-size: 10pt;
            color: #7f7f7f;
          }

          .field-content {
            font-size: 14pt;
          }

          .fieldBorder {
            display: grid;
            margin-top: 5px;
            border-radius: 6px;
            border: 1px solid #7f7f7f;
            opacity: 0.95;

            .fieldContent {
              margin: 5px;
              font-size: 14pt;
              border: white;
              outline-style: none;
            }
          }
        }
      }
    }

    #addStage {
      margin: 10px;
      box-shadow: 1.5px 1.5px 10px #508C64;
    }
  }
}
</style>
