<template>
  <div>
      <div class="stages">
        <div class="stages-header">
          <i class="fa fa-arrow-left" aria-hidden="true" v-on:click="closeStageList"></i>
         <div class="name"> Этапы </div>
        </div>
        <div class="list">
         <div class="stage" v-for="stage in stages" v-bind:key="stage.id">
            <div id="fields">
              <div class="field-layout">
                <div class="field-title">Название этапа</div>
                <div class="field-content">
                  {{ stage.stageName }}
                </div>
              </div>
              <div class="field-layout">
                <div class="field-title">Описание этапа</div>
                <div class="field-content">
                  {{ stage.description }}
                </div>
              </div>
              <div class="field-layout">
                <div class="field-title">Критерий окончания этапа</div>
                <div class="field-content">
                  {{ stage.result }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Stage from '@/models/Stage';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class StageList extends Vue {
  get stages() {
    return this.$store.getters.CURRENT_STAGES
      .sort((a: Stage, b: Stage) => a.stageNumber - b.stageNumber);
  }

  closeStageList() {
    this.$emit('closeStages');
  }
}

</script>

<style scoped lang="scss">
.stages {
  margin: 30px 25px;
}
.stages-header {
  color: #7f7f7f;
  display: flex;
  align-items: center;
}
.fa-arrow-left {
  font-size: 20pt;
  cursor: pointer;
}
.name {
  font-size: 18pt;
  font-family: calibri;
  display: flex;
  opacity: 87%;
  margin-left: 15px;
}
.list {
  margin: 20px 2px;
  max-height: 90%;
  overflow-y: scroll;
}
.stage {
  box-shadow: 1.3px 1.3px 5px #707070;
  margin: 15px 5px;
  padding: 20px;
}
.field-title {
  font-size: 10pt;
  color: #7f7f7f;
}
.field-content {
  font-size: 14pt;
}
.field-layout {
  margin-bottom: 5px;
}
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #BEBEBE;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #BEBEBE;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7F7F7F;
}
</style>
