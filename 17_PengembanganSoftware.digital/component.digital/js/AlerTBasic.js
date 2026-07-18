// AlerTBasic Component Script
export const AlerTBasicComp = {
    name: 'AlerTBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AlerTBasic initialized');
        },
        render(data) {
            return `<div class="AlerTBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AlerTBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AlerTBasicComp;
