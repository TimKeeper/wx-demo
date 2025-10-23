<template>
  <div class="reset-password-page">
    <div class="reset-password-container">
      <div class="header">
        <h1>{{ t('resetPassword') }}</h1>
        <p>Enter your new password</p>
      </div>

      <div v-if="success" class="success-message">
        Password reset successful! Redirecting to login...
      </div>

      <form @submit.prevent="handleReset" class="form">
        <div class="form-group">
          <label>New {{ t('password') }}</label>
          <input 
            v-model="password" 
            type="password" 
            class="input" 
            required
            minlength="6"
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            class="input" 
            required
            minlength="6"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? t('loading') : t('resetPassword') }}
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
import { useRouter } from 'vue-router'
import { useLanguageStore } from '../stores/language'

const router = useRouter()
const languageStore = useLanguageStore()
const { t } = languageStore

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const success = ref(false)

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  loading.value = true
  
  setTimeout(() => {
    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }, 500)
}
</script>

<style scoped>
.reset-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.reset-password-container {
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

