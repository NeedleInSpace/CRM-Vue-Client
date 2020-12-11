<template>
  <div class="deals">
    <AdminPage id="admin-layout" v-if="userRole==='ADMIN'"/>
    <ManagerPage id="manager-layout" v-if="userRole==='MANAGER'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminPage from './components/admin/Admin.vue';
import ManagerPage from './components/manager/Manager.vue';

@Component({
  components: {
    AdminPage,
    ManagerPage,
  },
})
export default class Deals extends Vue {
  get userRole() {
    return this.$store.getters.ROLE;
  }
}
</script>

<style scoped lang="scss">
</style>
