// AvalAncerLite Component Script
export const AvalAncerLiteComp = {
    name: 'AvalAncerLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AvalAncerLite initialized');
        },
        render(data) {
            return `<div class="AvalAncerLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AvalAncerLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AvalAncerLiteComp;
