// PerfMon Component Script
export const PerfMonComp = {
    name: 'PerfMon',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PerfMon initialized');
        },
        render(data) {
            return `<div class="PerfMon-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PerfMon destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PerfMonComp;
