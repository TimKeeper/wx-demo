import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProductsStore } from './products'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const unreadCount = ref(0)
  const emailNotificationsEnabled = ref(true)

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    }
    notifications.value.unshift(newNotification)
    unreadCount.value++
    
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification('万悉科技', {
        body: notification.message,
        icon: '/logo.png'
      })
    }
    
    saveToLocalStorage()
  }

  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && !notification.read) {
      notification.read = true
      unreadCount.value--
      saveToLocalStorage()
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
    unreadCount.value = 0
    saveToLocalStorage()
  }

  const removeNotification = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && !notification.read) {
      unreadCount.value--
    }
    notifications.value = notifications.value.filter(n => n.id !== id)
    saveToLocalStorage()
  }

  const clearAll = () => {
    notifications.value = []
    unreadCount.value = 0
    saveToLocalStorage()
  }

  const checkNewProducts = () => {
    const productsStore = useProductsStore()
    const hotProducts = productsStore.hotProducts
    
    // Check for new hot products released in the last 24 hours
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    
    hotProducts.forEach(product => {
      const releaseDate = new Date(product.releaseDate)
      if (releaseDate > oneDayAgo) {
        const exists = notifications.value.find(n => 
          n.type === 'hot_product' && n.productId === product.id
        )
        
        if (!exists) {
          addNotification({
            type: 'hot_product',
            productId: product.id,
            title: 'Hot Product Alert!',
            message: `${product.brand} released a hot product: ${product.name}`,
            data: {
              brand: product.brand,
              productName: product.name,
              hotScore: product.hotScore
            }
          })
        }
      }
    })
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  const toggleEmailNotifications = () => {
    emailNotificationsEnabled.value = !emailNotificationsEnabled.value
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications.value))
    localStorage.setItem('unreadCount', unreadCount.value.toString())
    localStorage.setItem('emailNotifications', emailNotificationsEnabled.value.toString())
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('notifications')
    if (stored) {
      notifications.value = JSON.parse(stored)
      unreadCount.value = notifications.value.filter(n => !n.read).length
    }
    
    const emailPref = localStorage.getItem('emailNotifications')
    if (emailPref !== null) {
      emailNotificationsEnabled.value = emailPref === 'true'
    }
  }

  return {
    notifications,
    unreadCount,
    emailNotificationsEnabled,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    checkNewProducts,
    requestNotificationPermission,
    toggleEmailNotifications,
    loadFromLocalStorage
  }
})

