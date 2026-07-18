// SupeRAnnotatorPro Component Script
export const SupeRAnnotatorProComp = {
    name: 'SupeRAnnotatorPro',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorPro initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorPro-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorPro destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorProComp;
