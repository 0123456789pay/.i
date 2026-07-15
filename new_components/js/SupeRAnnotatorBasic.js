// SupeRAnnotatorBasic Component Script
export const SupeRAnnotatorBasicComp = {
    name: 'SupeRAnnotatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorBasic initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorBasicComp;
