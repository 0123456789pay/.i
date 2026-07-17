// SupeRAllocatorBasic Component Script
export const SupeRAllocatorBasicComp = {
    name: 'SupeRAllocatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAllocatorBasic initialized');
        },
        render(data) {
            return `<div class="SupeRAllocatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAllocatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAllocatorBasicComp;
