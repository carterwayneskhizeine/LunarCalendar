# 农历夜历 - 2026春节倒计时

> 基于优秀的开源项目 [mumuy/calendar](https://github.com/mumuy/calendar) 修改而来的夜间模式版本

## 项目简介

这是一个现代化的夜间模式农历日历网站,具有以下特点:

- **夜间模式设计** - 极简扁平设计,深色背景护眼舒适
- **春节倒计时** - 实时倒计时至2026年2月17日(农历丙午年春节)
- **响应式布局** - 完美适配桌面端和移动设备
- **开源算法** - 基于 GB/T33661—2017 标准的农历公历换算

## 在线预览

直接打开 `index.html` 即可使用,无需服务器环境。

## 主要特性

### 🌙 夜间模式
- 深色背景 (#0a0a0a) 减少眼睛疲劳
- 扁平化设计,无圆角、无阴影
- 高对比度配色,文字清晰易读

### 📅 日历功能
- 支持1900-2100年农历公历转换
- 显示干支、生肖、节气、节日
- 休假日/工作日标记
- 今天日期高亮显示

### ⏰ 倒计时组件
- 实时显示距离2026年春节的天数、时、分、秒
- 自动更新,精准计时
- 支持自定义目标日期和主题

## 原项目

本项目基于 [mumuy/calendar](https://github.com/mumuy/calendar) 修改而来:

- **原项目**: [https://github.com/mumuy/calendar](https://github.com/mumuy/calendar)
- **作者**: mumuy
- **协议**: MIT License

## 修改内容

相比原项目,本版本新增了:

1. ✨ 新增 `mode-night` 夜间模式样式
2. ✨ 新增 `countdown-timer` 倒计时 Web Component
3. ✨ 新增夜间模式落地页 `index.html`
4. ✨ 更新构建配置,支持倒计时组件打包

## 使用方法

### 作为独立网站使用

直接在浏览器中打开 `index.html` 即可。

### 在其他项目中使用

#### 使用日历组件

```html
<widget-calendar mode="night"></widget-calendar>
```

#### 使用倒计时组件

```html
<countdown-timer theme="night" target="2026-02-17T00:00:00"></countdown-timer>
```

#### JavaScript API

```js
// 获取指定公历日期的农历信息
calendar.getDateBySolar(2024, 1, 1);

// 获取指定农历日期的公历信息
calendar.getDateByLunar(2023, 2, 10, true); // 2023年闰二月初十

// 获取今天的日期信息
calendar.getToday();
```

## 返回数据格式

```js
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

## 构建说明

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 监听模式
npm run watch
```

构建后会生成以下文件:
- `dist/calendar.min.js` - 日历核心库
- `dist/calendar.min.mjs` - ES Module 版本
- `dist/widget-calendar.min.js` - 日历组件
- `dist/countdown-timer.min.js` - 倒计时组件

## 技术栈

- **原生 JavaScript** - 无框架依赖
- **Web Component** - 使用 Shadow DOM 实现组件化
- **Rollup** - 模块打包
- **Babel** - ES6+ 转译

## 开源协议

基于原项目的 MIT License 开源。

## 致谢

感谢 [mumuy/calendar](https://github.com/mumuy/calendar) 提供的优秀的农历公历转换算法和日历组件。
