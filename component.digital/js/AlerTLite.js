// AlerTLite Component Script
export const AlerTLiteComp = {
    name: 'AlerTLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AlerTLite initialized');
        },
        render(data) {
            return `<div class="AlerTLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AlerTLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AlerTLiteComp;
