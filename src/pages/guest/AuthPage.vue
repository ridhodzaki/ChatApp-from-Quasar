<template>
  <q-page class="flex flex-center column">
    <span class="text-h5 text-white q-mb-xs">
      Welcome to
    </span>
    <q-separator color="white" size="xs" style="width: 20%"/>
    <span class="text-h3 text-white q-mb-md">Chat App</span>
    <div class="column bg-white q-pa-md border" :style="`width: ${this.$q.screen.xs ? '90' : this.$q.screen.sm ? '50' : '30'}%`">
      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Login" label="Login" no-caps />
          <q-tab name="Register" label="Register" no-caps />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Login">
            <LoginRegister :tab="tab"/>
          </q-tab-panel>

          <q-tab-panel name="Register">
            <LoginRegister :tab="tab"/>
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </q-page>
</template>
<script>
import LoginRegister from 'components/LoginRegister.vue'
export default {
  components: {
    LoginRegister
  },
  data () {
    return {
      tab: 'Login'
    }
  }
}
</script>
