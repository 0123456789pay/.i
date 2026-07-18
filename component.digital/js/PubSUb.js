// PubSUb Component Script
export const PubSUbComp = {
    name: 'PubSUb',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PubSUb initialized');
        },
        render(data) {
            return `<div class="PubSUb-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PubSUb destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PubSUbComp;
