// AdapTerLite Component Script
export const AdapTerLiteComp = {
    name: 'AdapTerLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AdapTerLite initialized');
        },
        render(data) {
            return `<div class="AdapTerLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AdapTerLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AdapTerLiteComp;
