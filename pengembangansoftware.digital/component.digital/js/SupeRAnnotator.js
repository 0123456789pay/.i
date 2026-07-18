// SupeRAnnotator Component Script
export const SupeRAnnotatorComp = {
    name: 'SupeRAnnotator',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotator initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotator-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotator destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorComp;
