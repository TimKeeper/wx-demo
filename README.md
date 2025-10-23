# 万悉科技 - 时尚电商数据分析平台

A comprehensive AI-powered big data analysis tool designed for global fashion e-commerce brands, serving fashion designers, buyers, and planners.

## 🌟 Features

### ✅ Core Features Implemented

1. **Product Data Display**
   - Beautiful product grid with high-quality images
   - Real-time filtering by brand, category, date range
   - Search functionality across product names and descriptions
   - Hot products filter
   - Sort by price, hot score, or release date (ascending/descending)
   - Data export (JSON/CSV formats)

2. **My Watchlist**
   - Add, edit, and delete brand tracking
   - Monitor brand websites and social media accounts (Instagram, Twitter)
   - Toggle active/inactive status for brands
   - Persistent storage using localStorage

3. **User Authentication**
   - Login/Logout functionality
   - Forgot password flow
   - Password reset functionality
   - Persistent sessions

4. **Notification System**
   - Real-time alerts for hot products
   - Browser notifications (with permission)
   - Email notification preferences
   - Unread count badge
   - Notification history

5. **Multi-language Support** ⭐
   - English (default)
   - Chinese (中文)
   - Easy language toggle in header

6. **User Plan System** ⭐
   - Free Plan: View up to 20 products
   - Premium Plan: Unlimited product access
   - Upgrade flow with beautiful pricing page
   - Plan-based feature restrictions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📱 Demo Accounts

Try the application with these demo accounts:

**Free User:**
- Email: `demo@example.com`
- Password: `password123`
- Access: Limited to 20 products

**Premium User:**
- Email: `premium@example.com`
- Password: `password123`
- Access: Unlimited products + all features

## 🎨 Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** CSS3 with CSS Variables
- **Icons:** Unicode Emojis (no external dependencies)

## 📂 Project Structure

```
wx-demo/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── global.css          # Global styles and CSS variables
│   ├── components/                 # (Reusable components, if any)
│   ├── data/
│   │   └── products.json          # Mock product data
│   ├── layouts/
│   │   └── MainLayout.vue         # Main application layout
│   ├── stores/
│   │   ├── auth.js                # Authentication store
│   │   ├── products.js            # Products and filters store
│   │   ├── watchlist.js           # Watchlist management store
│   │   ├── notification.js        # Notification system store
│   │   └── language.js            # i18n/language store
│   ├── views/
│   │   ├── Login.vue              # Login page
│   │   ├── ForgotPassword.vue     # Password recovery
│   │   ├── ResetPassword.vue      # Password reset
│   │   ├── Dashboard.vue          # Main product dashboard
│   │   ├── Watchlist.vue          # Brand watchlist management
│   │   └── Upgrade.vue            # Plan upgrade page
│   ├── router/
│   │   └── index.js               # Vue Router configuration
│   ├── App.vue                    # Root component
│   └── main.js                    # Application entry point
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔑 Key Features Detail

### Product Filtering & Search
- **Text Search:** Search across product names, brands, and descriptions
- **Brand Filter:** Filter by specific brands (Zara, H&M, Mango, Uniqlo)
- **Category Filter:** Filter by clothing type (Tops, Bottoms, Dress)
- **Date Range:** Filter products by release date
- **Hot Products:** Quick toggle to show only trending items
- **Reset Filters:** One-click reset to default state

### Sorting Options
- **Release Date:** Newest or oldest first
- **Price:** Low to high or high to low
- **Hot Score:** Most to least popular

### Data Export
- **JSON Export:** Full product data in JSON format
- **CSV Export:** Spreadsheet-compatible format
- Exports respect current filters

### Notification System
- Automatic detection of new hot products
- Browser push notifications (with permission)
- In-app notification center
- Email notification preferences
- Visual unread count indicator

### Watchlist Management
- Add unlimited brands (Premium) or limited (Free)
- Track website URLs
- Monitor social media accounts
- Enable/disable monitoring per brand
- Edit brand information
- Delete brands with confirmation

### Premium Features
- **Free Plan:**
  - View up to 20 products
  - Basic filtering
  - Watchlist management
  
- **Premium Plan ($29/month):**
  - Unlimited product views
  - Advanced filters
  - Data export (JSON/CSV)
  - Email alerts
  - Priority support

## 🌐 Language Support

The application supports:
- **English** (en) - Default
- **Chinese** (中文) (zh)

Toggle between languages using the button in the header.

All UI text, labels, and messages are translated including:
- Navigation and menus
- Form labels and buttons
- Product categories
- Notifications
- Error messages

## 💾 Data Persistence

The application uses `localStorage` for:
- User authentication state
- Watchlist data
- Notification history
- Language preference
- User plan information

## 🎯 User Experience Highlights

1. **Modern UI/UX:**
   - Clean, professional design
   - Smooth animations and transitions
   - Responsive layout (mobile-friendly)
   - Intuitive navigation

2. **Performance:**
   - Fast page loads with Vite
   - Efficient state management with Pinia
   - Optimized image loading

3. **Accessibility:**
   - Clear visual hierarchy
   - Descriptive labels
   - Keyboard navigation support

4. **Visual Feedback:**
   - Loading states
   - Success/error messages
   - Hover effects
   - Active states

## 📋 Product Data Structure

Each product includes:
```json
{
  "id": "unique-id",
  "brand": "Brand Name",
  "name": "Product Name",
  "category": "tops|bottoms|dress",
  "price": 49.99,
  "currency": "USD",
  "image": "image-url",
  "hotScore": 95,
  "isHot": true,
  "releaseDate": "2025-10-20T10:00:00Z",
  "description": "Product description"
}
```

## 🔧 Customization

### Adding New Products
Edit `src/data/products.json` to add more products.

### Changing Color Theme
Modify CSS variables in `src/assets/styles/global.css`:
```css
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  /* ... other variables ... */
}
```

### Adding Languages
Extend the `translations` object in `src/stores/language.js`.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Future Enhancements

Potential additions:
- Real backend API integration
- Payment processing for upgrades
- Advanced analytics and charts
- Product comparison feature
- Favorites/bookmarks
- Dark mode
- More social media integrations
- AI-powered product recommendations

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**万悉科技 - Built with ❤️ using Vue 3 + Vite**

