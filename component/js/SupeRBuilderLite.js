// SupeRBuilderLite Component Script
export const SupeRBuilderLiteComp = {
    name: 'SupeRBuilderLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBuilderLite initialized');
        },
        render(data) {
            return `<div class="SupeRBuilderLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBuilderLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBuilderLiteComp;
