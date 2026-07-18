// ScanDoc Component Script
export const ScanDocComp = {
    name: 'ScanDoc',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ScanDoc initialized');
        },
        render(data) {
            return `<div class="ScanDoc-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ScanDoc destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ScanDocComp;
