<template>
  <div>
    <LoginView v-if="!user" @login="user = $event" />
    
    <div v-else style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);font-family:var(--font-sans)">
      <div style="text-align:center">
        <div style="font-size:32px;margin-bottom:8px">🐝</div>
        <div style="font-size:18px;font-weight:700;color:var(--ink)">{{ user.name }}님, 환영합니다.</div>
        <div style="font-size:13px;color:var(--muted);margin-top:4px">대시보드 구현 예정</div>
        <button @click="user = null" style="margin-top:20px;padding:8px 16px;border:1px solid var(--rule);border-radius:8px;background:var(--surface);color:var(--muted);cursor:pointer;font-family:var(--font-sans);font-size:13px">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginView from './views/LoginView.vue'

const user = ref(null)
</script>
