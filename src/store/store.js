/* eslint-disable no-empty-pattern */
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import Swal from 'sweetalert2'

// eslint-disable-next-line no-unused-vars
let messagesRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}
const mutations = {
  setUserDetails (state, paylaod) {
    state.userDetails = paylaod
  },
  addUser (state, payload) {
    state.users[payload.userId] = payload.userDetails
  },
  updateUser (state, payload) {
    // console.log('payload update', payload)
    Object.assign(state.users[payload.userId], payload.userDetails)
    // state.users[payload.userId] = payload.userDetails
  },
  addMessage (state, payload) {
    state.messages[payload.messageId] = payload.messageDetails
  },
  clearMessages (state) {
    state.messages = {}
  }
}
const actions = {
  registerUser ({}, payload) {
    // console.log('payload:', payload)
    const auth = firebaseAuth.getAuth()
    firebaseAuth.createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then(res => {
        const db = firebaseDb.getDatabase()
        const userId = res.user.uid
        firebaseDb.set(firebaseDb.ref(db, 'users/' + userId), {
          name: payload.name,
          email: payload.email,
          online: true
        })
        this.$router.replace('/')
        Swal.fire(
          'Success',
          'login successfully',
          'success'
        )
      }).catch((error) => {
        // console.log(error)
        // console.log(error.code)
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire(
            'Error',
            'Email telah terdaftar',
            'error'
          )
        }
      })
  },
  loginUser ({}, payload) {
    // // console.log('payload:', payload)
    const auth = firebaseAuth.getAuth()
    firebaseAuth.signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential)
        // const user = userCredential.user
        // console.log(user)
        Swal.fire(
          'Success',
          'login successfully',
          'success'
        )
        this.$router.replace('/')
      })
      .catch((error) => {
        // console.log(error)
        const errorCode = error.code
        // const errorMessage = error.message
        if (errorCode === 'auth/invalid-login-credentials') {
          Swal.fire(
            'Error',
            'Email tidak terdaftar / password anda salah',
            'error'
          )
        }
        // console.log(`Error code: ${errorCode}, message: ${errorMessage}`)
      })
  },
  async logoutUser () {
    // firebaseAuth.signOut()
    await Swal.fire({
      title: 'Warning !',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes'
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        const auth = firebaseAuth.getAuth()
        firebaseAuth.signOut(auth)
          .then(() => {
            console.log('berhasil keluar')
          }).catch(() => {
            console.log('gagal keluar')
          })
      }
    })
  },
  async handleAuthStateChanged ({ commit, dispatch, state }) {
    // console.log('handleAuthStateChanged')
    const auth = firebaseAuth.getAuth()
    await firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('user', user)
        const uid = user.uid
        const db = firebaseDb.ref(firebaseDb.getDatabase())
        this.$router.replace('/')
        firebaseDb.get(firebaseDb.child(db, `users/${uid}`))
          .then((snapshot) => {
            // // console.log('snapshot', snapshot)
            const userDetail = snapshot.val()
            // console.log('userDetail', userDetail)
            commit('setUserDetails', {
              name: userDetail.name,
              email: userDetail.email,
              userId: uid
            })
          })
          .catch((err) => {
            console.log(err)
          })
        dispatch('firebaseUpdateUser', {
          userId: uid,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
      } else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    })
  },
  firebaseUpdateUser ({}, payload) {
    if (payload.userId && payload !== null) {
      const db = firebaseDb.getDatabase()

      // Path ke data pengguna yang ingin diupdate
      const userPath = 'users/' + payload.userId

      // firebaseDb.update(firebaseDb.child(firebaseDb.ref(db), userPath), payload.updates)
      firebaseDb.update(firebaseDb.child(firebaseDb.ref(db), userPath), payload.updates)
        .then(() => {
          // console.log('Data pengguna berhasil diupdate')
        })
        .catch((error) => {
          console.error('Gagal mengupdate data pengguna:', error)
        })
    }
  },
  firebaseGetUsers ({ commit }) {
    // Inisialisasi database
    const db = firebaseDb.getDatabase()

    // Path ke data pengguna
    const userPath = 'users'

    // Mendengarkan peristiwa child_added
    firebaseDb.onChildAdded(firebaseDb.ref(db, userPath), (snapshot) => {
      // console.log('snapshot get user:', snapshot)
      const userDetails = snapshot.val()
      const userId = snapshot.key
      // console.log(userDetails)
      commit('addUser', {
        userId,
        userDetails
      })
    })
    firebaseDb.onChildChanged(firebaseDb.ref(db, userPath), (snapshot) => {
      // console.log('snapshot update user:', snapshot)
      const userDetails = snapshot.val()
      const userId = snapshot.key
      // console.log(userDetails)
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
  firebaseGetMessage ({ commit, state }, otherUserId) {
    // console.log('otherUserId', otherUserId)
    const db = firebaseDb.getDatabase()
    const id = state.userDetails.userId
    // console.log(id)
    messagesRef = firebaseDb.ref(db, `chats/${id}/${otherUserId}`)
    // console.log('messageRef', messagesRef)
    firebaseDb.onChildAdded(messagesRef, (snapshot) => {
      // console.log('snapshot get messages:', snapshot)
      const messageDetails = snapshot.val()
      const messageId = snapshot.key
      // console.log(`messageId: ${messageId}`)
      // console.log(`messageDetails: ${messageDetails}`)
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseStopGettingMessages ({ commit }) {
    // console.log('stop getting messages')
    if (messagesRef) {
      // messagesRef = null
      firebaseDb.off(messagesRef)
      commit('clearMessages')
    }
  },
  firebaseSendMessage ({}, payload) {
    console.log('payload', payload)
    const db = firebaseDb.getDatabase()
    firebaseDb.push(firebaseDb.ref(db, `chats/${state.userDetails.userId}/${payload.otherUserId}`), payload.message)
    payload.message.from = 'them'
    firebaseDb.push(firebaseDb.ref(db, `chats/${payload.otherUserId}/${state.userDetails.userId}`), payload.message)
    // firebaseDb.ref(db, `chats/${state.userDetails.userId}/${payload.otherUserId}`).push(payload.message)
    // payload.message.from = 'them'
    // firebaseDb.ref(db, `chats/${payload.otherUserId}/${state.userDetails.userId}`).push(payload.message)
  }
}
const getters = {
  users: state => {
    // console.log(state.users)
    const userFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        userFiltered[key] = state.users[key]
      }
    })
    // return state.users
    return userFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
