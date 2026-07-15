// ChecKBox Component Script
export const ChecKBoxComp = {
    name: 'ChecKBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ChecKBox initialized');
        },
        render(data) {
            return `<div class="ChecKBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ChecKBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ChecKBoxComp;
