// ReplIca Component Script
export const ReplIcaComp = {
    name: 'ReplIca',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ReplIca initialized');
        },
        render(data) {
            return `<div class="ReplIca-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ReplIca destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ReplIcaComp;
