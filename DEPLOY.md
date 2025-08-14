# 🚀 GitHub Pages 部署指南

本指南将帮助你将郑州人才公寓抢房服务网页部署到GitHub Pages上。

## 📋 前置要求

- 拥有GitHub账户
- 已安装Git（本地开发环境）
- 项目文件已准备就绪

## 🔧 部署步骤

### 第一步：在GitHub上创建新仓库

1. 登录GitHub账户
2. 点击右上角"+"号，选择"New repository"
3. 填写仓库信息：
   - **Repository name**: `zhengzhou-talent-apartment` (或你喜欢的名称)
   - **Description**: 郑州人才公寓抢房服务网页
   - **Visibility**: 选择Public（GitHub Pages需要公开仓库）
   - **不要**勾选"Add a README file"（我们已经有了）
4. 点击"Create repository"

### 第二步：连接本地仓库到GitHub

```bash
# 添加远程仓库（替换YOUR_USERNAME和REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

### 第三步：启用GitHub Pages

1. 在GitHub仓库页面，点击"Settings"标签
2. 左侧菜单找到"Pages"
3. 在"Source"部分：
   - 选择"Deploy from a branch"
   - Branch选择"main"
   - Folder选择"/ (root)"
4. 点击"Save"

### 第四步：等待部署完成

- GitHub Actions会自动构建和部署你的网站
- 部署完成后，你会看到类似这样的URL：
  `https://YOUR_USERNAME.github.io/REPO_NAME/`

## 📁 项目结构

```
zhengzhou-talent-apartment/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
├── README.md           # 项目说明
├── .github/workflows/  # GitHub Actions配置
│   └── deploy.yml      # 自动部署配置
└── DEPLOY.md           # 本部署指南
```

## 🌐 访问你的网站

部署成功后，你可以通过以下方式访问：

- **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/REPO_NAME/`
- **自定义域名**: 可以在Pages设置中添加自定义域名

## 🔄 更新网站

每次推送代码到main分支时，GitHub Actions会自动重新部署：

```bash
git add .
git commit -m "更新内容描述"
git push origin main
```

## 🛠️ 故障排除

### 常见问题

1. **页面显示404**
   - 检查仓库是否为公开仓库
   - 确认GitHub Pages已启用
   - 等待几分钟让部署完成

2. **样式或脚本不加载**
   - 检查文件路径是否正确
   - 确认所有文件都已推送到GitHub

3. **部署失败**
   - 检查GitHub Actions日志
   - 确认工作流文件格式正确

### 检查部署状态

1. 在仓库页面点击"Actions"标签
2. 查看最新的工作流运行状态
3. 如果有错误，点击查看详细日志

## 📱 移动端测试

部署完成后，建议在不同设备上测试：
- 桌面浏览器
- 手机浏览器
- 平板设备

## 🔗 相关链接

- [GitHub Pages 官方文档](https://pages.github.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [静态网站部署最佳实践](https://docs.github.com/en/pages/getting-started-with-github-pages)

## 📞 技术支持

如果遇到问题，可以：
1. 检查GitHub Actions日志
2. 查看GitHub Pages设置
3. 参考GitHub官方文档

---

**部署完成后，你的郑州人才公寓抢房服务网页就可以在互联网上访问了！** 🎉
