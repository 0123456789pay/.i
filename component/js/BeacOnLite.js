// BeacOnLite Component Script
export const BeacOnLiteComp = {
    name: 'BeacOnLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BeacOnLite initialized');
        },
        render(data) {
            return `<div class="BeacOnLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BeacOnLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BeacOnLiteComp;
