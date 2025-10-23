# 数据格式更新说明

## 更新日期
2024-03-07

## 更新内容

已成功将项目从原有的简化数据格式更新为真实的电商JSON数据格式。

### 主要字段变更

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| `image` | `s3ImageUrl` | 产品图片URL |
| `name` | `productTitle` | 产品标题 |
| `description` | `normTitle` | 标准化标题 |
| `category` (单个) | `productPrimaryCategory` (数组) | 产品主类别 |
| `hotScore` | `salesGrowth` | 销售增长率 |
| - | `salesCount` | 销售数量 |
| - | `salesCountStr` | 销售数量显示文本 |
| `releaseDate` | `productDate` | 产品日期 |
| - | `productUrl` | 产品链接 |
| - | `rating` | 评分 |
| - | `numReviews` | 评论数量 |

### 数据源品牌

现已支持以下真实品牌数据：
- **Temu** - 国际电商平台
- **Shein** - 时尚快时尚品牌
- **Amazon Essentials** - 亚马逊自营品牌

### 功能更新

#### 1. 图片展示
- ✅ 使用 `s3ImageUrl` 字段显示产品图片
- ✅ 图片存储在 CloudFront CDN

#### 2. 排序功能
新增排序选项：
- ✅ **Sales Growth** (销售增长) - 按销售增长率排序
- ✅ **Sales Count** (销售数量) - 按销售数量排序
- ✅ **Product Date** (发布日期) - 按产品日期排序
- ✅ **Price** (价格) - 按价格排序

#### 3. 搜索功能
搜索范围更新：
- ✅ `productTitle` - 产品标题
- ✅ `brand` - 品牌名称
- ✅ `normTitle` - 标准化标题

#### 4. 筛选功能
- ✅ **品牌筛选** - 支持 Temu, Shein, Amazon Essentials
- ✅ **类别筛选** - 动态从数据中提取类别：
  - TOPS (上衣)
  - DRESSES (裙子)
  - DENIM (牛仔)
  - LINGERIE & LOUNGEWEAR (内衣&家居服)
- ✅ **日期范围筛选** - 基于 `productDate`
- ✅ **热门产品筛选** - 基于 `isHot` 标记

#### 5. 产品卡片显示
每个产品卡片现在显示：
- ✅ 产品图片 (s3ImageUrl)
- ✅ 品牌名称 (brand)
- ✅ 产品标题 (productTitle)
- ✅ 产品类别 (productPrimaryCategory)
- ✅ 价格 (price)
- ✅ 销售数量 (salesCountStr) - 如 "95000+ sold"
- ✅ 销售增长 (salesGrowth) - 百分比显示
- ✅ 发布日期 (productDate)
- ✅ 热门标记 (isHot)

#### 6. 产品详情弹窗
详情页面新增显示：
- ✅ 评分和评论数 (rating, numReviews)
- ✅ 销售增长百分比
- ✅ 产品页面链接 (productUrl)
- ✅ 完整的类别信息

#### 7. 数据导出
CSV导出字段更新：
- ID
- Brand (品牌)
- Title (标题)
- Category (类别)
- Price (价格)
- **Sales Count** (销售数量) ⭐ 新增
- **Sales Growth** (销售增长) ⭐ 新增
- Release Date (发布日期)

### 技术实现

#### 修改的文件

1. **`src/data/products.json`**
   - 使用真实电商数据（6个产品样本）
   - 包含完整的产品属性

2. **`src/stores/products.js`**
   - 更新搜索逻辑支持新字段
   - 更新类别筛选支持数组类型
   - 更新排序逻辑支持 salesGrowth 和 salesCount
   - 更新CSV导出字段

3. **`src/views/Dashboard.vue`**
   - 更新产品卡片显示新字段
   - 添加销售增长显示组件
   - 更新详情弹窗显示更多信息
   - 添加产品链接跳转

4. **`src/stores/language.js`**
   - 添加 salesGrowth 和 salesCount 的中英文翻译

### 样式增强

新增样式类：
```css
.product-sales      /* 销售数量显示 */
.product-growth     /* 销售增长显示 */
.growth-value.positive  /* 高增长率突出显示 (>50%) */
.product-link       /* 产品链接样式 */
```

### 数据示例

```json
{
  "id": "temu_601099518345686",
  "brand": "Temu",
  "productTitle": "High Waist Straight Camouflage Cargo Jeans...",
  "productPrimaryCategory": ["DENIM"],
  "price": "$14.84",
  "s3ImageUrl": "https://d3uxyztjq8r6f0.cloudfront.net/...",
  "salesCount": 95000,
  "salesCountStr": "95000+ sold",
  "salesGrowth": 12.5,
  "productDate": "2024-03-07",
  "rating": 4.6,
  "numReviews": 47666,
  "isHot": true
}
```

### 向后兼容性

所有原有功能保持不变：
- ✅ 用户认证系统
- ✅ 监控列表 (Watchlist)
- ✅ 通知系统
- ✅ 中英文切换
- ✅ 免费/付费用户权限

### 测试建议

1. **搜索测试**
   - 搜索 "jeans" 应显示牛仔裤
   - 搜索 "Shein" 应显示 Shein 品牌产品

2. **筛选测试**
   - 按品牌筛选 Temu
   - 按类别筛选 TOPS
   - 按日期范围筛选

3. **排序测试**
   - 按销售增长排序（降序）- 最高的应该是 Shein 的 blouse (80%)
   - 按销售数量排序 - 最高的应该是 Temu 的 jeans (95000)

4. **数据导出测试**
   - 导出 JSON 格式
   - 导出 CSV 格式，检查新字段

### 未来扩展

可以轻松添加：
- 更多产品数据（当前6个样本）
- API 集成（替换静态 JSON）
- 更多筛选条件（价格区间、评分等）
- 产品对比功能
- 收藏/喜欢功能

---

**更新完成** ✅

所有功能正常运行，项目已更新为使用真实电商数据格式。

