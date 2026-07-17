// SupeRAppenderBasic Component Script
export const SupeRAppenderBasicComp = {
    name: 'SupeRAppenderBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAppenderBasic initialized');
        },
        render(data) {
            return `<div class="SupeRAppenderBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAppenderBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAppenderBasicComp;
