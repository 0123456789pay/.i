// VoltMeter Component Script
export const VoltMeterComp = {
    name: 'VoltMeter',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('VoltMeter initialized');
        },
        render(data) {
            return `<div class="VoltMeter-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('VoltMeter destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default VoltMeterComp;
