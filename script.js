document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // 切换导航菜单
        nav.classList.toggle('nav-active');

        // 动画链接
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 汉堡菜单动画
        burger.classList.toggle('toggle');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AIGC作品集
const portfolioItems = [
    { src: 'images/奥黛丽(1).png', title: '奥黛丽·赫本', description: 'AI生成的奥黛丽·赫本肖像' },
    { src: 'images/苏茜.webp', title: '苏茜', description: 'AI生成的苏茜肖像' },
    // 如果有更多作品，可以在这里添加
];

const portfolioGrid = document.querySelector('.portfolio-grid');
portfolioItems.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.innerHTML = `
        <a href="${item.src}" data-lightbox="portfolio" data-title="${item.title}: ${item.description}">
            <img src="${item.src}" alt="${item.title}">
        </a>
    `;
    portfolioGrid.appendChild(portfolioItem);
});

// 研究报告
const reports = [
    { title: 'IP报告', description: 'IP相关研究报告', pdfLink: 'PPT/IP.pdf', thumbnail: 'PPT/缩略图_1.png' },
    // 如果有其他研究报告，可以在这里添加
];

const reportsList = document.querySelector('.reports-list');
reports.forEach(report => {
    const reportItem = document.createElement('li');
    reportItem.className = 'report-item';
    reportItem.innerHTML = `
        <img src="${report.thumbnail}" alt="${report.title}">
        <div>
            <h3>${report.title}</h3>
            <p>${report.description}</p>
            <a href="${report.pdfLink}" target="_blank">查看PDF</a>
        </div>
    `;
    reportsList.appendChild(reportItem);
});

// 暗色模式切换
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// 检查用户之前的主题偏好
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList[currentTheme === 'dark' ? 'add' : 'remove']('dark-mode');
    toggleSwitch.checked = currentTheme === 'dark';
}

// 多语言支持
const resources = {
    en: {
        translation: {
            "home": {
                "name": "吕南星Nancy",  // 保持中文名字
                "slogan": "风物长宜放眼量"  // 保持中文标语
            },
            "resume": {
                "title": "Resume"
            },
            "portfolio": {
                "title": "AIGC Portfolio"
            },
            "reports": {
                "title": "Research Reports"
            },
            "contact": {
                "title": "Contact Me",
                "submit": "Send",
                "name": "Your Name",
                "company": "Your Company",
                "contact": "Your Contact (Phone/Email)",
                "message": "Your Message"
            }
        }
    },
    zh: {
        translation: {
            "home": {
                "name": "吕南星Nancy",
                "slogan": "风物长宜放眼量"
            },
            "resume": {
                "title": "简历"
            },
            "portfolio": {
                "title": "AIGC作品集"
            },
            "reports": {
                "title": "研究报告"
            },
            "contact": {
                "title": "联系我",
                "submit": "发送",
                "name": "您的姓名",
                "company": "您的公司",
                "contact": "您的联系方式（电话/邮箱）",
                "message": "您的留言"
            }
        }
    }
};

// 初始化 i18next
i18next.init({
    lng: 'zh', // 默认语言
    resources: resources,
    fallbackLng: 'zh'
}, function(err, t) {
    if (err) return console.error('i18next initialization error', err);
    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = i18next.t(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
}

// 语言切换
document.getElementById('language-select').addEventListener('change', function() {
    i18next.changeLanguage(this.value, (err, t) => {
        if (err) return console.error('Language change error', err);
        updateContent();
    });
});

// 确保在页面加载时更新内容
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    // 设置语言选择器的初始值
    document.getElementById('language-select').value = i18next.language;
});

// 网站访问统计
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('count').textContent = visitorCount;

// 联系表单
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 使用 Fetch API 发送表单数据
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('感谢您的留言！我们会尽快回复您。');
            this.reset();
        } else {
            alert('抱歉，发送失败。请稍后再试。');
        }
    }).catch(error => {
        alert('发送时出现错误。请稍后再试。');
        console.error('Error:', error);
    });
});

// 调整PDF视图高度
function adjustPDFHeight() {
    const resumeContainer = document.querySelector('.resume-container');
    if (resumeContainer) {
        const viewportHeight = window.innerHeight;
        const containerHeight = Math.max(viewportHeight * 0.8, 600); // 80% 的视口高度，但不小于600px
        resumeContainer.style.height = `${containerHeight}px`;
    }
}

// 确保在页面加载和窗口大小改变时都调用这个函数
window.addEventListener('load', adjustPDFHeight);
window.addEventListener('resize', adjustPDFHeight);