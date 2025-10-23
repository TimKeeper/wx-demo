<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>{{ t('products') }}</h1>
      <div class="header-actions">
        <button @click="showExportMenu = !showExportMenu" class="btn btn-outline">
          📥 {{ t('export') }}
        </button>
        <div v-if="showExportMenu" class="export-menu">
          <button @click="handleExport('json')" class="export-option">
            {{ t('exportJSON') }}
          </button>
          <button @click="handleExport('csv')" class="export-option">
            {{ t('exportCSV') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section card">
      <h3>{{ t('filters') }}</h3>
      <div class="filters-grid">
        <!-- Search -->
        <div class="filter-group">
          <input 
            v-model="productsStore.filters.search" 
            type="text" 
            class="input" 
            :placeholder="t('search')"
          />
        </div>

        <!-- Brand Filter -->
        <div class="filter-group">
          <select v-model="productsStore.filters.brand" class="select">
            <option value="">{{ t('allBrands') }}</option>
            <option v-for="brand in productsStore.brands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
        </div>

        <!-- Category Filter -->
        <div class="filter-group">
          <select v-model="productsStore.filters.category" class="select">
            <option value="">{{ t('allCategories') }}</option>
            <option v-for="cat in productsStore.categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <!-- Date From -->
        <div class="filter-group">
          <input 
            v-model="productsStore.filters.dateFrom" 
            type="date" 
            class="input"
            :placeholder="t('from')"
          />
        </div>

        <!-- Date To -->
        <div class="filter-group">
          <input 
            v-model="productsStore.filters.dateTo" 
            type="date" 
            class="input"
            :placeholder="t('to')"
          />
        </div>

        <!-- Hot Products Only -->
        <div class="filter-group checkbox-group">
          <label>
            <input 
              v-model="productsStore.filters.hotOnly" 
              type="checkbox"
            />
            <span>🔥 {{ t('hotProductsOnly') }}</span>
          </label>
        </div>
      </div>

      <div class="filter-actions">
        <button @click="productsStore.resetFilters()" class="btn btn-outline">
          {{ t('resetFilters') }}
        </button>
      </div>
    </div>

    <!-- Sort Options -->
    <div class="sort-section card">
      <div class="sort-controls">
        <label>{{ t('sortBy') }}:</label>
        <select v-model="productsStore.sortBy" class="select">
          <option value="productDate">{{ t('releaseDate') }}</option>
          <option value="price">{{ t('price') }}</option>
          <option value="salesGrowth">Sales Growth</option>
          <option value="salesCount">Sales Count</option>
        </select>

        <select v-model="productsStore.sortOrder" class="select">
          <option value="desc">{{ t('descending') }}</option>
          <option value="asc">{{ t('ascending') }}</option>
        </select>

        <span class="results-count">
          {{ t('showing') }} {{ displayedProducts.length }} {{ t('of') }} 
          {{ productsStore.filteredProducts.length }} {{ t('results') }}
        </span>
      </div>
    </div>

    <!-- Free Plan Limit Warning -->
    <div v-if="!authStore.isPremium && productsStore.filteredProducts.length > 20" class="warning-banner">
      ⚠️ {{ t('limitReached') }}
      <router-link to="/upgrade" class="upgrade-link-inline">
        {{ t('upgradeToPremium') }}
      </router-link>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div 
        v-for="product in displayedProducts" 
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-wrapper">
          <img :src="product.productImageUrl || product.s3ImageUrl" :alt="product.productTitle" class="product-image" @error="handleImageError" />
          <span v-if="product.isHot" class="hot-badge">🔥 {{ t('hot') }}</span>
        </div>
        
        <div class="product-info">
          <div class="product-brand">{{ product.brand }}</div>
          <h3 class="product-name" :title="product.productTitle">{{ product.productTitle }}</h3>
          <div class="product-category">
            <span 
              v-for="cat in product.productPrimaryCategory" 
              :key="cat" 
              class="badge badge-primary"
            >
              {{ cat }}
            </span>
          </div>
          <div class="product-meta">
            <div class="product-price">{{ product.price }}</div>
            <div class="product-sales">
              <span class="sales-label">📈</span>
              <span class="sales-value">{{ product.salesCountStr }}</span>
            </div>
          </div>
          <div class="product-growth">
            <span class="growth-label">Sales Growth:</span>
            <span class="growth-value" :class="{ positive: product.salesGrowth > 50 }">
              {{ product.salesGrowth }}%
            </span>
          </div>
          <div class="product-date">
            {{ formatDate(product.productDate) }}
          </div>
          <button @click="viewProductDetails(product)" class="btn btn-primary btn-full">
            {{ t('viewDetails') }}
          </button>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="productsStore.filteredProducts.length === 0" class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3>No products found</h3>
      <p>Try adjusting your filters</p>
    </div>

    <!-- Product Details Modal -->
    <div v-if="selectedProduct" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedProduct.productTitle }}</h2>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>
        <div class="modal-body">
          <img :src="selectedProduct.productImageUrl || selectedProduct.s3ImageUrl" :alt="selectedProduct.productTitle" class="modal-image" @error="handleImageError" />
          <div class="modal-info">
            <div class="info-row">
              <span class="info-label">{{ t('brand') }}:</span>
              <span class="info-value">{{ selectedProduct.brand }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('category') }}:</span>
              <span class="info-value">{{ selectedProduct.productPrimaryCategory?.join(', ') }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('price') }}:</span>
              <span class="info-value">{{ selectedProduct.price }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Sales Count:</span>
              <span class="info-value">{{ selectedProduct.salesCountStr }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Sales Growth:</span>
              <span class="info-value">{{ selectedProduct.salesGrowth }}%</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rating:</span>
              <span class="info-value">{{ selectedProduct.rating }} ⭐ ({{ selectedProduct.numReviews }} reviews)</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('releaseDate') }}:</span>
              <span class="info-value">{{ formatDate(selectedProduct.productDate) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Product URL:</span>
              <span class="info-value">
                <a :href="selectedProduct.productUrl" target="_blank" class="product-link">
                  View on {{ selectedProduct.brand }}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'
import { useLanguageStore } from '../stores/language'

const productsStore = useProductsStore()
const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const showExportMenu = ref(false)
const selectedProduct = ref(null)

const displayedProducts = computed(() => {
  const products = productsStore.filteredProducts
  // Free users can only view 20 products
  if (!authStore.isPremium && products.length > 20) {
    return products.slice(0, 20)
  }
  return products
})

const handleExport = (format) => {
  productsStore.exportData(format)
  showExportMenu.value = false
}

const viewProductDetails = (product) => {
  selectedProduct.value = product
}

const closeModal = () => {
  selectedProduct.value = null
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const handleImageError = (e) => {
  // Fallback to a placeholder image if image fails to load
  e.target.src = 'https://via.placeholder.com/400x500/e2e8f0/64748b?text=Product+Image'
}

onMounted(() => {
  // Close export menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-actions')) {
      showExportMenu.value = false
    }
  })
})
</script>

<style scoped>
.dashboard {
  padding-bottom: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.header-actions {
  position: relative;
}

.export-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  min-width: 200px;
  z-index: 10;
}

.export-option {
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.export-option:hover {
  background: var(--bg-secondary);
}

.export-option:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.export-option:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

.filters-section {
  margin-bottom: 1.5rem;
}

.filters-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
}

.sort-section {
  margin-bottom: 1.5rem;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.sort-controls label {
  font-weight: 500;
}

.sort-controls .select {
  width: auto;
  min-width: 150px;
}

.results-count {
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.warning-banner {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  color: #92400e;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.upgrade-link-inline {
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 0.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--danger-color);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: 1.25rem;
}

.product-brand {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  line-height: 1.4;
  /* 限制显示2行，超出显示省略号 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 固定高度确保布局一致 */
  min-height: 2.8rem; /* 1.4 line-height * 2 lines * 1rem */
  max-height: 2.8rem;
  cursor: help;
}

.product-category {
  margin-bottom: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.product-sales {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.sales-label {
  font-size: 1rem;
}

.sales-value {
  font-weight: 600;
  color: var(--success-color);
}

.product-growth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.growth-label {
  color: var(--text-secondary);
}

.growth-value {
  font-weight: 600;
  color: var(--text-secondary);
}

.growth-value.positive {
  color: var(--success-color);
}

.product-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.btn-full {
  width: 100%;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  display: grid;
  gap: 1.5rem;
}

.modal-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
}

.info-label {
  font-weight: 600;
  color: var(--text-secondary);
}

.info-value {
  color: var(--text-primary);
}

.product-link {
  color: var(--primary-color);
  text-decoration: none;
}

.product-link:hover {
  text-decoration: underline;
}
</style>

