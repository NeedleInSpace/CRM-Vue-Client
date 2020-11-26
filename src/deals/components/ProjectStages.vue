<template>
  <div>
    <div id="main-layout">
      <div id="head">
        <div id="leftPart">
          <div id="name">
            Этапы
          </div>
          <div id="editMode">
            <div id="edit-text">
              Режим редкатирования
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
          <div id="addButton-layout">
            <div id="addButton-text">+ Добавить этап</div>
          </div>
        </div>
      </div>
      <div id="list">
        <div id="stages-layout">
          <li class="stage" v-for="stage in stages" v-bind:key="stage.stageId">
            <div id="buttons">
              <div id="delete-button" v-on:click="onDelete(stage.id)">
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
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Stage from '@/models/Stage';

@Component
export default class ProjectStages extends Vue {
  @Prop()
  projectId!: number;

  editMode = false;

  temp = null;

  editStatus = new Array(10).fill(false);

  mounted() {
    this.$store.dispatch('GET_PROJECT_STAGES', 1);
  }

  get stages() {
    return this.$store.getters.CURRENT_STAGES
      .sort((a: Stage, b: Stage) => a.stageNumber - b.stageNumber);
  }

  onRollback() {
    this.$store.dispatch('GET_PROJECT_STAGES', this.projectId);
    this.editMode = false;
  }

  onSave() {
    this.stages.forEach((stage: Stage) => {
      this.$store.dispatch('PATCH_STAGE', [stage]);
    });
    this.editMode = false;
    this.$store.dispatch('GET_PROJECT_STAGES', this.projectId);
  }

  onDelete(id: number) {
    this.$store.commit('DELETE_STAGE', id);
    this.$store.dispatch('DELETE_STAGE', id);
    this.editMode = false;
  }

  @Watch('projectId')
  onChange(newVal: number, oldVal: number) {
    this.$store.dispatch('GET_PROJECT_STAGES', newVal);
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
            color:  #707070;

            i:hover {
              color: black;
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
  }
}
</style>
