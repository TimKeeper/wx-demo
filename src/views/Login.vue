<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>万悉科技</h1>
        <p>{{ t('login') }}</p>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>{{ t('email') }}</label>
          <input 
            v-model="email" 
            type="email" 
            class="input" 
            required
            placeholder="demo@example.com"
          />
        </div>

        <div class="form-group">
          <label>{{ t('password') }}</label>
          <input 
            v-model="password" 
            type="password" 
            class="input" 
            required
            placeholder="password123"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? t('loading') : t('login') }}
        </button>

        <div class="login-footer">
          <router-link to="/forgot-password" class="link">
            {{ t('forgotPassword') }}
          </router-link>
        </div>
      </form>

      <div class="demo-info">
        <h3>Demo Accounts:</h3>
        <p><strong>Free User:</strong> demo@example.com / password123</p>
        <p><strong>Premium User:</strong> premium@example.com / password123</p>
      </div>

      <div class="lang-switch">
        <button @click="languageStore.toggleLanguage()" class="lang-btn">
          {{ languageStore.currentLang === 'en' ? '切换到中文' : 'Switch to English' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'

const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()

const { t } = languageStore

const email = ref('demo@example.com')
const password = ref('password123')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = t('loginError')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  languageStore.loadLanguage()
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.login-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.btn-full {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
}

.login-footer {
  text-align: center;
}

.link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
}

.link:hover {
  text-decoration: underline;
}

.demo-info {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.demo-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.demo-info p {
  margin: 0.25rem 0;
  color: var(--text-secondary);
}

.lang-switch {
  margin-top: 1.5rem;
  text-align: center;
}

.lang-btn {
  background: transparent;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
}

.lang-btn:hover {
  text-decoration: underline;
}
</style>

