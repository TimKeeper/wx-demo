<template>
  <div class="forgot-password-page">
    <div class="forgot-password-container">
      <div class="header">
        <h1>{{ t('resetPassword') }}</h1>
        <p>Enter your email to receive a password reset link</p>
      </div>

      <div v-if="success" class="success-message">
        {{ t('resetEmailSent') }}
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleReset" class="form">
        <div class="form-group">
          <label>{{ t('email') }}</label>
          <input 
            v-model="email" 
            type="email" 
            class="input" 
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? t('loading') : t('sendResetLink') }}
        </button>

        <div class="footer">
          <router-link to="/login" class="link">
            {{ t('backToLogin') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleReset = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    await authStore.resetPassword(email.value)
    success.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.forgot-password-container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 450px;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.header p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.success-message {
  background: #dcfce7;
  color: #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.form {
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

.footer {
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
</style>

