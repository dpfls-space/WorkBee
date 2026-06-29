<template>
  <div class="login-root">
    <!-- Left brand pane -->
    <div class="login-left">
      <div class="login-radial" />
      <div class="login-hexfield">
        <svg :width="hfW" :height="hfH" style="display:block;pointer-events:none;opacity:0.07;color:var(--color-cream)">
          <g v-for="(c, i) in hexCells" :key="i" :transform="`translate(${c.x},${c.y})`">
            <polygon :transform="`scale(${HEX_SIZE / 100})`" points="50,2 96,29 96,86 50,113 4,86 4,29" fill="none"
              stroke="currentColor" stroke-width="1.5" />
          </g>
        </svg>
      </div>

      <!-- Logo -->
      <div class="ll-logo">
        <img :src="logoUrl" width="36" height="36" alt="WorkBee" style="object-fit:contain;display:block">
        <div>
          <div class="ll-brand">WorkBee</div>
          <div class="ll-brand-sub">HR · LEAVE MANAGEMENT</div>
        </div>
      </div>

      <!-- Headline block -->
      <div class="ll-headline-block">
        <div class="ll-headline">
          안심하고 맡기는<br>
          <span style="color:var(--color-honey)">인사 · 휴가</span> 관리.
        </div>
        <div class="ll-sub">
          직원 정보부터 연차·반차·공가 사용까지 한 곳에서. <br />
          엑셀로 즉시 내보내고, 회사별로 분리되어 관리됩니다.
        </div>
      </div>

      <!-- Trust bullets -->
      <div class="ll-bullets">
        <div v-for="b in bullets" :key="b.t" class="ll-bullet">
          <span class="ll-bullet-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="12" height="12">
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
          </span>
          <div>
            <div class="ll-bullet-title">{{ b.t }}</div>
            <div class="ll-bullet-sub">{{ b.s }}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="ll-footer">
        <span>© 2026 dpfls-space</span>
        <span>WorkBee v1.0</span>
      </div>
    </div>

    <!-- Right form pane -->
    <div class="login-right">
      <div class="lr-form-area">
        <form @submit.prevent="submit" class="lr-form">
          <div class="lr-company-name">WorkBee</div>
          <div class="lr-desc">관리자 계정으로 로그인하세요.</div>

          <!-- ID -->
          <div class="lr-field">
            <label class="wb-label">아이디</label>
            <div class="wb-input-wrap">
              <span class="wb-icon-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </span>
              <input v-model="loginId" class="wb-input has-left" placeholder="admin" autocomplete="username"
                autofocus />
            </div>
          </div>

          <!-- PW -->
          <div class="lr-field">
            <label class="wb-label">비밀번호</label>
            <div class="wb-input-wrap">
              <span class="wb-icon-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
              <input v-model="loginPw" :type="showPw ? 'text' : 'password'" class="wb-input has-left has-right"
                placeholder="••••••••" autocomplete="current-password" />
              <button type="button" class="wb-pw-toggle" @click="showPw = !showPw" tabindex="-1">
                <svg v-if="showPw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16"
                  height="16">
                  <path
                    d="m3 3 18 18M10.6 6.1A10 10 0 0 1 22 12s-1.5 2.6-4.3 4.6M14 14a3 3 0 0 1-4-4M6.5 7.6C3.7 9.6 2 12 2 12s4 7 10 7c2 0 3.7-.5 5.2-1.4" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16"
                  height="16">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember + forgot -->
          <div class="lr-meta">
            <div class="checkbox-container">
              <input type="checkbox" v-model="remember" id="a" class="screen-reader">
              <div class="label-box">
                <span class="check-icon" aria-hidden="true"></span>
                <label class="checkbox-label" for="a">
                  로그인 상태 유지
                </label>
              </div>
            </div>
            <a href="#" @click.prevent class="lr-forgot">비밀번호 찾기</a>
          </div>

          <!-- Error -->
          <div v-if="loginError" class="lr-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            {{ loginError }}
          </div>

          <button type="submit" class="primary-btn" :disabled="busy"
            style="width:100%;justify-content:center;margin-top:20px;padding:11px;font-size:14px;font-weight:600">
            {{ busy ? '확인 중...' : '로그인' }}
          </button>

          <!-- Demo box -->
          <div class="lr-demo-box">
            <span class="lr-demo-label">데모 계정</span>
            <span class="lr-demo-code">admin</span>
            <span style="color:var(--color-muted)"> / </span>
            <span class="lr-demo-code">workbee</span>
          </div>
        </form>
      </div>

      <!-- Company register strip -->
      <div class="lr-register-strip">
        <div class="lr-register-text">
          <div class="lr-register-title">WorkBee를 처음 쓰시나요?</div>
          회사를 등록하고 최초 관리자를 만들어 시작하세요.
        </div>
        <button class="wb-btn-outline" @click="showRegister = true">
          회사 등록
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Company Registration Modal -->
    <Teleport to="body">
      <template v-if="showRegister">
        <div class="wb-backdrop" @click="showRegister = false" />
        <div class="wb-modal" style="width:560px">
          <div class="wb-modal-header">
            <div class="wb-modal-title">회사 등록</div>
            <button class="wb-modal-close" @click="showRegister = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div class="wb-modal-body">
            <!-- Stepper -->
            <div class="wb-stepper">
              <template v-for="(s, i) in regSteps" :key="s.n">
                <div class="wb-step-item">
                  <div class="wb-step-num" :class="{ active: regStep >= s.n, done: regStep > s.n }">
                    <svg v-if="regStep > s.n" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                      width="12" height="12">
                      <path d="M4 12.5 9.5 18 20 6.5" />
                    </svg>
                    <span v-else>{{ s.n }}</span>
                  </div>
                  <span class="wb-step-label" :class="{ active: regStep >= s.n }">{{ s.l }}</span>
                </div>
                <div v-if="i < regSteps.length - 1" class="wb-step-line" />
              </template>
            </div>

            <!-- Step 1: Company -->
            <div v-if="regStep === 1" class="wb-form-grid">
              <div class="span-2">
                <label class="wb-label">회사명 *</label>
                <input v-model="regC.name" class="wb-input" placeholder="(주) 회사명">
              </div>
              <div>
                <label class="wb-label">사업자등록번호 *</label>
                <input v-model="regC.bizNo" class="wb-input" placeholder="123-45-67890">
              </div>
              <div>
                <label class="wb-label">업종</label>
                <select v-model="regC.industry" class="wb-select">
                  <option v-for="x in INDUSTRIES" :key="x">{{ x }}</option>
                </select>
              </div>
              <div class="span-2">
                <label class="wb-label">직원 규모</label>
                <div style="display:flex;gap:6px">
                  <button v-for="s in SIZES" :key="s" type="button" class="wb-size-btn"
                    :class="{ active: regC.size === s }" @click="regC.size = s">{{ s }}</button>
                </div>
              </div>
              <div class="span-2">
                <label class="wb-label">주소 *</label>
                <input v-model="regC.address" class="wb-input" placeholder="서울시 ...">
              </div>
            </div>

            <!-- Step 2: Primary Admin -->
            <div v-if="regStep === 2" class="wb-form-grid">
              <div class="span-2">
                <div class="wb-notice amber">
                  ⚡
                  <span><b>최초 관리자</b>는 회사의 모든 데이터에 접근할 수 있고, 하위 관리자를 추가/삭제할 수 있습니다.</span>
                </div>
              </div>
              <div>
                <label class="wb-label">이름 *</label>
                <input v-model="regA.name" class="wb-input" placeholder="홍길동">
              </div>
              <div>
                <label class="wb-label">직책</label>
                <input v-model="regA.role" class="wb-input" placeholder="HR 매니저">
              </div>
              <div class="span-2">
                <label class="wb-label">이메일 *</label>
                <input v-model="regA.email" type="email" class="wb-input" placeholder="admin@company.com">
              </div>
              <div class="span-2">
                <label class="wb-label">관리자 아이디 *</label>
                <input v-model="regA.id" class="wb-input" placeholder="영문/숫자 4자 이상">
              </div>
              <div>
                <label class="wb-label">비밀번호 *</label>
                <input v-model="regA.pw" type="password" class="wb-input" placeholder="6자 이상">
              </div>
              <div>
                <label class="wb-label">비밀번호 확인 *</label>
                <input v-model="regA.pw2" type="password" class="wb-input">
              </div>
              <div v-if="regA.pw && regA.pw2 && regA.pw !== regA.pw2" class="span-2"
                style="font-size:12px;color:var(--color-danger)">
                비밀번호가 일치하지 않습니다.
              </div>
            </div>
          </div>
          <div class="wb-modal-footer">
            <button v-if="regStep === 2" type="button" class="wb-btn-ghost" @click="regStep = 1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"
                style="transform:rotate(180deg)">
                <path d="m9 6 6 6-6 6" />
              </svg>
              이전
            </button>
            <div v-if="regError" class="reg-error">{{ regError }}</div>
            <div style="flex:1" />
            <button type="button" class="wb-btn-ghost" @click="showRegister = false">취소</button>
            <button v-if="regStep === 1" type="button" class="wb-btn-primary-sm" :disabled="!step1Valid"
              @click="regStep = 2">다음</button>
            <button v-else type="button" class="wb-btn-primary-sm" :disabled="!step2Valid" @click="submitRegister">등록
              완료</button>
          </div>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import logoUrl from '../assets/image/logo.png'
import { login as apiLogin } from '../api/authApi.js'
import { registerCompany as apiRegisterCompany } from '../api/companyApi.js'

const loginId = ref('')
const loginPw = ref('')
const showPw = ref(false)
const remember = ref(true)
const loginError = ref('')
const busy = ref(false)

const emit = defineEmits(['login'])

async function submit() {
  loginError.value = ''
  busy.value = true
  const res = await apiLogin(loginId.value.trim(), loginPw.value)
  if (res.ok) {
    emit('login', res.user)
  } else {
    loginError.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
    busy.value = false
  }
}

const showRegister = ref(false)
const regStep = ref(1)
const regError = ref('')
const regC = reactive({ name: '', bizNo: '', industry: '소프트웨어', size: '11–50명', address: '' })
const regA = reactive({ name: '', email: '', id: '', pw: '', pw2: '', role: 'HR 매니저' })

const INDUSTRIES = ['소프트웨어', '제조업', '서비스업', '교육', '의료', '금융', '유통', '건설', '기타']
const SIZES = ['1–10명', '11–50명', '51–200명', '201–1000명', '1000명+']

const step1Valid = computed(() => !!(regC.name && regC.bizNo && regC.address))
const step2Valid = computed(() => !!(regA.name && regA.email && regA.id && regA.pw && regA.pw === regA.pw2))

const regSteps = [{ n: 1, l: '회사 정보' }, { n: 2, l: '최초 관리자' }]

async function submitRegister() {
  if (!step2Valid.value) return
  regError.value = ''
  const res = await apiRegisterCompany(
    { name: regC.name, bizNo: regC.bizNo, industry: regC.industry, size: regC.size, address: regC.address },
    { id: regA.id, name: regA.name, email: regA.email, pw: regA.pw, role: regA.role }
  )
  if (!res.ok) {
    regError.value = res.error || '등록 중 오류가 발생했습니다.'
    return
  }
  showRegister.value = false
  regStep.value = 1
  Object.assign(regC, { name: '', bizNo: '', industry: '소프트웨어', size: '11–50명', address: '' })
  Object.assign(regA, { name: '', email: '', id: '', pw: '', pw2: '', role: 'HR 매니저' })
  emit('login', res.user)
}

const HEX_SIZE = 28
const HEX_ROWS = 9
const HEX_COLS = 12
const hexCells = []
for (let r = 0; r < HEX_ROWS; r++) {
  for (let c = 0; c < HEX_COLS; c++) {
    hexCells.push({
      x: c * HEX_SIZE * 1.5,
      y: r * HEX_SIZE * 1.732 + (c % 2 ? HEX_SIZE * 0.866 : 0),
    })
  }
}
const hfW = HEX_COLS * HEX_SIZE * 1.5 + HEX_SIZE
const hfH = HEX_ROWS * HEX_SIZE * 1.732 + HEX_SIZE

const bullets = [
  { t: '직원·휴가 기록 통합 관리', s: '사번부터 잔여 연차까지 한 화면' },
  { t: '연차 / 반차 / 반반차 / 공가 자동 계산', s: '공가는 차감 없이 별도 집계' },
  { t: '다중 관리자 권한 분리', s: '최초 관리자가 하위 관리자 추가' },
]
</script>

<style scoped>
.login-root {
  min-height: 100vh;
  display: flex;
  font-family: var(--font-sans);
}

/* ── Left brand pane ── */
.login-left {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--color-ink);
  color: var(--color-cream);
  display: flex;
  flex-direction: column;
  padding: 44px 56px;
}

.login-radial {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(900px 600px at 110% -10%,
      color-mix(in srgb, var(--color-honey) 28%, transparent) 0%,
      transparent 60%);
}

.login-hexfield {
  position: absolute;
  left: -30px;
  bottom: -40px;
  pointer-events: none;
}

.ll-logo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ll-brand {
  font-size: var(--font-section-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.ll-brand-sub {
  font-size: var(--font-eyebrow);
  color: color-mix(in srgb, var(--color-cream) 65%, transparent);
  letter-spacing: 0.14em;
  font-weight: 500;
  margin-top: 4px;
}

.ll-headline-block {
  position: relative;
  margin-top: 56px;
}

.ll-trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px;
  border: 1px solid color-mix(in srgb, var(--color-cream) 18%, transparent);
  border-radius: 999px;
  font-size: 11.5px;
  color: color-mix(in srgb, var(--color-cream) 75%, transparent);
  letter-spacing: 0.02em;
  margin-bottom: 22px;
}

.ll-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-honey);
  flex-shrink: 0;
}

.ll-headline {
  font-size: var(--font-display);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.025em;
  max-width: 460px;
}

.ll-sub {
  margin-top: 14px;
  font-size: var(--font-body);
  line-height: 1.65;
  max-width: 440px;
  color: color-mix(in srgb, var(--color-cream) 72%, transparent);
}

.ll-bullets {
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ll-bullet {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.ll-bullet-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-honey) 20%, transparent);
  color: var(--color-honey);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ll-bullet-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-cream);
}

.ll-bullet-sub {
  font-size: var(--font-caption);
  color: color-mix(in srgb, var(--color-cream) 55%, transparent);
  margin-top: 1px;
}

.ll-footer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid color-mix(in srgb, var(--color-cream) 12%, transparent);
  font-size: 11.5px;
  color: color-mix(in srgb, var(--color-cream) 50%, transparent);
}

/* ── Right form pane ── */
.login-right {
  width: 480px;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.lr-form-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 32px 16px;
}

.lr-form {
  width: 100%;
  max-width: 360px;
}

.lr-company-name {
  font-size: var(--font-title);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: -0.02em;
  margin-top: 6px;
}

.lr-desc {
  font-size: var(--font-small);
  color: var(--color-muted);
  margin-top: 4px;
  margin-bottom: 26px;
}

.lr-field {
  margin-top: 14px;
}

.lr-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 12.5px;
}

.lr-remember {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-muted);
  cursor: pointer;
}

.lr-forgot {
  color: var(--color-honey-strong);
  text-decoration: none;
  font-weight: 500;
}

.lr-forgot:hover {
  text-decoration: underline;
}

.lr-error {
  margin-top: 14px;
  padding: 10px 12px;
  background: var(--color-danger-bg);
  color: var(--color-danger-fg);
  border-radius: 8px;
  font-size: 12.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lr-demo-box {
  margin-top: 18px;
  padding: 10px 12px;
  background: var(--color-cream);
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  font-size: 11.5px;
  color: var(--color-muted);
  line-height: 1.55;
}

.lr-demo-label {
  color: var(--color-ink);
  font-weight: 600;
  margin-right: 4px;
}

.lr-demo-code {
  font-family: var(--font-num);
  color: var(--color-ink);
  font-size: var(--font-caption);
}

.lr-register-strip {
  border-top: 1px solid var(--color-border);
  padding: 16px 32px;
  background: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.lr-register-text {
  font-size: var(--font-caption);
  color: var(--color-muted);
  line-height: 1.5;
}

.lr-register-title {
  color: var(--color-ink);
  font-weight: 600;
  font-size: 12.5px;
}

/* ── Input primitives ── */
.wb-label {
  display: block;
  font-size: var(--font-caption);
  color: var(--color-muted);
  font-weight: 500;
  margin-bottom: 6px;
}

.wb-input-wrap {
  position: relative;
}

.wb-icon-left {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-muted);
  pointer-events: none;
  display: flex;
}

.wb-pw-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: var(--color-muted);
  display: flex;
  align-items: center;
}

.wb-pw-toggle:hover {
  color: var(--color-ink);
}

.wb-input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: var(--font-small);
  color: var(--color-ink);
  font-family: inherit;
  width: 100%;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.wb-input:focus {
  border-color: var(--color-honey);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-honey) 15%, transparent);
}

.wb-input.has-left {
  padding-left: 36px;
}

.wb-input.has-right {
  padding-right: 40px;
}

.wb-select {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 9px 28px 9px 10px;
  font-size: var(--font-small);
  color: var(--color-ink);
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  width: 100%;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
}

.wb-select:focus {
  border-color: var(--color-honey);
  outline: none;
}

.wb-btn-primary-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-ink);
  color: var(--color-cream);
  border: 1px solid var(--color-ink);
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
}

.wb-btn-primary-sm:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.wb-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-surface);
  color: var(--color-ink);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
}

.wb-btn-ghost:hover {
  background: var(--color-cream);
}

.wb-btn-outline {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--color-ink);
  border-radius: 8px;
  color: var(--color-ink);
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  font-family: var(--font-sans);
}

.wb-btn-outline:hover {
  background: var(--color-cream);
}

/* ── Modal ── */
.wb-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 12, .32);
  z-index: 100;
  animation: wb-fade .15s ease;
}

.wb-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 92vw;
  max-height: 88vh;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(20, 18, 12, .18);
  z-index: 101;
  display: flex;
  flex-direction: column;
  animation: wb-pop .18s cubic-bezier(.2, .8, .2, 1);
}

.wb-modal-header {
  padding: 18px 22px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wb-modal-title {
  font-size: var(--font-section-title);
  font-weight: 600;
  color: var(--color-ink);
}

.wb-modal-close {
  all: unset;
  cursor: pointer;
  color: var(--color-muted);
  padding: 4px;
  display: flex;
}

.wb-modal-close:hover {
  color: var(--color-ink);
}

.wb-modal-body {
  padding: 22px;
  overflow: auto;
  flex: 1;
}

.wb-modal-footer {
  padding: 14px 22px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Stepper ── */
.wb-step-item {
  display: flex;
  align-items: center;
  gap: 9px;
}

.wb-stepper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
}

.wb-step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-caption);
  font-family: var(--font-num);
  font-weight: 600;
  background: var(--color-cream);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.wb-step-num.active,
.wb-step-num.done {
  background: var(--color-ink);
  color: var(--color-cream);
  border-color: var(--color-ink);
}

.wb-step-label {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--color-muted);
  white-space: nowrap;
}

.wb-step-label.active {
  font-weight: 600;
  color: var(--color-ink);
}

.wb-step-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

/* ── Form grid ── */
.wb-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.wb-form-grid .span-2 {
  grid-column: span 2;
}

.wb-size-btn {
  flex: 1;
  padding: 8px 6px;
  border-radius: 8px;
  cursor: pointer;
  background: var(--color-surface);
  color: var(--color-ink);
  border: 1px solid var(--color-border);
  font-size: var(--font-caption);
  font-weight: 500;
  font-family: inherit;
}

.wb-size-btn.active {
  background: var(--color-ink);
  color: var(--color-cream);
  border-color: var(--color-ink);
}

.wb-notice {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12.5px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.wb-notice.amber {
  background: var(--color-amber-bg);
  color: var(--color-amber-fg);
}

.reg-error {
  font-size: 12px;
  color: var(--color-danger);
}
</style>
