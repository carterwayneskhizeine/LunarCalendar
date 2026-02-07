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
        // Black & Blue Theme Colors
        const theme = {
            bg: isNight ? 'rgba(10, 10, 10, 0)' : '#ffffff',
            textPrimary: isNight ? '#e0e0e0' : '#1f2937',
            textSecondary: isNight ? '#25aef3' : '#4b5563',
            accent: isNight ? '#4dc9f7' : '#d926a9',
            border: isNight ? 'rgba(37, 174, 243, 0.3)' : '#e5e7eb',
            msgColor: isNight ? '#a0a0a0' : '#6b7280'
        };

        const styles = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
                    --bg-color: ${theme.bg};
                    --text-primary: ${theme.textPrimary};
                    --text-secondary: ${theme.textSecondary};
                    --accent-color: ${theme.accent};
                    --border-color: ${theme.border};
                    --msg-color: ${theme.msgColor};
                }

                .countdown-container {
                    background: var(--bg-color);
                    padding: 8px;
                    text-align: center;
                    border-radius: 16px;
                    /* Glassmorphism support if needed, otherwise handled by parent */
                }

                .countdown-title {
                    color: var(--msg-color);
                    font-size: 16px;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 500;
                }

                .countdown-display {
                    display: flex;
                    justify-content: center;
                    gap: clamp(8px, 2vw, 24px);
                    flex-wrap: nowrap;
                }

                .time-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    min-width: 0;
                    padding: clamp(8px, 1.5vw, 16px);
                    background: rgba(0,0,0,0.2);
                    border-radius: 12px;
                    border: none;
                    backdrop-filter: blur(4px);
                }

                .time-value {
                    font-size: clamp(18px, 5vw, 42px);
                    font-weight: 800;
                    color: var(--text-secondary);
                    line-height: 1;
                    margin-bottom: clamp(4px, 1vw, 8px);
                    font-variant-numeric: tabular-nums;
                    text-shadow: 0 2px 10px rgba(37, 174, 243, 0.3);
                }

                .time-label {
                    font-size: clamp(10px, 2vw, 14px);
                    color: var(--msg-color);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                }

                .target-date {
                    margin-top: 24px;
                    color: var(--accent-color);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                @media (max-width: 480px) {
                    .countdown-container {
                        padding: 4px;
                    }
                }
            </style>
        `;

        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="countdown-container">
                <!-- <div class="countdown-title">距离农历丙午年春节还有</div> -->
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
                <!-- <div class="target-date">2026年2月17日 春节</div> -->
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
