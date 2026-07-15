// OffCAnvas Component Script
export const OffCAnvasComp = {
    name: 'OffCAnvas',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OffCAnvas initialized');
        },
        render(data) {
            return `<div class="OffCAnvas-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OffCAnvas destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OffCAnvasComp;
