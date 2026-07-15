// DigiTal Component Script
export const DigiTalComp = {
    name: 'DigiTal',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DigiTal initialized');
        },
        render(data) {
            return `<div class="DigiTal-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DigiTal destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DigiTalComp;
