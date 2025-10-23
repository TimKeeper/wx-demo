import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productsData from '../data/products.json'

export const useProductsStore = defineStore('products', () => {
  const products = ref([...productsData])
  const filters = ref({
    search: '',
    brand: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    hotOnly: false
  })
  const sortBy = ref('productDate') // productDate, price, salesGrowth, salesCount
  const sortOrder = ref('desc') // asc, desc

  const filteredProducts = computed(() => {
    let result = [...products.value]

    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(p => 
        p.productTitle.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.normTitle.toLowerCase().includes(searchLower)
      )
    }

    // Brand filter
    if (filters.value.brand) {
      result = result.filter(p => p.brand === filters.value.brand)
    }

    // Category filter
    if (filters.value.category) {
      result = result.filter(p => {
        const categories = p.productPrimaryCategory || []
        return categories.some(cat => cat.toLowerCase() === filters.value.category.toLowerCase())
      })
    }

    // Date range filter
    if (filters.value.dateFrom) {
      result = result.filter(p => 
        new Date(p.productDate) >= new Date(filters.value.dateFrom)
      )
    }
    if (filters.value.dateTo) {
      result = result.filter(p => 
        new Date(p.productDate) <= new Date(filters.value.dateTo)
      )
    }

    // Hot products filter
    if (filters.value.hotOnly) {
      result = result.filter(p => p.isHot)
    }

    // Sorting
    result.sort((a, b) => {
      let aVal = a[sortBy.value]
      let bVal = b[sortBy.value]

      if (sortBy.value === 'productDate') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      } else if (sortBy.value === 'price') {
        // Remove $ and convert to number
        aVal = parseFloat(aVal.replace('$', ''))
        bVal = parseFloat(bVal.replace('$', ''))
      }

      if (sortOrder.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return result
  })

  const brands = computed(() => {
    const uniqueBrands = [...new Set(products.value.map(p => p.brand))]
    return uniqueBrands.sort()
  })

  const categories = computed(() => {
    // Get unique categories from products
    const uniqueCategories = new Set()
    products.value.forEach(p => {
      if (p.productPrimaryCategory) {
        p.productPrimaryCategory.forEach(cat => uniqueCategories.add(cat))
      }
    })
    return Array.from(uniqueCategories).sort().map(cat => ({
      value: cat,
      label: cat
    }))
  })

  const hotProducts = computed(() => {
    return products.value.filter(p => p.isHot)
  })

  const setFilter = (key, value) => {
    filters.value[key] = value
  }

  const resetFilters = () => {
    filters.value = {
      search: '',
      brand: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      hotOnly: false
    }
  }

  const setSorting = (field, order) => {
    sortBy.value = field
    sortOrder.value = order
  }

  const exportData = (format = 'json') => {
    const data = filteredProducts.value
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `products-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === 'csv') {
      const headers = ['ID', 'Brand', 'Title', 'Category', 'Price', 'Sales Count', 'Sales Growth', 'Release Date']
      const csvRows = [headers.join(',')]
      
      data.forEach(product => {
        const category = product.productPrimaryCategory ? product.productPrimaryCategory.join(';') : ''
        const row = [
          product.id,
          product.brand,
          `"${product.productTitle}"`,
          category,
          product.price,
          product.salesCount,
          product.salesGrowth,
          new Date(product.productDate).toLocaleDateString()
        ]
        csvRows.push(row.join(','))
      })
      
      const csvStr = csvRows.join('\n')
      const csvBlob = new Blob([csvStr], { type: 'text/csv' })
      const url = URL.createObjectURL(csvBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `products-${Date.now()}.csv`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return {
    products,
    filters,
    sortBy,
    sortOrder,
    filteredProducts,
    brands,
    categories,
    hotProducts,
    setFilter,
    resetFilters,
    setSorting,
    exportData
  }
})

