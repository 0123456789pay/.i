// SupeRAnnotatorLite Component Script
export const SupeRAnnotatorLiteComp = {
    name: 'SupeRAnnotatorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorLite initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorLiteComp;
