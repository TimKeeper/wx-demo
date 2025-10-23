import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  
  // Mock users database
  const users = ref([
    { 
      email: 'demo@example.com', 
      password: 'password123',
      name: 'Demo User',
      plan: 'free' // free or premium
    },
    { 
      email: 'premium@example.com', 
      password: 'password123',
      name: 'Premium User',
      plan: 'premium'
    }
  ])

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.value.find(
          u => u.email === email && u.password === password
        )
        
        if (foundUser) {
          user.value = {
            email: foundUser.email,
            name: foundUser.name,
            plan: foundUser.plan
          }
          localStorage.setItem('user', JSON.stringify(user.value))
          resolve(user.value)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const register = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.value.find(u => u.email === email)
        if (existingUser) {
          reject(new Error('User already exists'))
        } else {
          const newUser = { email, password, name, plan: 'free' }
          users.value.push(newUser)
          user.value = { email, name, plan: 'free' }
          localStorage.setItem('user', JSON.stringify(user.value))
          resolve(user.value)
        }
      }, 500)
    })
  }

  const resetPassword = async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.value.find(u => u.email === email)
        if (foundUser) {
          // In real app, send reset email
          resolve({ message: 'Password reset email sent' })
        } else {
          reject(new Error('Email not found'))
        }
      }, 500)
    })
  }

  const upgradeToPremium = () => {
    if (user.value) {
      user.value.plan = 'premium'
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const isPremium = computed(() => user.value?.plan === 'premium')

  // Initialize from localStorage
  const initAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    isPremium,
    login,
    logout,
    register,
    resetPassword,
    upgradeToPremium,
    initAuth
  }
})

