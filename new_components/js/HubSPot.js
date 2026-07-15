// HubSPot Component Script
export const HubSPotComp = {
    name: 'HubSPot',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HubSPot initialized');
        },
        render(data) {
            return `<div class="HubSPot-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HubSPot destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HubSPotComp;
