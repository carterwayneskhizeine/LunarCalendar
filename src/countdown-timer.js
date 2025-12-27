/*
* 倒计时组件
* 倒计时至2026年2月17日（农历丙午年春节）
*/
class CountdownTimer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.targetDate = new Date('2026-02-17T00:00:00');
        this.timerInterval = null;
    }

    static get observedAttributes() {
        return ['target', 'theme'];
    }

    get target() {
        return this.getAttribute('target') || '2026-02-17T00:00:00';
    }

    set target(value) {
        this.setAttribute('target', value);
    }

    get theme() {
        return this.getAttribute('theme') || 'night';
    }

    connectedCallback() {
        this.render();
        this.startTimer();
    }

    disconnectedCallback() {
        this.stopTimer();
    }

    render() {
        const isNight = this.theme === 'night';
        const styles = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    --bg-color: ${isNight ? '#1a1a1a' : '#ffffff'};
                    --text-primary: ${isNight ? '#e0e0e0' : '#1a1a1a'};
                    --text-secondary: ${isNight ? '#a0a0a0' : '#666666'};
                    --accent-color: ${isNight ? '#4a9a4a' : '#2095f2'};
                    --border-color: ${isNight ? '#333333' : '#e0e0e0'};
                }

                .countdown-container {
                    background: var(--bg-color);
                    padding: 20px;
                    text-align: center;
                    border: 1px solid var(--border-color);
                }

                .countdown-title {
                    color: var(--text-secondary);
                    font-size: 14px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .countdown-display {
                    display: flex;
                    justify-content: center;
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .time-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 60px;
                }

                .time-value {
                    font-size: 32px;
                    font-weight: bold;
                    color: var(--text-primary);
                    line-height: 1;
                    margin-bottom: 4px;
                }

                .time-label {
                    font-size: 12px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                }

                .target-date {
                    margin-top: 16px;
                    color: var(--accent-color);
                    font-size: 14px;
                }

                @media (max-width: 480px) {
                    .countdown-container {
                        padding: 16px;
                    }

                    .countdown-display {
                        gap: 12px;
                    }

                    .time-unit {
                        min-width: 50px;
                    }

                    .time-value {
                        font-size: 24px;
                    }

                    .time-label {
                        font-size: 10px;
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="countdown-container">
                <div class="countdown-title">距离农历丙午年(马年)春节还有</div>
                <div class="countdown-display">
                    <div class="time-unit">
                        <span class="time-value" id="days">0</span>
                        <span class="time-label">天</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="hours">00</span>
                        <span class="time-label">时</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="minutes">00</span>
                        <span class="time-label">分</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="seconds">00</span>
                        <span class="time-label">秒</span>
                    </div>
                </div>
                <div class="target-date">2026年2月17日 春节</div>
            </div>
        `;

        this.elements = {
            days: this.shadowRoot.getElementById('days'),
            hours: this.shadowRoot.getElementById('hours'),
            minutes: this.shadowRoot.getElementById('minutes'),
            seconds: this.shadowRoot.getElementById('seconds')
        };
    }

    startTimer() {
        this.updateDisplay();
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateDisplay() {
        const now = new Date();
        const diff = this.targetDate - now;

        if (diff <= 0) {
            this.elements.days.textContent = '0';
            this.elements.hours.textContent = '00';
            this.elements.minutes.textContent = '00';
            this.elements.seconds.textContent = '00';
            this.stopTimer();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.elements.days.textContent = days;
        this.elements.hours.textContent = hours.toString().padStart(2, '0');
        this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
        this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'target' && oldValue !== newValue) {
            this.targetDate = new Date(newValue);
            if (this.timerInterval) {
                this.updateDisplay();
            }
        }
        if (name === 'theme' && oldValue !== newValue) {
            this.render();
        }
    }
}

if (!customElements.get('countdown-timer')) {
    customElements.define('countdown-timer', CountdownTimer);
}
