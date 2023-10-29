<template>
  <q-page class="bg-secondary text-grey-4 border">
    <div class="row border">
      <div class="col-md-5 col-sm-6 col-xs-12 bg-primary q-pa-md" style="border-radius: 10px 0px 0px 10px">
        <q-input class="q-mx-md bg-grey-15" placeholder="Search" outlined dark dense>
          <template v-slot:prepend>
          <q-icon name="eva-search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <!-- isObjectEmpty(users) -->
        <q-scroll-area class="q-mt-sm" :style="`height: ${this.$q.screen.height - 130}px`">
          <q-list v-if="isObjectEmpty(users)">
            <template
              v-for="(user, key) in users"
              :key="key">
              <q-item
                exact
                @click="selectUser(key, user)"
                :active="key === selectedKey"
                class="item-user"
                active-class="item-user-active"
                clickable
                v-ripple>
                <q-item-section avatar>
                  <q-avatar rounded color="secondary" text-color="white">
                    {{ user.name[0].toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-body1">{{ user.name }}</q-item-section>
                <q-item-section
                  :class="`${user.online ? 'text-accent' : ''}`"
                  side>{{ user.online ? 'Online' : 'Offline' }}</q-item-section>
              </q-item>
            </template>
          </q-list>
          <div v-else class=" flex flex-center column" :style="`height: ${this.$q.screen.height - 150}px`">
            <span>Belum ada user yang mendaftar selain anda</span>
          </div>
        </q-scroll-area>
      </div>
      <div v-if="!this.$q.screen.xs || !this.$q.screen.sm" class="col-md-6 col-sm-6 bg-primary q-pa-md" style="border-radius: 0px 10px 10px 0px">
        <div class="column" v-if="selectedUser">
          <div class="row items-center justify-between">
            <div class="col-auto column">
              <span class="text-body1">{{ selectedUser?.name }}</span>
              <span style="font-size: 12px" :class="`${selectedUser?.online ? 'text-accent' : ''}`">{{ selectedUser?.online ? 'Online' : 'Offline' }}</span>
            </div>
            <div class="col-auto">
              <div class="row">
                <q-btn icon="eva-phone-outline" flat />
                <q-btn-dropdown
                  color="white"
                  no-caps
                  flat
                  dense
                  no-icon-animation
                  dropdown-icon="mdi-dots-vertical"
                >
                  <q-list>
                    <q-item dense style="width: 100%" clickable v-close-popup>
                      <q-item-section avatar>
                        <q-avatar icon="eva-person-outline" flat dense/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Detail User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item dense style="width: 100%" clickable v-close-popup>
                      <q-item-section avatar>
                        <q-avatar icon="eva-slash-outline" flat dense/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Block User</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
          <q-scroll-area
            ref="scrollArea"
            class="q-pa-sm column justify-end"
            :style="`height: ${this.$q.screen.height - 180}px`">
            <template
              v-for="(message, key) in messages"
              :key="key">
              <q-chat-message
                :name="message.from === 'me' ? userDetails.name : selectedUser.name"
                :text="[message.text]"
                :sent="message.from === 'me' ? true : false"
              />
            </template>
          </q-scroll-area>
          <div class="q-pa-xs q-mt-xs">
            <q-input @keyup.enter="onSubmit" dark outlined v-model="message" placeholder="Insert Message" dense>
              <!-- <template v-slot:before>
                <q-avatar>
                  <q-icon name="mdi-emoticon-outline" size="sm"/>
                </q-avatar>
              </template> -->
              <!-- <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                <q-icon name="schedule" />
              </template> -->
              <template v-slot:after>
                <q-btn @click="onSubmit" round dense flat icon="send" />
              </template>
            </q-input>
          </div>
        </div>
        <div v-else class="flex flex-center column q-gutter-xs" :style="`height: ${this.$q.screen.height - 100}px`">
          <span class="text-h3">ChatApp</span>
          <q-separator inset color="white" size="sm" style="height: 1px; width: 70%"/>
          <span>Application for sending messages easily</span>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="showChat"
      maximized
      transition-show="slide-left"
      transition-hide="slide-right">
      <div class="column bg-primary text-grey-4 q-pa-md">
        <div class="row items-center justify-between">
          <div class="col-auto column">
            <div class="row">
              <div class="col-auto">
                <q-btn icon="eva-arrow-back-outline" v-close-popup flat dense/>
              </div>
              <div class="col-auto column q-ml-md">
                <span class="text-body1">{{ selectedUser.name }}</span>
                <span style="font-size: 12px" :class="`${selectedUser?.online ? 'text-accent' : ''}`">{{ selectedUser?.online ? 'Online' : 'Offline' }}</span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row">
              <q-btn icon="eva-phone-outline" flat />
              <q-btn-dropdown
                color="white"
                no-caps
                flat
                dense
                no-icon-animation
                dropdown-icon="mdi-dots-vertical"
              >
                <q-list>
                  <q-item dense style="width: 100%" clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar icon="eva-person-outline" flat dense/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Detail User</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item dense style="width: 100%" clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar icon="eva-slash-outline" flat dense/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Block User</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
        <q-scroll-area
          ref="scrollArea"
          class="q-pa-sm column justify-end"
          :style="`height: ${this.$q.screen.height - 140}px`">
          <template
              v-for="(message, i) in messages"
              :key="i">
              <q-chat-message
                :name="message.from === 'me' ? userDetails.name : selectedUser.name"
                :text="[message.text]"
                :sent="message.from === 'me' ? true : false"
              />
          </template>
        </q-scroll-area>
        <div class="q-pa-xs q-mt-xs">
          <q-input @keyup.enter="onSubmit" dark outlined v-model="message" placeholder="Insert Message" dense>
            <!-- <template v-slot:before>
              <q-avatar>
                <q-icon name="mdi-emoticon-outline" size="sm"/>
              </q-avatar>
            </template> -->
            <!-- <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
              <q-icon name="schedule" />
            </template> -->
            <template v-slot:after>
              <q-btn @click="onSubmit" round dense flat icon="send" />
            </template>
          </q-input>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      showChat: false,
      selectedKey: '',
      selectedUser: null,
      message: ''
    }
  },
  created () {
    this.$nextTick(() => {
    })
  },
  computed: {
    ...mapGetters('store', ['users']),
    ...mapState('store', ['messages', 'userDetails'])
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessage', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    selectUser (key, user) {
      this.firebaseStopGettingMessages()
      this.selectedKey = key
      this.selectedUser = user
      this.firebaseGetMessage(this.selectedKey)
      this.setScroll()
      if (this.$q.screen.xs) {
        this.showChat = true
      }
    },
    setScroll () {
      setTimeout(() => {
        const scrollArea = this.$refs.scrollArea
        console.log(scrollArea)
        scrollArea.setScrollPercentage('vertical', 2)
        // window.scrollTo(0, scrollArea.height)
      }, 500)
    },
    onSubmit () {
      if (this.message.length > 0) {
        this.firebaseSendMessage({
          message: {
            text: this.message,
            from: 'me'
          },
          otherUserId: this.selectedKey
        })
        this.message = ''
        this.setScroll()
      }
    },
    isObjectEmpty (obj) {
      // Menghitung jumlah properti dalam objek
      const numberOfProps = Object.keys(obj).length
      // Jika jumlah properti adalah 0, maka objek dianggap kosong
      return numberOfProps !== 0
    }
  }
}
</script>
