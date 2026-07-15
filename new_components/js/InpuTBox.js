// InpuTBox Component Script
export const InpuTBoxComp = {
    name: 'InpuTBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('InpuTBox initialized');
        },
        render(data) {
            return `<div class="InpuTBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('InpuTBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default InpuTBoxComp;
