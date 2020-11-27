<template>
  <div>
    <div id="main-layout">
      <div id="fields">
        <div class="field-layout">
          <div class="field-title">Название этапа</div>
          <div class="fieldBorder">
            <input
              v-model.lazy.trim="stage.stageName"
              class="fieldContent"
              placeholder="Название этапа"
            />
          </div>
          <div class="error" v-if="stage.stageName===undefined || stage.stageName.length===0">
            {{this.error}}
          </div>
        </div>
        <div class="field-layout">
          <div class="field-title">Описание этапа</div>
          <div class="fieldBorder">
            <input
              v-model.lazy.trim="stage.description"
              class="fieldContent"
              placeholder="Описание этапа"
            />
          </div>
          <div class="error" v-if="stage.description===undefined || stage.description.length===0">
            {{this.error}}
          </div>
        </div>
        <div class="field-layout">
          <div class="field-title">Критерий окончания этапа</div>
          <div class="fieldBorder">
            <input
              v-model.lazy.trim="stage.result"
              class="fieldContent"
              placeholder="Критерий окончания этапа"
            />
          </div>
          <div class="error" v-if="stage.result===undefined || stage.result.length===0">
            {{this.error}}
          </div>
        </div>
      </div>
      <div id="buttons-layout">
        <button id="cancelButton-layout" class="button-layout">
          <div id="cancelButton-text" class="button-text"
          v-on:click="onCancelClick">Отмена</div>
        </button>
        <button id="addStageButton-layout" class="button-layout">
          <div id="addStageButton-text" class="button-text"
          v-on:click="onAddStageClick">Добавить этап</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Stage from '@/models/Stage';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class AddStage extends Vue {
  @Prop()
  projectId!: number;

  stage = {} as Stage;

  error = '';

  /** Функция, генерирующая событие возврата из режима добавления */
  onCancelClick() {
    this.$emit('cancelAddStage');
  }

  /** Функция, обрабатывающая кнопку добавления нового этапа */
  onAddStageClick() {
    if (this.checkForm()) {
      this.stage.projectId = this.projectId;
      this.stage.stageNumber = 2;
      this.$store
        .dispatch('POST_NEW_STAGE', this.stage)
        .then((response) => {
          this.$emit('cancelAddStage', {
            projectId: response.data.id,
          });
          this.$store.dispatch('GET_PROJECT_STAGES', this.projectId);
        });
    }
  }

  /** Функция проверки корректности полей */
  checkForm() {
    if (this.stage.stageName === undefined || this.stage.description === undefined
    || this.stage.result === undefined || this.stage.stageName.length === 0
    || this.stage.description.length === 0 || this.stage.result.length === 0) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }

  @Watch('projectId')
  onChange(newVal: number, oldVal: number) {
    this.$store.dispatch('GET_PROJECT_STAGES', newVal);
  }
}

</script>

<style scoped lang="scss">
#main-layout {
  margin: 0px 10px;

  #fields {
    .field-layout {
      display: grid;
      margin: 7px 0px;

      .error {
        color:red;
        font-size: 12pt;
      }

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

  #buttons-layout {
    margin: 20px 0px 15px 0px;
    text-align: right;

    #cancelButton-layout {
      margin-right: 15px;
      background: #EF5350;
    }

    #cancelButton-layout:hover {
      border: 1px solid #f02723;
      opacity: 1;
      background: white;

      #cancelButton-text {
        color: #f02723;
      }
    }

    #addStageButton-layout {
      background: #5ac37d;
    }

    #addStageButton-layout:hover {
      border: 1px solid #5ac37d;
      opacity: 1;
      background: white;

      #addStageButton-text {
        color: #5ac37d;
      }
    }

    .button-layout {
      display: inline-block;
      border: 1px solid white;
      padding: 8px;
      border-radius: 12px;
      opacity: 0.95;
      text-decoration: none;

      .button-text {
        font-size: 14pt;
        color: white;
      }
    }

    .button-layout:active,
    .button-layout:focus {
      outline: none;
    }
  }
}

</style>
