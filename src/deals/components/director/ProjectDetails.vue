<template>
  <div class="project-details">
    <div id="details-layout">
        <div id="details-header">
            <div id="header-left">
            <div class="name">Подробности</div>
            </div>
        </div>
        <div id="fields">
            <div class="field">
              <div id="projectShortName" class="fieldTitle">
                Краткое нвзвание проекта
              </div>
              <div class="fieldContent">
                {{ project.shortName }}
              </div>
            </div>
            <div class="field">
              <div id="projectFullName" class="fieldTitle">
                Полное нвзвание проекта
              </div>
              <div class="fieldContent">
                {{ project.fullName }}
              </div>
            </div>
            <div class="field">
              <div id="projectStageNumber" class="fieldTitle">
                Количество этапов
              </div>
              <div class="fieldContent">
                {{ project.stagesNumber }}
              </div>
            </div>
            <div class="field">
              <div id="projectStartDate" class="fieldTitle">
                Дата старта проекта
              </div>
              <div class="fieldContent">
                {{ project.startDate }}
              </div>
            </div>
            <div class="field">
              <div id="projectMemberNumber" class="fieldTitle">
                Количество участников
              </div>
              <div class="fieldContent">
                {{ project.memberNumber}}
              </div>
            </div>
            <div class="field">
              <div id="projectDescription" class="fieldTitle">
                Описание
              </div>
              <div class="fieldContent">
                {{ project.description}}
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Deals extends Vue {
  get project() {
    return this.$store.getters.CURRENT_PROJECT;
  }
}
</script>

<style scoped lang="scss">
.project-details {
    box-shadow: 1.3px 1.3px 5px #707070;
    height: fit-content;
    #details-layout {
      margin: 25px 6%;
      #details-header{
        .name {
          font-size: 20pt;
          display: flex;
          opacity: 87%;
          color: #7c7c7c;
        }
      }
      #fields {
        margin-top: 20px;
        .field {
          margin: 8px 0px 5px;
          .fieldTitle {
            font-size: 10pt;
            color: #7f7f7f;
          }

          .fieldContent {
            font-size: 14pt;
            opacity: 0.95;
          }
        }
        }
    }
}
</style>
