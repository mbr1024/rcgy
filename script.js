// 全局变量
let selectedService = null;
let selectedServiceData = null;

// 服务数据
const services = {
    'price-first': {
        name: '快速申请',
        price: 99,
        description: '优先申请价格最低公寓，申请材料快速审核，政策解读与指导，申请进度实时跟踪，7×24小时在线服务',
        features: [
            '优先申请价格最低公寓',
            '申请材料快速审核',
            '政策解读与指导',
            '申请进度实时跟踪',
            '7×24小时在线服务'
        ]
    },
    'careful-selection': {
        name: '精准匹配',
        price: 129,
        description: '指定区域公寓筛选，最优公寓推荐，详细公寓分析，个性化需求匹配，专业顾问一对一服务',
        features: [
            '指定区域公寓筛选',
            '最优公寓推荐',
            '详细公寓分析',
            '个性化需求匹配',
            '专业顾问一对一服务'
        ]
    },
    'casual-choice': {
        name: '轻松申请',
        price: 79,
        description: '随机优质公寓推荐，政策优惠发现，轻松申请体验，无压力选择，基础申请指导',
        features: [
            '随机优质公寓推荐',
            '政策优惠发现',
            '轻松申请体验',
            '无压力选择',
            '基础申请指导'
        ]
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 初始化页面
function initializePage() {
    // 添加导航栏滚动效果
    window.addEventListener('scroll', handleScroll);
    
    // 添加平滑滚动
    addSmoothScrolling();
    
    // 添加动画效果
    addAnimations();
    
    // 初始化弹窗事件
    initModal();
}

// 处理滚动效果
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
}

// 添加平滑滚动
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加动画效果
function addAnimations() {
    // 观察器选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.service-card, .step, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 初始化弹窗
function initModal() {
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close');
    
    // 点击关闭按钮关闭弹窗
    closeBtn.addEventListener('click', closeModal);
    
    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// 选择服务
function selectService(serviceId) {
    selectedService = serviceId;
    selectedServiceData = services[serviceId];
    showPurchaseModal();
}

// 显示购买弹窗
function showPurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    const modalContent = document.getElementById('modalContent');
    
    if (selectedServiceData) {
        modalContent.innerHTML = `
            <div class="service-summary">
                <h3>${selectedServiceData.name}</h3>
                <div class="service-price">
                    <span class="currency">¥</span>
                    <span class="amount">${selectedServiceData.price}</span>
                    <span class="period">/次</span>
                </div>
                <div class="service-description">
                    <p>${selectedServiceData.description}</p>
                </div>
                <div class="service-features">
                    <h4>服务包含：</h4>
                    <ul>
                        ${selectedServiceData.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 确认购买
function confirmPurchase() {
    if (selectedServiceData) {
        // 这里可以添加实际的支付逻辑
        showSuccessMessage();
        closeModal();
        
        // 重置选择
        selectedService = null;
        selectedServiceData = null;
    }
}

// 显示成功消息
function showSuccessMessage() {
    // 创建成功提示元素
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>购买成功！</h3>
            <p>感谢您选择${selectedServiceData.name}服务，我们的专业团队将尽快为您服务。</p>
        </div>
    `;
    
    // 添加样式
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        max-width: 350px;
        animation: slideInRight 0.5s ease;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(successMessage);
    
    // 3秒后自动移除
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 500);
    }, 3000);
}

// 添加服务卡片悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
});

// 添加统计数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat .number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current) + (number.textContent.includes('+') ? '+' : '') + (number.textContent.includes('%') ? '%' : '') + (number.textContent.includes('h') ? 'h' : '');
        }, 50);
    });
}

// 页面滚动到统计区域时触发动画
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 观察统计区域
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// 添加表单验证（如果需要的话）
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('姓名至少需要2个字符');
    }
    
    if (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) {
        errors.push('请输入有效的手机号码');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('请输入有效的邮箱地址');
    }
    
    return errors;
}

// 工具函数：格式化价格
function formatPrice(price) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(price);
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

// 添加响应式菜单切换（移动端）
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');
    
    if (window.innerWidth <= 768) {
        header.insertBefore(mobileMenuBtn, nav);
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars">';
        });
    }
}

// 页面加载完成后初始化移动端菜单
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // 窗口大小改变时重新初始化
    window.addEventListener('resize', debounce(initMobileMenu, 250));
});
