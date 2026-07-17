// InvoIce Component Script
export const InvoIceComp = {
    name: 'InvoIce',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('InvoIce initialized');
        },
        render(data) {
            return `<div class="InvoIce-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('InvoIce destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default InvoIceComp;
