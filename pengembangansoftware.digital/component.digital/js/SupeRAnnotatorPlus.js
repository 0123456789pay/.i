// SupeRAnnotatorPlus Component Script
export const SupeRAnnotatorPlusComp = {
    name: 'SupeRAnnotatorPlus',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorPlus initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorPlus-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorPlus destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorPlusComp;
