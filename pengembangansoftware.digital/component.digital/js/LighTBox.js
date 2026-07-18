// LighTBox Component Script
export const LighTBoxComp = {
    name: 'LighTBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('LighTBox initialized');
        },
        render(data) {
            return `<div class="LighTBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('LighTBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default LighTBoxComp;
