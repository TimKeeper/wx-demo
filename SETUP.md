# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 3. Login with Demo Accounts

**Free User Account:**
```
Email: demo@example.com
Password: password123
```

**Premium User Account:**
```
Email: premium@example.com
Password: password123
```

## 📖 What You'll See

### Dashboard (Main Page)
- **Product Grid:** Browse 25 fashion products with images
- **Filters:** Search, filter by brand/category/date, show hot products only
- **Sorting:** Sort by price, hot score, or release date
- **Export:** Download product data as JSON or CSV
- **Free Plan Limit:** Free users see only 20 products (try logging in with free account)

### My Watchlist
- View tracked brands (Zara, H&M, Mango pre-loaded)
- Add new brands with website and social media links
- Edit or delete existing brands
- Toggle active/inactive status

### Notifications (🔔 Bell Icon)
- View alerts for hot products
- Mark as read/unread
- Automatic detection of new hot items

### Upgrade Page
- Compare Free vs Premium plans
- Upgrade to Premium for unlimited access
- See feature differences

### Language Toggle
- Click the language button in header
- Switch between English and Chinese (中文)
- All UI text updates instantly

## 🎯 Try These Features

1. **Filter Products:**
   - Use the search box to find "dress" or "blazer"
   - Select a specific brand like "Zara"
   - Toggle "Hot Products Only" checkbox
   - Set date range to see recent releases

2. **Sort Products:**
   - Click "Sort By" dropdown
   - Choose Price, Hot Score, or Release Date
   - Toggle between Ascending/Descending

3. **Export Data:**
   - Click "Export" button
   - Choose JSON or CSV format
   - File downloads automatically

4. **Manage Watchlist:**
   - Go to "My Watchlist"
   - Click "Add Brand" to add a new one
   - Edit existing brands (✏️ icon)
   - Delete brands (🗑️ icon)
   - Toggle active status (✅/⏸️ icon)

5. **Test Premium Features:**
   - Login with free account → See 20 product limit warning
   - Go to Upgrade page → Click "Upgrade to Premium"
   - Return to Dashboard → Now see all products!

6. **Language Switching:**
   - Click "中文" button in header
   - Entire UI switches to Chinese
   - Click "EN" to switch back to English

7. **Notifications:**
   - Click bell icon (🔔) in header
   - View hot product alerts
   - Click notification to mark as read
   - Click "Mark All as Read"

## 🔧 Build for Production

```bash
npm run build
```

Production files will be in the `dist` folder.

## 🌐 Deploy

The built files can be deployed to:
- **Vercel:** `vercel deploy`
- **Netlify:** Drag & drop `dist` folder
- **GitHub Pages:** Upload `dist` contents
- **Any static hosting**

## 💡 Tips

- **Persistent Data:** User login, watchlist, and preferences are saved in browser localStorage
- **Mock Data:** Products are loaded from `src/data/products.json`
- **No Backend Required:** Everything runs client-side
- **Responsive Design:** Works on desktop, tablet, and mobile

## 📱 Recommended Browser

Chrome or Firefox for best experience (supports all modern features)

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Vite will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3001
```

**Dependencies not installed?**
```bash
# Clear cache and reinstall:
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
# Make sure you're using Node.js v16 or higher:
node --version
```

---

Enjoy exploring the 万悉科技 Fashion Analytics Dashboard! 🎉

