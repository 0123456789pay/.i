// InstAllApp Component Script
export const InstAllAppComp = {
    name: 'InstAllApp',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('InstAllApp initialized');
        },
        render(data) {
            return `<div class="InstAllApp-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('InstAllApp destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default InstAllAppComp;
