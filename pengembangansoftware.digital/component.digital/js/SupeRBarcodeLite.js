// SupeRBarcodeLite Component Script
export const SupeRBarcodeLiteComp = {
    name: 'SupeRBarcodeLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBarcodeLite initialized');
        },
        render(data) {
            return `<div class="SupeRBarcodeLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBarcodeLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBarcodeLiteComp;
