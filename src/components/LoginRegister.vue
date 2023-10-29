<template>
  <div class="row items-center">
    <div class="col-auto">
      <span class="text-body1 text-weight-medium">{{ tab }} Form</span>
    </div>
    <div class="col q-ml-sm">
      <q-separator color="grey-7" size="md" />
    </div>
  </div>
  <q-form
    @submit="onSubmit"
    class="q-gutter-xs q-mt-md">
    <q-input
      v-if="tab !== 'Login'"
      outlined
      dense
      type="text"
      v-model="formData.name"
      placeholder="Nama"
      :rules="[
        val => val !== '' || 'Masukan nama'
      ]">
      <template v-slot:prepend>
        <q-icon name="mdi-account-outline" />
      </template>
    </q-input>
    <q-input
      outlined
      dense
      type="text"
      v-model="formData.email"
      placeholder="Email"
      :rules="[
        val => (val !== '' && val.includes('@gmail.com')) || 'Masukan Email Google diakhiri @gmail.com'
      ]">
      <template v-slot:prepend>
        <q-icon name="mdi-account-outline" />
      </template>
    </q-input>
    <q-input
      outlined
      dense
      :type="isPwd ? 'password' : 'text'"
      v-model="formData.password"
      placeholder="Password"
      :rules="[
        val => (val !== '' && val.length >= 6) || 'Masukan Password'
      ]">
      <template v-slot:prepend>
        <q-icon name="mdi-lock-outline" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div class="row justify-end">
      <q-btn :label="tab" no-caps color="primary" type="submit"/>
    </div>
  </q-form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['tab'],
  data () {
    return {
      isPwd: true,
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    onSubmit () {
      if (this.tab === 'Login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    }
  }
}
</script>
