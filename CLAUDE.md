# 农历夜历 - 项目文档

## 项目概述

这是一个现代化的夜间模式农历日历网站,基于优秀的开源项目 [mumuy/calendar](https://github.com/mumuy/calendar) 修改而来。

- **主题**: 纯黑背景 + 金色强调色的奢华夜间模式
- **核心功能**: 农历日历 + 2026年春节倒计时
- **技术栈**: 原生 JavaScript Web Components + Tailwind CSS + DaisyUI

## 项目结构

```
LunarCalendar/
├── src/                        # 源代码目录
│   ├── calendar.js            # 农历公历转换核心算法
│   ├── widget-calendar.js     # 日历 Web Component
│   ├── countdown-timer.js     # 倒计时 Web Component
│   └── style/
│       └── widget.css         # 日历组件样式(含夜间模式)
├── dist/                       # 构建输出目录
│   ├── calendar.min.js        # 压缩后的核心库
│   ├── calendar.min.mjs       # ES Module 版本
│   ├── widget-calendar.min.js # 日历组件
│   └── countdown-timer.min.js # 倒计时组件
├── index.html                  # 主页面
├── rollup.config.mjs          # Rollup 构建配置
├── package.json               # 项目依赖配置
└── README.md                  # 项目说明
```

## 核心组件

### 1. Calendar Core ([calendar.js](src/calendar.js))

核心农历算法库,基于 GB/T33661—2017 标准。

**主要功能**:
- 公历 ↔ 农历 日期转换
- 节气计算
- 节日识别
- 生肖、干支、星座计算

**API**:
```javascript
// 获取指定公历日期的农历信息
calendar.getDateBySolar(2024, 1, 1);

// 获取指定农历日期的公历信息
calendar.getDateByLunar(2023, 2, 10, true); // 2023年闰二月初十

// 获取今天的日期信息
calendar.getToday();
```

**返回数据格式**:
```javascript
{
    "date": "2024-01-01",
    "sYear": 2024,           // 公历年
    "sMonth": 1,             // 公历月
    "sDay": 1,               // 公历日
    "lYear": 2023,           // 农历年
    "lMonth": 11,            // 农历月
    "lDay": 21,              // 农历日
    "isLeap": false,         // 是否闰月
    "lMonthZH": "冬月",      // 农历月中文
    "lDayZH": "二十一",      // 农历日中文
    "gzYearZH": "癸卯",      // 干支年
    "gzMonthZH": "甲子",     // 干支月
    "gzDayZH": "戊午",       // 干支日
    "week": 1,               // 星期(0-6)
    "weekZH": "星期一",      // 星期中文
    "animal": "兔",          // 生肖
    "term": "",              // 节气
    "zodiac": "摩羯座",      // 星座
    "festival": "元旦"       // 节日
}
```

### 2. Widget Calendar ([widget-calendar.js](src/widget-calendar.js))

日历 Web Component,使用 Shadow DOM 封装。

**使用方法**:
```html
<widget-calendar mode="night"></widget-calendar>
```

**属性**:
- `mode`: 显示模式,支持 `"night"` (夜间模式)

**样式定制**:
通过 CSS 变量定制颜色:
```css
widget-calendar {
    --primary-color: #d4af37;    /* 主色调 - 金色 */
    --secondary-color: #f4d03f;  /* 辅助色 - 浅金色 */
}
```

**样式文件**: [src/style/widget.css](src/style/widget.css)
- 基础样式: 通用日历样式
- 夜间模式: `.mode-night` 类,黑色 + 金色主题
- 容器查询: 使用 `@container` 实现组件级响应式

### 3. Countdown Timer ([countdown-timer.js](src/countdown-timer.js))

倒计时 Web Component,使用 Shadow DOM 封装。

**使用方法**:
```html
<countdown-timer theme="night" target="2026-02-17T00:00:00"></countdown-timer>
```

**属性**:
- `theme`: 主题,默认 `"night"`
- `target`: 目标日期(ISO 8601格式),默认 `"2026-02-17T00:00:00"`

**特点**:
- 实时倒计时显示(天/时/分/秒)
- 自动缩放字体大小 (使用 `clamp()` 函数)
- 响应式布局,移动端保持单行显示
- 无边框透明背景,融入页面

**响应式设计**:
```css
/* 字体大小自动缩放: 最小 18px, 首选 5vw, 最大 42px */
font-size: clamp(18px, 5vw, 42px);

/* 间距自动缩放 */
gap: clamp(8px, 2vw, 24px);
```

## 样式系统

### 配色方案

**Black & Gold Luxury Theme**:

```css
/* 金色系列 */
--gold-primary: #d4af37;   /* 主金色 */
--gold-light: #f4d03f;     /* 浅金色 - 高光 */
--gold-dark: #b8960e;      /* 深金色 - 阴影 */

/* 灰色系列 */
--gray-dark: #1a1a1a;      /* 深灰 */
--gray-medium: #2d2d2d;    /* 中灰 */
--gray-light: #404040;     /* 浅灰 */

/* 纯黑背景 */
--bg-black: #000000;
```

### Tailwind + DaisyUI 配置

在 [index.html](index.html) 中配置:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                gold: {
                    primary: '#d4af37',
                    light: '#f4d03f',
                    dark: '#b8960e',
                },
                gray: {
                    dark: '#1a1a1a',
                    medium: '#2d2d2d',
                    light: '#404040',
                }
            }
        },
        daisyui: {
            themes: [{
                luxury: {
                    "primary": "#d4af37",
                    "secondary": "#f4d03f",
                    "accent": "#b8960e",
                    "neutral": "#404040",
                    "base-100": "#0a0a0a",
                    "base-200": "#1a1a1a",
                    "base-300": "#2d2d2d",
                }
            }]
        }
    }
}
```

### 夜间模式样式

夜间模式核心样式在 [src/style/widget.css](src/style/widget.css:398-565):

```css
.mod-calendar.mode-night {
    background: #000000;
    color: #d4af37;
}

.mod-calendar.mode-night .info .day {
    background: linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #b8960e 100%);
    color: #0a0a0a;
}

.mod-calendar.mode-night table td.active a {
    border: 1px solid #d4af37;
    background: #d4af37;
    color: #0a0a0a;
}
```

## 构建系统

### Rollup 配置 ([rollup.config.mjs](rollup.config.mjs))

**输出文件**:
1. `dist/calendar.min.js` - UMD 格式核心库
2. `dist/calendar.min.mjs` - ES Module 格式核心库
3. `dist/widget-calendar.min.js` - 日历组件
4. `dist/countdown-timer.min.js` - 倒计时组件

**插件链**:
- `@rollup/plugin-node-resolve` - 解析 node_modules
- `rollup-plugin-import-assert` - Import assertions 支持
- `@rollup/plugin-terser` - 代码压缩
- `@rollup/plugin-babel` - ES6+ 转译

**Babel 配置**:
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-syntax-import-attributes"
  ]
}
```

### 构建命令

```bash
# 安装依赖
npm install

# 生产构建
npm run build

# 开发模式(监听文件变化)
npm run watch
```

## 页面布局

### 主页面结构 ([index.html](index.html))

```html
<html lang="zh-CN" data-theme="luxury">
<body>
    <main class="container mx-auto px-4 py-8 min-h-screen">
        <div class="w-full max-w-4xl mx-auto flex flex-col gap-0">
            <!-- 倒计时区域 -->
            <section class="w-full">
                <countdown-timer theme="night" target="2026-02-17T00:00:00"></countdown-timer>
            </section>

            <!-- 日历区域 -->
            <section class="w-full">
                <widget-calendar mode="night"></widget-calendar>
            </section>
        </div>
    </main>
</body>
</html>
```

**布局特点**:
- 纯黑背景 (`background: #000000`)
- 垂直布局,倒计时在上,日历在下
- `gap-0` 最小化组件间距
- 响应式容器,最大宽度 `max-w-4xl`
- 无导航栏,无页脚,极简设计

### Favicon

SVG Data URI 格式,金色圆形:
```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23f0d577%22/></svg>" />
```

## Shadow DOM 样式隔离

由于使用了 Web Components 的 Shadow DOM,外部样式无法影响组件内部。

**解决方案**:
1. 在组件源文件内部定义样式
2. 使用 CSS 变量作为主题定制接口
3. 通过组件属性控制主题

**示例**:
```javascript
// countdown-timer.js 内部
const theme = {
    bg: isNight ? 'rgba(10, 10, 10, 0)' : '#ffffff',
    textSecondary: isNight ? '#d4af37' : '#4b5563',
    // ...
};
```

## 响应式设计策略

### 1. 容器查询 (@container)

日历组件使用容器查询而非媒体查询:
```css
@container (max-width: 480px) {
    .mod-calendar {
        padding: 12px;
        gap: 12px;
    }
}
```

### 2. CSS Clamp() 函数

倒计时组件使用 `clamp()` 实现流体排版:
```css
/* 最小值, 首选值, 最大值 */
font-size: clamp(18px, 5vw, 42px);
gap: clamp(8px, 2vw, 24px);
padding: clamp(8px, 1.5vw, 16px);
```

### 3. Flexbox 布局

使用 `flex-wrap: nowrap` 保持单行:
```css
.countdown-display {
    display: flex;
    flex-wrap: nowrap;  /* 防止换行 */
}

.time-unit {
    flex: 1;            /* 平均分配空间 */
    min-width: 0;       /* 允许收缩 */
}
```

## 在其他项目中使用

### 1. 作为独立网站

直接在浏览器中打开 `index.html` 即可。

### 2. 使用日历组件

```html
<!-- 加载依赖 -->
<script src="dist/calendar.min.js"></script>
<script src="dist/widget-calendar.min.js"></script>

<!-- 使用组件 -->
<widget-calendar mode="night"></widget-calendar>
```

### 3. 使用倒计时组件

```html
<!-- 加载依赖 -->
<script src="dist/countdown-timer.min.js"></script>

<!-- 使用组件 -->
<countdown-timer theme="night" target="2026-02-17T00:00:00"></countdown-timer>
```

### 4. JavaScript API

```html
<script src="dist/calendar.min.js"></script>
<script>
    // 获取今天的信息
    const today = calendar.getToday();
    console.log(today.lMonthZH + today.lDayZH);  // 农历日期

    // 公历转农历
    const lunarDate = calendar.getDateBySolar(2024, 1, 1);

    // 农历转公历
    const solarDate = calendar.getDateByLunar(2023, 12, 30, false);
</script>
```
## 主要修改内容

相比原项目,本版本新增了:

1. ✨ `mode-night` 夜间模式样式 - 纯黑背景 + 金色强调
2. ✨ `countdown-timer` 倒计时 Web Component - 2026春节倒计时
3. 🎨 定制配色方案 - Black & Gold Luxury Theme
4. 📱 优化的响应式设计 - clamp() 流体排版
5. 🚫 移除导航栏和页脚 - 极简设计
6. 🎯 SVG Favicon - 金色圆形图标

## 技术要点

### Web Components 最佳实践

1. **Shadow DOM 封装**: 样式隔离,避免污染全局
2. **Custom Elements**: 自定义标签,语义化使用
3. **Attributes API**: 声明式属性配置
4. **Lifecycle Callbacks**: `connectedCallback`, `disconnectedCallback`

### CSS 高级技巧

1. **CSS Clamp()**: 无需断点的响应式排版
2. **Container Queries**: 组件级响应式,而非页面级
3. **CSS Variables**: 主题定制接口
4. **Linear Gradient**: 金色渐变效果

### 构建优化

1. **Code Splitting**: 按组件分别打包
2. **Tree Shaking**: Rollup 自动移除未使用代码
3. **Minification**: Terser 压缩代码
4. **Dual Format**: 同时输出 UMD 和 ES Module

## 开发注意事项

### 修改组件样式

由于 Shadow DOM 隔离,必须修改组件源文件:

1. **日历样式**: 修改 [src/style/widget.css](src/style/widget.css)
2. **倒计时样式**: 修改 [src/countdown-timer.js](src/countdown-timer.js) 中的 `styles` 模板字面量

修改后需要重新构建:
```bash
npm run build
```

### 修改主题颜色

1. **全局主题**: 修改 [index.html](index.html) 中的 `tailwind.config`
2. **组件颜色**: 修改对应组件源文件中的 CSS 变量
3. **夜间模式**: 修改 `.mode-night` 相关样式

### 调试技巧

1. **Chrome DevTools**: Shadow DOM 可在 Elements 面板查看
2. **Show user agent shadow DOM**: 可查看浏览器内置 Shadow DOM
3. **container queries**: DevTools 的 Containers 面板查看容器查询状态