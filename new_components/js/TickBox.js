// TickBox Component Script
export const TickBoxComp = {
    name: 'TickBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TickBox initialized');
        },
        render(data) {
            return `<div class="TickBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TickBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TickBoxComp;
