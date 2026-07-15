// AdapTerBasic Component Script
export const AdapTerBasicComp = {
    name: 'AdapTerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AdapTerBasic initialized');
        },
        render(data) {
            return `<div class="AdapTerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AdapTerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AdapTerBasicComp;
