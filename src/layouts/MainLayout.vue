<template>
  <q-layout view="hHh lpR lff">
    <q-header class="bg-secondary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="show"
        />

        <q-toolbar-title>
          Chat App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-secondary"
      v-model="leftDrawerOpen"
      :width="100"
      :show-if-above="this.$q.screen.xs ? false : true"

    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <MenuItem
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <div class="absolute-bottom">
          <q-item
            clickable
            exact
            class="text-red item"
            @click="logoutUser"
          >
            <q-item-section
              class="flex flex-center"
            >
              <q-icon name="eva-person" size="xs" />
              <q-item-label class="q-mt-sm">Logout</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-secondary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuItem from 'components/MenuItem.vue'
import Swal from 'sweetalert2'

const linksList = [
  {
    title: 'All Chats',
    icon: 'eva-message-circle-outline',
    link: ''
  },
  {
    title: 'Work',
    icon: 'eva-folder-outline',
    link: 'work'
  },
  {
    title: 'Meet',
    icon: 'eva-folder-outline',
    link: 'meet'
  },
  {
    title: 'Calendar',
    icon: 'eva-calendar-outline',
    link: 'calendar',
    isLine: true
  },
  {
    title: 'Rating',
    icon: 'eva-bar-chart-outline',
    link: 'rating'
  },
  {
    title: 'Saved',
    icon: 'eva-bookmark-outline',
    link: 'saved'
  }
]

export default {

  components: {
    MenuItem
  },

  data () {
    return {
      essentialLinks: linksList,
      leftDrawerOpen: false
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser']),
    async logout () {
      this.leftDrawerOpen = false
      await Swal.fire({
        title: 'Warning !',
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes'
      }).then(function (isConfirm) {
        if (isConfirm) {
          this.logoutUser()
        }
      })
    },
    show () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  }
}
</script>
