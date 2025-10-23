import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref([
    {
      id: '1',
      brand: 'Zara',
      website: 'https://www.zara.com',
      socialMedia: {
        instagram: '@zara',
        twitter: '@ZARA'
      },
      addedDate: '2025-10-01',
      active: true
    },
    {
      id: '2',
      brand: 'H&M',
      website: 'https://www.hm.com',
      socialMedia: {
        instagram: '@hm',
        twitter: '@hm'
      },
      addedDate: '2025-10-05',
      active: true
    },
    {
      id: '3',
      brand: 'Mango',
      website: 'https://www.mango.com',
      socialMedia: {
        instagram: '@mango',
        twitter: '@mango'
      },
      addedDate: '2025-10-10',
      active: true
    }
  ])

  const addBrand = (brand) => {
    const newBrand = {
      id: Date.now().toString(),
      ...brand,
      addedDate: new Date().toISOString().split('T')[0],
      active: true
    }
    watchlist.value.push(newBrand)
    saveToLocalStorage()
  }

  const updateBrand = (id, updatedBrand) => {
    const index = watchlist.value.findIndex(b => b.id === id)
    if (index !== -1) {
      watchlist.value[index] = { ...watchlist.value[index], ...updatedBrand }
      saveToLocalStorage()
    }
  }

  const removeBrand = (id) => {
    watchlist.value = watchlist.value.filter(b => b.id !== id)
    saveToLocalStorage()
  }

  const toggleActive = (id) => {
    const brand = watchlist.value.find(b => b.id === id)
    if (brand) {
      brand.active = !brand.active
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('watchlist')
    if (stored) {
      watchlist.value = JSON.parse(stored)
    }
  }

  return {
    watchlist,
    addBrand,
    updateBrand,
    removeBrand,
    toggleActive,
    loadFromLocalStorage
  }
})

