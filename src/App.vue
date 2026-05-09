<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>WorkBee</h2>

      <button @click="menu = 'dashboard'">대시보드</button>
      <button @click="menu = 'employees'">사원관리</button>
      <button @click="menu = 'attendance'">근태관리</button>
    </aside>

    <main class="content">
      <Dashboard v-if="menu === 'dashboard'" />
      <EmployeeView v-if="menu === 'employees'" />
      <AttendanceView v-if="menu === 'attendance'" />
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue';

import Dashboard from './views/Dashboard.vue';
import EmployeeView from './views/EmployeeView.vue';
import AttendanceView from './views/AttendanceView.vue';

const menu = ref('dashboard');
</script>

<style>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e1e1e;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
