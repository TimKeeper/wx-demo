<template>
  <div class="upgrade">
    <div class="upgrade-header">
      <h1>{{ t('upgrade') }}</h1>
      <p v-if="authStore.isPremium" class="current-plan-info">
        {{ t('currentPlan') }}: <span class="badge badge-warning">{{ t('premiumPlan') }}</span>
      </p>
    </div>

    <div class="plans-grid">
      <!-- Free Plan -->
      <div class="plan-card" :class="{ active: !authStore.isPremium }">
        <div class="plan-header">
          <h2>{{ t('freePlan') }}</h2>
          <div class="plan-price">
            <span class="price">$0</span>
            <span class="period">{{ t('month') }}</span>
          </div>
        </div>

        <div class="plan-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('viewLimit') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>Basic {{ t('filters') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('watchlist') }}</span>
          </div>
          <div class="feature disabled">
            <span class="feature-icon">✗</span>
            <span>{{ t('emailAlerts') }}</span>
          </div>
          <div class="feature disabled">
            <span class="feature-icon">✗</span>
            <span>{{ t('dataExport') }}</span>
          </div>
          <div class="feature disabled">
            <span class="feature-icon">✗</span>
            <span>{{ t('prioritySupport') }}</span>
          </div>
        </div>

        <button 
          v-if="!authStore.isPremium"
          class="btn btn-outline btn-full" 
          disabled
        >
          Current Plan
        </button>
      </div>

      <!-- Premium Plan -->
      <div class="plan-card premium" :class="{ active: authStore.isPremium }">
        <div class="popular-badge">Most Popular</div>
        
        <div class="plan-header">
          <h2>{{ t('premiumPlan') }}</h2>
          <div class="plan-price">
            <span class="price">$29</span>
            <span class="period">/ {{ t('month') }}</span>
          </div>
        </div>

        <div class="plan-features">
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('unlimitedViews') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('advancedFilters') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>Unlimited {{ t('watchlist') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('emailAlerts') }}</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('dataExport') }} (JSON/CSV)</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✓</span>
            <span>{{ t('prioritySupport') }}</span>
          </div>
        </div>

        <button 
          v-if="!authStore.isPremium"
          @click="handleUpgrade" 
          class="btn btn-primary btn-full"
        >
          {{ t('upgradeToPremium') }}
        </button>
        <button 
          v-else
          class="btn btn-success btn-full" 
          disabled
        >
          ✓ Current Plan
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal success-modal" @click.stop>
        <div class="success-icon">🎉</div>
        <h2>{{ t('upgradeSucess') }}</h2>
        <p>You now have unlimited access to all premium features.</p>
        <button @click="closeSuccessModal" class="btn btn-primary">
          {{ t('close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'

const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const showSuccessModal = ref(false)

const handleUpgrade = () => {
  // In a real app, this would process payment
  authStore.upgradeToPremium()
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push('/')
}
</script>

<style scoped>
.upgrade {
  padding-bottom: 2rem;
}

.upgrade-header {
  text-align: center;
  margin-bottom: 3rem;
}

.upgrade-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.current-plan-info {
  font-size: 1.125rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.plan-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  border: 2px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
  position: relative;
}

.plan-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.plan-card.active {
  border-color: var(--primary-color);
}

.plan-card.premium {
  border-color: var(--warning-color);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--warning-color);
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.plan-header h2 {
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.period {
  font-size: 1rem;
  color: var(--text-secondary);
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
}

.feature-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--success-color);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.feature.disabled {
  color: var(--text-secondary);
  opacity: 0.6;
}

.feature.disabled .feature-icon {
  background: var(--secondary-color);
}

.btn-full {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-success {
  background: var(--success-color);
  color: white;
  cursor: not-allowed;
}

.success-modal {
  text-align: center;
  max-width: 400px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.success-modal h2 {
  margin: 0 0 1rem 0;
  color: var(--success-color);
}

.success-modal p {
  margin: 0 0 2rem 0;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style>

