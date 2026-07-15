// BeacOn Component Script
export const BeacOnComp = {
    name: 'BeacOn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BeacOn initialized');
        },
        render(data) {
            return `<div class="BeacOn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BeacOn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BeacOnComp;
