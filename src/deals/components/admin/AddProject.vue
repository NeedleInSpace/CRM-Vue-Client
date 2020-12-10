<template>
  <div>
    <div class="head">
        <div class="name">
            Подробности
        </div>
    </div>
      <div class="project-data">
        <div class="short-name" >
          <div class="title">
            Краткое название проекта
          </div>
          <input
            v-model.lazy.trim="project.shortName"
            class="edit-field"
            placeholder="Краткое название"
          />
          <div class="error" v-if="project.shortName===undefined || project.shortName.length===0">
            {{this.error}}
          </div>
        </div>
        <div class="full-name">
          <div class="title">
            Полное название проекта
          </div>
          <textarea
            v-model.lazy.trim="project.fullName"
            class="edit-field"
            placeholder="Полное название"
          />
          <div class="error" v-if="project.fullName===undefined || project.fullName.length===0">
            {{this.error}}
          </div>
        </div>
        <div class="description">
          <div class="title">
            Описание
          </div>
           <textarea
            v-model.lazy.trim="project.description"
            class="edit-field description-text"
            placeholder="Описание"
          />
        </div>
      </div>
      <div class="buttons-menu">
          <div class = "button cancel-button"
          v-on:click="onCancelClick">Отмена</div>
          <div class = "button add-project-button"
          v-on:click="onAddButtonClick">Добавить проект</div>
      </div>
  </div>
</template>

<script lang="ts">
import Project from '@/models/Project';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class AddProject extends Vue {
  project = {} as Project;

  error = '';

  onCancelClick() {
    this.$emit('cancel');
  }

  onAddButtonClick() {
    if (this.checkForm()) {
      this.$store
        .dispatch('POST_NEW_PROJECT', [this.project])
        .then((response) => {
          this.$emit('cancel', {
            projectId: response.data.id,
          });
          this.$store.dispatch('GET_PROJECTS');
        });
    }
  }

  checkForm() {
    if (this.project.shortName === undefined || this.project.fullName === undefined
    || this.project.shortName.length === 0 || this.project.fullName.length === 0) {
      this.error = 'Пожалуйста, заполните поле';
      return false;
    }
    return true;
  }
}
</script>
<style scoped lang="scss">
.head {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 4% auto;}
    .name {
    font-size: 20px;
    font-family: calibri;
    align-items: center;
    display: flex;
    opacity: 87%;
    justify-content: space-around;
    width: 35%;
}

.project-data {
  margin: 20px 4%;

  .title {
    font-size: 12px;
    color: #7f7f7f;
    margin-top: 10px;
  }

  .field {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .edit-field {
    border: 1px solid #BEBEBE;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 17px;
    width: 95%;
  }

  textarea {
    resize: none;
    overflow: auto;
    width: 95%;
  }

  .description-text {
        height: 150px;
  }

  .error {
    color:red;
    font-size: 11px;
  }
}

.buttons-menu {
  display: flex;
  margin: 20px;
  justify-content: flex-end;

  .button {
    display: inline-block;
    padding: 8px;
    border-radius: 12px;
    opacity: 0.95;
    font-size: 16px;
    color: white;
    max-width: 49%;
    text-align: center;
    padding: 8px 14px;
  }
  .add-project-button {
    background: #5AC37D;
  }
  .cancel-button {
    background: #EF5350;
    margin: 0 5%;
  }
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
