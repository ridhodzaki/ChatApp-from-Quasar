<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('store', ['handleAuthStateChanged'])
  },
  mounted () {
    this.handleAuthStateChanged()
  }
}
</script>
