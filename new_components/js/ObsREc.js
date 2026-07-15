// ObsREc Component Script
export const ObsREcComp = {
    name: 'ObsREc',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ObsREc initialized');
        },
        render(data) {
            return `<div class="ObsREc-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ObsREc destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ObsREcComp;
