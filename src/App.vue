<template>
  <div>
    <LoginView v-if="!user" @login="user = $event" />

    <div v-else>
      <Dashboard :user="user" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginView from './views/LoginView.vue'
import Dashboard from './views/Dashboard.vue'
const user = ref(null)
</script>
