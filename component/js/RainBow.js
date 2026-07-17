// RainBow Component Script
export const RainBowComp = {
    name: 'RainBow',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RainBow initialized');
        },
        render(data) {
            return `<div class="RainBow-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RainBow destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RainBowComp;
