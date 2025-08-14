// 郑州人才公寓手机应用 - 移动优先设计

// 应用状态管理
const AppState = {
    currentTab: 'home',
    selectedService: null,
    userInfo: null,
    notifications: [],
    applications: []
};

// 服务数据配置
const Services = {
    quick: {
        id: 'quick',
        name: '快速申请服务',
        price: 99,
        description: '优先申请价格最低公寓，快速审核通过',
        features: ['快速审核', '价格优先', '24h服务', '政策指导', '进度跟踪'],
        icon: 'fas fa-rocket',
        color: '#667eea'
    },
    precise: {
        id: 'precise',
        name: '精准匹配服务',
        price: 129,
        description: '指定区域筛选，最优公寓推荐',
        features: ['区域筛选', '专业顾问', '一对一服务', '详细分析', '个性化匹配'],
        icon: 'fas fa-bullseye',
        color: '#764ba2'
    },
    casual: {
        id: 'casual',
        name: '轻松申请服务',
        price: 79,
        description: '随机优质公寓，惊喜政策发现',
        features: ['随机推荐', '政策优惠', '轻松体验', '无压力', '基础指导'],
        icon: 'fas fa-heart',
        color: '#ff6b6b'
    }
};

// 应用初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserData();
    updateStatusBar();
});

// 初始化应用
function initializeApp() {
    // 初始化触摸优化
    initTouchOptimization();
    
    // 初始化滚动优化
    initScrollOptimization();
    
    // 检查网络状态
    checkNetworkStatus();
}

// 设置事件监听器
function setupEventListeners() {
    // 触摸事件优化
    setupTouchEvents();
    
    // 滚动事件优化
    setupScrollEvents();
    
    // 网络状态监听
    setupNetworkListeners();
    
    // 应用可见性变化监听
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// 触摸优化初始化
function initTouchOptimization() {
    // 防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 触摸反馈
    const touchElements = document.querySelectorAll('.action-item, .service-card, .nav-item, .primary-btn, .secondary-btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
}

// 设置触摸事件
function setupTouchEvents() {
    // 长按事件处理
    let longPressTimer;
    const longPressElements = document.querySelectorAll('.service-card, .action-item');
    
    longPressElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            longPressTimer = setTimeout(() => {
                showContextMenu(this);
            }, 500);
        });
        
        element.addEventListener('touchend', function() {
            clearTimeout(longPressTimer);
        });
        
        element.addEventListener('touchmove', function() {
            clearTimeout(longPressTimer);
        });
    });
}

// 滚动优化初始化
function initScrollOptimization() {
    // 平滑滚动
    const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
    smoothScrollElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 设置滚动事件
function setupScrollEvents() {
    let scrollTimeout;
    const scrollContainer = document.querySelector('.app-main');
    
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                handleScrollEnd();
            }, 150);
        });
    }
}

// 滚动结束处理
function handleScrollEnd() {
    // 可以在这里添加滚动结束后的逻辑
    // 比如懒加载、动画触发等
}

// 网络状态检查
function checkNetworkStatus() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            showNetworkWarning();
        }
    }
}

// 设置网络监听器
function setupNetworkListeners() {
    window.addEventListener('online', function() {
        showToast('网络已连接', 'success');
        hideNetworkWarning();
    });
    
    window.addEventListener('offline', function() {
        showToast('网络已断开', 'error');
        showNetworkWarning();
    });
}

// 应用可见性变化处理
function handleVisibilityChange() {
    if (document.hidden) {
        // 应用进入后台
        pauseAnimations();
    } else {
        // 应用回到前台
        resumeAnimations();
    }
}

// 暂停动画
function pauseAnimations() {
    document.body.style.animationPlayState = 'paused';
}

// 恢复动画
function resumeAnimations() {
    document.body.style.animationPlayState = 'running';
}



// 加载用户数据
function loadUserData() {
    // 模拟加载用户数据
    AppState.userInfo = {
        name: '用户',
        avatar: null,
        notifications: 3,
        applications: []
    };
    
    // 更新通知数量
    updateNotificationBadge();
}

// 更新通知徽章
function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (badge && AppState.userInfo) {
        badge.textContent = AppState.userInfo.notifications;
        badge.style.display = AppState.userInfo.notifications > 0 ? 'block' : 'none';
    }
}

// 显示服务信息
function showServiceInfo(serviceId) {
    const service = Services[serviceId];
    if (!service) return;
    
    showServiceModal(service);
}

// 显示服务详情
function showServiceDetails(serviceId) {
    const service = Services[serviceId];
    if (!service) return;
    
    // 这里可以跳转到详细页面或显示更多信息
    showToast(`查看${service.name}详情`, 'info');
}

// 选择服务
function selectService(serviceId) {
    AppState.selectedService = serviceId;
    const service = Services[serviceId];
    
    if (service) {
        showServiceModal(service);
    }
}

// 显示服务选择弹窗
function showServiceModal(service) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = service.name;
        
        modalBody.innerHTML = `
            <div class="service-modal-content">
                <div class="service-icon-large" style="background: ${service.color}">
                    <i class="${service.icon}"></i>
                </div>
                <h4>${service.name}</h4>
                <p class="service-description">${service.description}</p>
                <div class="service-features-list">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="service-price-large">
                    <span class="price-currency">¥</span>
                    <span class="price-amount">${service.price}</span>
                    <span class="price-unit">/次</span>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 添加弹窗动画
        modal.classList.add('modal-show');
    }
}

// 关闭服务弹窗
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.remove('modal-show');
        modal.classList.add('modal-hide');
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-hide');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 确认服务选择
function confirmServiceSelection() {
    if (AppState.selectedService) {
        const service = Services[AppState.selectedService];
        
        // 模拟支付流程
        showPaymentProcess(service);
        
        closeServiceModal();
    }
}

// 显示支付流程
function showPaymentProcess(service) {
    showToast('正在跳转支付...', 'info');
    
    // 模拟支付跳转
    setTimeout(() => {
        showToast(`${service.name}选择成功！`, 'success');
        
        // 添加到我的申请
        addToApplications(service);
        
        // 更新底部导航状态
        switchTab('applications');
    }, 1500);
}

// 添加到我的申请
function addToApplications(service) {
    const application = {
        id: Date.now(),
        service: service,
        status: 'pending',
        createTime: new Date(),
        progress: 0
    };
    
    AppState.applications.push(application);
    updateApplicationsCount();
}

// 更新申请数量
function updateApplicationsCount() {
    const applicationsTab = document.querySelector('.nav-item[onclick*="applications"]');
    if (applicationsTab) {
        const count = AppState.applications.length;
        let badge = applicationsTab.querySelector('.tab-badge');
        
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'tab-badge';
            applicationsTab.appendChild(badge);
        }
        
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// 切换标签页
function switchTab(tabName) {
    // 更新当前标签
    AppState.currentTab = tabName;
    
    // 更新导航状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const currentNavItem = document.querySelector(`.nav-item[onclick*="${tabName}"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('active');
    }
    
    // 处理标签页内容
    handleTabContent(tabName);
}

// 处理标签页内容
function handleTabContent(tabName) {
    switch (tabName) {
        case 'home':
            // 首页内容已在HTML中
            break;
        case 'services':
            showAllServices();
            break;
        case 'applications':
            showMyApplications();
            break;
        case 'profile':
            showProfile();
            break;
    }
}

// 显示所有服务
function showAllServices() {
    showToast('查看所有服务', 'info');
    // 这里可以跳转到服务列表页面
}

// 显示我的申请
function showMyApplications() {
    if (AppState.applications.length === 0) {
        showToast('暂无申请记录', 'info');
        return;
    }
    
    showToast(`您有${AppState.applications.length}个申请`, 'info');
    // 这里可以显示申请列表
}

// 显示个人资料
function showProfile() {
    showToast('个人资料页面', 'info');
    // 这里可以显示个人资料
}



// 显示上下文菜单
function showContextMenu(element) {
    // 创建上下文菜单
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
        <div class="context-menu-item" onclick="shareContent()">
            <i class="fas fa-share"></i>
            <span>分享</span>
        </div>
        <div class="context-menu-item" onclick="addToFavorites()">
            <i class="fas fa-heart"></i>
            <span>收藏</span>
        </div>
    `;
    
    // 定位菜单
    const rect = element.getBoundingClientRect();
    contextMenu.style.position = 'fixed';
    contextMenu.style.top = `${rect.bottom + 10}px`;
    contextMenu.style.left = `${rect.left}px`;
    contextMenu.style.zIndex = '3000';
    
    // 添加到页面
    document.body.appendChild(contextMenu);
    
    // 点击其他地方关闭菜单
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            contextMenu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 100);
}

// 分享内容
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: '郑州人才公寓',
            text: '专业的人才公寓申请服务',
            url: window.location.href
        });
    } else {
        showToast('复制链接成功', 'success');
    }
}

// 添加到收藏
function addToFavorites() {
    showToast('已添加到收藏', 'success');
}

// 显示网络警告
function showNetworkWarning() {
    const warning = document.createElement('div');
    warning.className = 'network-warning';
    warning.innerHTML = `
        <i class="fas fa-wifi-slash"></i>
        <span>网络连接较慢，请检查网络设置</span>
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.classList.add('show');
    }, 100);
}

// 隐藏网络警告
function hideNetworkWarning() {
    const warning = document.querySelector('.network-warning');
    if (warning) {
        warning.classList.remove('show');
        setTimeout(() => {
            warning.remove();
        }, 300);
    }
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.getElementById('successToast');
    const messageSpan = document.getElementById('successMessage');
    
    if (toast && messageSpan) {
        messageSpan.textContent = message;
        
        // 更新样式
        toast.className = `toast ${type}`;
        toast.style.display = 'flex';
        
        // 自动隐藏
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 性能监控
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
}

// 错误监控
function initErrorMonitoring() {
    window.addEventListener('error', function(event) {
        console.error('JavaScript错误:', event.error);
        // 这里可以发送错误信息到服务器
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('未处理的Promise拒绝:', event.reason);
        // 这里可以发送错误信息到服务器
    });
}

// 初始化性能监控
initPerformanceMonitoring();

// 初始化错误监控
initErrorMonitoring();
