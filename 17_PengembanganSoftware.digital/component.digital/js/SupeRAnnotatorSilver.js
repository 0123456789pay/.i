// SupeRAnnotatorSilver Component Script
export const SupeRAnnotatorSilverComp = {
    name: 'SupeRAnnotatorSilver',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorSilver initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorSilver-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorSilver destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorSilverComp;
