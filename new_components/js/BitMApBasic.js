// BitMApBasic Component Script
export const BitMApBasicComp = {
    name: 'BitMApBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BitMApBasic initialized');
        },
        render(data) {
            return `<div class="BitMApBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BitMApBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BitMApBasicComp;
