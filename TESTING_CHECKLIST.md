# 测试清单 / Testing Checklist

## ✅ 数据格式更新验证

### 1. 基础显示测试
- [ ] 打开应用 `http://localhost:3000`
- [ ] 登录账号：demo@example.com / password123
- [ ] 确认看到 6 个产品（真实电商数据）
- [ ] 确认产品图片正常显示（来自 CloudFront CDN）
- [ ] 确认每个产品卡片显示：
  - [ ] 品牌名称 (Temu, Shein, Amazon Essentials)
  - [ ] 产品标题
  - [ ] 价格
  - [ ] 销售数量 (如 "95000+ sold")
  - [ ] 销售增长百分比
  - [ ] 产品类别标签

### 2. 搜索功能测试
- [ ] 在搜索框输入 "jeans" - 应显示牛仔裤产品
- [ ] 搜索 "dress" - 应显示连衣裙产品
- [ ] 搜索 "Shein" - 应显示 Shein 品牌的产品
- [ ] 搜索 "blouse" - 应显示上衣产品

### 3. 筛选功能测试
- [ ] **品牌筛选**
  - [ ] 选择 "Temu" - 应显示 2 个产品
  - [ ] 选择 "Shein" - 应显示 2 个产品
  - [ ] 选择 "Amazon Essentials" - 应显示 2 个产品

- [ ] **类别筛选**
  - [ ] 选择 "DENIM" - 应显示 1 个产品
  - [ ] 选择 "DRESSES" - 应显示 1 个产品
  - [ ] 选择 "TOPS" - 应显示 3 个产品
  - [ ] 选择 "LINGERIE & LOUNGEWEAR" - 应显示 1 个产品

- [ ] **热门产品筛选**
  - [ ] 勾选 "Hot Products Only" - 应显示 5 个热门产品

- [ ] **日期范围筛选**
  - [ ] 设置日期从 2024-03-07 - 应显示所有产品

### 4. 排序功能测试
- [ ] **按发布日期排序**
  - [ ] 降序 - 最新的在前
  - [ ] 升序 - 最早的在前

- [ ] **按价格排序**
  - [ ] 降序 - 最贵的 $15.99 在前
  - [ ] 升序 - 最便宜的 $4.79 在前

- [ ] **按销售增长排序** ⭐ 新功能
  - [ ] 降序 - Amazon Essentials Kimono (81.82%) 应在前
  - [ ] 升序 - Amazon Essentials Socks (10.53%) 应在前

- [ ] **按销售数量排序** ⭐ 新功能
  - [ ] 降序 - Temu Jeans (95000) 应在前
  - [ ] 升序 - Amazon Essentials Blouse (1000) 应在前

### 5. 产品详情测试
- [ ] 点击任意产品的 "View Details" 按钮
- [ ] 确认弹窗显示：
  - [ ] 产品标题
  - [ ] 产品图片
  - [ ] 品牌
  - [ ] 类别
  - [ ] 价格
  - [ ] 销售数量 ⭐ 新字段
  - [ ] 销售增长 ⭐ 新字段
  - [ ] 评分和评论数 ⭐ 新字段
  - [ ] 发布日期
  - [ ] 产品链接 ⭐ 新字段
- [ ] 点击 "View on [Brand]" 链接，应在新窗口打开产品页面

### 6. 数据导出测试
- [ ] 点击 "Export" 按钮
- [ ] 选择 "Export as JSON"
  - [ ] 下载的 JSON 文件包含完整产品数据
  - [ ] 确认包含新字段：salesCount, salesGrowth
- [ ] 选择 "Export as CSV"
  - [ ] 下载的 CSV 文件格式正确
  - [ ] 确认表头包含：ID, Brand, Title, Category, Price, Sales Count, Sales Growth, Release Date

### 7. 响应式设计测试
- [ ] 销售增长 > 50% 时显示绿色
- [ ] 销售增长 ≤ 50% 时显示灰色
- [ ] 热门产品有火焰🔥标记
- [ ] 产品类别标签正确显示（支持多个类别）

### 8. 语言切换测试
- [ ] 点击头部 "中文" 按钮切换到中文
- [ ] 确认排序选项正确翻译：
  - [ ] "Sales Growth" → "销售增长"
  - [ ] "Sales Count" → "销售数量"
- [ ] 切换回英文，确认正常

### 9. 免费用户限制测试
- [ ] 使用免费账号登录 (demo@example.com)
- [ ] 确认只能看到 6 个产品（因为总共只有6个，所以没有限制提示）
- [ ] 如果将来添加更多产品，免费用户应只能看到 20 个

### 10. 高级用户测试
- [ ] 登出，使用付费账号登录 (premium@example.com / password123)
- [ ] 确认可以看到所有产品
- [ ] 确认头部显示 "Premium" 标记

---

## 测试数据概览

当前系统包含 **6 个真实电商产品**：

| 品牌 | 产品 | 价格 | 销售数量 | 销售增长 | 类别 |
|------|------|------|----------|----------|------|
| Temu | Camouflage Cargo Jeans | $14.84 | 95000 | 12.5% | DENIM |
| Temu | Maxi Tank Dress | $6.77 | 27000 | 50% | DRESSES |
| Shein | Cold Shoulder Blouse | $6.27 | 10000 | 80% | TOPS |
| Shein | Ruched Wide Straps Top | $4.79 | 5200 | 78.57% | TOPS |
| Amazon | Athletic Socks | $15.99 | 5000 | 10.53% | LINGERIE & LOUNGEWEAR |
| Amazon | Kimono Cardigan | $13.58 | 1000 | 81.82% | TOPS |

---

## 快速测试命令

```bash
# 确保开发服务器正在运行
npm run dev

# 浏览器访问
# http://localhost:3000

# 测试账号
# 免费用户: demo@example.com / password123
# 付费用户: premium@example.com / password123
```

---

## 已知正常功能

以下功能保持原有实现，应继续正常工作：

✅ 用户登录/登出  
✅ 忘记密码流程  
✅ My Watchlist 品牌监控  
✅ 通知系统  
✅ 中英文切换  
✅ 套餐升级  

---

**测试完成后，所有功能应正常运行！** 🎉

