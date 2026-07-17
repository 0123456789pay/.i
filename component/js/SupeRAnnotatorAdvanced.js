// SupeRAnnotatorAdvanced Component Script
export const SupeRAnnotatorAdvancedComp = {
    name: 'SupeRAnnotatorAdvanced',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorAdvanced initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorAdvanced-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorAdvanced destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorAdvancedComp;
