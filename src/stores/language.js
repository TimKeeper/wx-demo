import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref('en') // 'en' or 'zh'

  const translations = {
    en: {
      // Navigation
      dashboard: 'Dashboard',
      watchlist: 'My Watchlist',
      upgrade: 'Upgrade',
      logout: 'Logout',
      
      // Auth
      login: 'Login',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      backToLogin: 'Back to Login',
      sendResetLink: 'Send Reset Link',
      
      // Dashboard
      products: 'Products',
      search: 'Search products...',
      filters: 'Filters',
      brand: 'Brand',
      category: 'Category',
      dateRange: 'Date Range',
      from: 'From',
      to: 'To',
      hotProductsOnly: 'Hot Products Only',
      resetFilters: 'Reset Filters',
      sortBy: 'Sort By',
      price: 'Price',
      hotScore: 'Hot Score',
      releaseDate: 'Release Date',
      ascending: 'Ascending',
      descending: 'Descending',
      export: 'Export',
      exportJSON: 'Export as JSON',
      exportCSV: 'Export as CSV',
      
      // Product Card
      viewDetails: 'View Details',
      hot: 'HOT',
      
      // Categories
      tops: 'Tops',
      bottoms: 'Bottoms',
      dress: 'Dress',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      
      // Watchlist
      addBrand: 'Add Brand',
      editBrand: 'Edit Brand',
      brandName: 'Brand Name',
      website: 'Website',
      instagram: 'Instagram Handle',
      twitter: 'Twitter Handle',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      active: 'Active',
      inactive: 'Inactive',
      addedDate: 'Added Date',
      
      // Notifications
      notifications: 'Notifications',
      markAllRead: 'Mark All as Read',
      noNotifications: 'No notifications',
      
      // Upgrade
      currentPlan: 'Current Plan',
      freePlan: 'Free Plan',
      premiumPlan: 'Premium Plan',
      upgradeToPremium: 'Upgrade to Premium',
      viewLimit: 'View up to 20 products',
      unlimitedViews: 'Unlimited product views',
      emailAlerts: 'Email alerts',
      prioritySupport: 'Priority support',
      advancedFilters: 'Advanced filters',
      dataExport: 'Data export',
      month: 'month',
      
      // Messages
      loginSuccess: 'Login successful',
      loginError: 'Invalid credentials',
      resetEmailSent: 'Password reset email sent',
      upgradeSucess: 'Successfully upgraded to Premium!',
      limitReached: 'Free plan limit: You can only view 20 products. Upgrade to Premium for unlimited access.',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      confirm: 'Confirm',
      showing: 'Showing',
      of: 'of',
      results: 'results'
    },
    zh: {
      // Navigation
      dashboard: '仪表板',
      watchlist: '我的关注列表',
      upgrade: '升级',
      logout: '退出登录',
      
      // Auth
      login: '登录',
      email: '邮箱',
      password: '密码',
      forgotPassword: '忘记密码？',
      resetPassword: '重置密码',
      backToLogin: '返回登录',
      sendResetLink: '发送重置链接',
      
      // Dashboard
      products: '产品',
      search: '搜索产品...',
      filters: '筛选',
      brand: '品牌',
      category: '类别',
      dateRange: '日期范围',
      from: '从',
      to: '到',
      hotProductsOnly: '仅热门产品',
      resetFilters: '重置筛选',
      sortBy: '排序方式',
      price: '价格',
      hotScore: '热度',
      releaseDate: '发布日期',
      ascending: '升序',
      descending: '降序',
      export: '导出',
      exportJSON: '导出为 JSON',
      exportCSV: '导出为 CSV',
      
      // Product Card
      viewDetails: '查看详情',
      hot: '热门',
      
      // Categories
      tops: '上衣',
      bottoms: '下衣',
      dress: '裙子',
      allCategories: '所有类别',
      allBrands: '所有品牌',
      
      // Watchlist
      addBrand: '添加品牌',
      editBrand: '编辑品牌',
      brandName: '品牌名称',
      website: '网站',
      instagram: 'Instagram 账号',
      twitter: 'Twitter 账号',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      active: '启用',
      inactive: '停用',
      addedDate: '添加日期',
      
      // Notifications
      notifications: '通知',
      markAllRead: '全部标记为已读',
      noNotifications: '暂无通知',
      
      // Upgrade
      currentPlan: '当前套餐',
      freePlan: '免费套餐',
      premiumPlan: '高级套餐',
      upgradeToPremium: '升级到高级版',
      viewLimit: '查看最多 20 个产品',
      unlimitedViews: '无限查看产品',
      emailAlerts: '邮件提醒',
      prioritySupport: '优先支持',
      advancedFilters: '高级筛选',
      dataExport: '数据导出',
      month: '月',
      
      // Messages
      loginSuccess: '登录成功',
      loginError: '账号或密码错误',
      resetEmailSent: '密码重置邮件已发送',
      upgradeSucess: '成功升级到高级版！',
      limitReached: '免费套餐限制：您只能查看 20 个产品。升级到高级版以获得无限访问权限。',
      
      // Common
      loading: '加载中...',
      error: '错误',
      success: '成功',
      close: '关闭',
      confirm: '确认',
      showing: '显示',
      of: '/',
      results: '结果'
    }
  }

  const t = computed(() => {
    return (key) => {
      return translations[currentLang.value][key] || key
    }
  })

  const setLanguage = (lang) => {
    currentLang.value = lang
    localStorage.setItem('language', lang)
  }

  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'en' ? 'zh' : 'en'
    localStorage.setItem('language', currentLang.value)
  }

  const loadLanguage = () => {
    const stored = localStorage.getItem('language')
    if (stored) {
      currentLang.value = stored
    }
  }

  return {
    currentLang,
    t,
    setLanguage,
    toggleLanguage,
    loadLanguage
  }
})

