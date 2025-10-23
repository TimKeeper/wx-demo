<template>
  <div class="watchlist">
    <div class="watchlist-header">
      <h1>{{ t('watchlist') }}</h1>
      <button @click="showAddModal = true" class="btn btn-primary">
        ➕ {{ t('addBrand') }}
      </button>
    </div>

    <div class="watchlist-grid">
      <div 
        v-for="brand in watchlistStore.watchlist" 
        :key="brand.id"
        class="brand-card"
      >
        <div class="brand-header">
          <h3 class="brand-name">{{ brand.brand }}</h3>
          <div class="brand-actions">
            <button 
              @click="toggleActive(brand.id)" 
              class="btn-icon"
              :title="brand.active ? t('active') : t('inactive')"
            >
              {{ brand.active ? '✅' : '⏸️' }}
            </button>
            <button @click="editBrand(brand)" class="btn-icon" :title="t('editBrand')">
              ✏️
            </button>
            <button @click="deleteBrand(brand.id)" class="btn-icon danger" :title="t('delete')">
              🗑️
            </button>
          </div>
        </div>

        <div class="brand-info">
          <div class="info-item">
            <span class="info-icon">🌐</span>
            <a :href="brand.website" target="_blank" class="info-link">
              {{ brand.website }}
            </a>
          </div>

          <div v-if="brand.socialMedia?.instagram" class="info-item">
            <span class="info-icon">📸</span>
            <span>Instagram: {{ brand.socialMedia.instagram }}</span>
          </div>

          <div v-if="brand.socialMedia?.twitter" class="info-item">
            <span class="info-icon">🐦</span>
            <span>Twitter: {{ brand.socialMedia.twitter }}</span>
          </div>

          <div class="info-item">
            <span class="info-icon">📅</span>
            <span>{{ t('addedDate') }}: {{ brand.addedDate }}</span>
          </div>

          <div class="brand-status">
            <span 
              class="badge" 
              :class="brand.active ? 'badge-success' : 'badge-secondary'"
            >
              {{ brand.active ? t('active') : t('inactive') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingBrand" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ editingBrand ? t('editBrand') : t('addBrand') }}</h2>
          <button @click="closeModal" class="close-btn">✕</button>
        </div>

        <form @submit.prevent="saveBrand" class="brand-form">
          <div class="form-group">
            <label>{{ t('brandName') }}*</label>
            <input v-model="formData.brand" type="text" class="input" required />
          </div>

          <div class="form-group">
            <label>{{ t('website') }}*</label>
            <input v-model="formData.website" type="url" class="input" required />
          </div>

          <div class="form-group">
            <label>{{ t('instagram') }}</label>
            <input v-model="formData.instagram" type="text" class="input" placeholder="@brand" />
          </div>

          <div class="form-group">
            <label>{{ t('twitter') }}</label>
            <input v-model="formData.twitter" type="text" class="input" placeholder="@brand" />
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-outline">
              {{ t('cancel') }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ t('save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useWatchlistStore } from '../stores/watchlist'
import { useLanguageStore } from '../stores/language'

const watchlistStore = useWatchlistStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const showAddModal = ref(false)
const editingBrand = ref(null)

const formData = reactive({
  brand: '',
  website: '',
  instagram: '',
  twitter: ''
})

const resetForm = () => {
  formData.brand = ''
  formData.website = ''
  formData.instagram = ''
  formData.twitter = ''
}

const closeModal = () => {
  showAddModal.value = false
  editingBrand.value = null
  resetForm()
}

const editBrand = (brand) => {
  editingBrand.value = brand
  formData.brand = brand.brand
  formData.website = brand.website
  formData.instagram = brand.socialMedia?.instagram || ''
  formData.twitter = brand.socialMedia?.twitter || ''
}

const saveBrand = () => {
  const brandData = {
    brand: formData.brand,
    website: formData.website,
    socialMedia: {
      instagram: formData.instagram,
      twitter: formData.twitter
    }
  }

  if (editingBrand.value) {
    watchlistStore.updateBrand(editingBrand.value.id, brandData)
  } else {
    watchlistStore.addBrand(brandData)
  }

  closeModal()
}

const deleteBrand = (id) => {
  if (confirm('Are you sure you want to delete this brand?')) {
    watchlistStore.removeBrand(id)
  }
}

const toggleActive = (id) => {
  watchlistStore.toggleActive(id)
}
</script>

<style scoped>
.watchlist {
  padding-bottom: 2rem;
}

.watchlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.watchlist-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.watchlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.brand-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.brand-card:hover {
  box-shadow: var(--shadow-md);
}

.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.brand-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.brand-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.2);
}

.btn-icon.danger:hover {
  filter: brightness(1.2);
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.info-icon {
  font-size: 1rem;
}

.info-link {
  color: var(--primary-color);
  text-decoration: none;
}

.info-link:hover {
  text-decoration: underline;
}

.brand-status {
  margin-top: 0.5rem;
}

.badge-secondary {
  background: #e2e8f0;
  color: #64748b;
}

.brand-form {
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .watchlist-grid {
    grid-template-columns: 1fr;
  }
  
  .watchlist-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

