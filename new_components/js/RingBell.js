// RingBell Component Script
export const RingBellComp = {
    name: 'RingBell',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RingBell initialized');
        },
        render(data) {
            return `<div class="RingBell-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RingBell destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RingBellComp;
