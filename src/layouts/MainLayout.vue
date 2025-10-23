<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>万悉科技</h1>
        </div>
        
        <nav class="nav">
          <router-link to="/" class="nav-link">
            {{ t('dashboard') }}
          </router-link>
          <router-link to="/watchlist" class="nav-link">
            {{ t('watchlist') }}
          </router-link>
          <router-link v-if="!authStore.isPremium" to="/upgrade" class="nav-link upgrade-link">
            {{ t('upgrade') }}
          </router-link>
        </nav>

        <div class="header-actions">
          <!-- Language Toggle -->
          <button @click="languageStore.toggleLanguage()" class="lang-toggle">
            {{ languageStore.currentLang === 'en' ? '中文' : 'EN' }}
          </button>

          <!-- Notifications -->
          <div class="notifications-wrapper">
            <button @click="showNotifications = !showNotifications" class="notification-btn">
              <span class="notification-icon">🔔</span>
              <span v-if="notificationStore.unreadCount > 0" class="notification-badge">
                {{ notificationStore.unreadCount }}
              </span>
            </button>

            <div v-if="showNotifications" class="notifications-dropdown">
              <div class="notifications-header">
                <h3>{{ t('notifications') }}</h3>
                <button @click="notificationStore.markAllAsRead()" class="mark-read-btn">
                  {{ t('markAllRead') }}
                </button>
              </div>
              <div class="notifications-list">
                <div 
                  v-for="notification in notificationStore.notifications.slice(0, 5)" 
                  :key="notification.id"
                  class="notification-item"
                  :class="{ unread: !notification.read }"
                  @click="notificationStore.markAsRead(notification.id)"
                >
                  <div class="notification-title">{{ notification.title }}</div>
                  <div class="notification-message">{{ notification.message }}</div>
                  <div class="notification-time">
                    {{ formatTime(notification.timestamp) }}
                  </div>
                </div>
                <div v-if="notificationStore.notifications.length === 0" class="no-notifications">
                  {{ t('noNotifications') }}
                </div>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="user-menu">
            <span class="user-name">{{ authStore.user?.name }}</span>
            <span v-if="authStore.isPremium" class="badge badge-warning">Premium</span>
            <button @click="handleLogout" class="btn-logout">{{ t('logout') }}</button>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notification'
import { useLanguageStore } from '../stores/language'
import { useWatchlistStore } from '../stores/watchlist'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const languageStore = useLanguageStore()
const watchlistStore = useWatchlistStore()
const showNotifications = ref(false)

const { t } = languageStore

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000 / 60) // minutes

  if (diff < 60) {
    return `${diff}m ago`
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)}h ago`
  } else {
    return `${Math.floor(diff / 1440)}d ago`
  }
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.notifications-wrapper')) {
    showNotifications.value = false
  }
}

onMounted(() => {
  authStore.initAuth()
  languageStore.loadLanguage()
  notificationStore.loadFromLocalStorage()
  watchlistStore.loadFromLocalStorage()
  notificationStore.requestNotificationPermission()
  
  // Check for new products every 5 minutes
  const interval = setInterval(() => {
    notificationStore.checkNewProducts()
  }, 5 * 60 * 1000)
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    clearInterval(interval)
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: white;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

.nav {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  background: var(--bg-secondary);
}

.upgrade-link {
  color: var(--warning-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-toggle {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.lang-toggle:hover {
  background: var(--bg-secondary);
}

.notifications-wrapper {
  position: relative;
}

.notification-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.notification-btn:hover {
  background: var(--bg-secondary);
}

.notification-icon {
  display: block;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
}

.notifications-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 400px;
  background: white;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notifications-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.mark-read-btn {
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notifications-list {
  overflow-y: auto;
  max-height: 400px;
}

.notification-item {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.2s;
}

.notification-item:hover {
  background: var(--bg-secondary);
}

.notification-item.unread {
  background: #eff6ff;
}

.notification-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.notification-message {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.no-notifications {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
}

.btn-logout {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: var(--bg-secondary);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>

