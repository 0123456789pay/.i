// SupeRBuilderBasic Component Script
export const SupeRBuilderBasicComp = {
    name: 'SupeRBuilderBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBuilderBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBuilderBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBuilderBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBuilderBasicComp;
