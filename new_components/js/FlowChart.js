// FlowChart Component Script
export const FlowChartComp = {
    name: 'FlowChart',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('FlowChart initialized');
        },
        render(data) {
            return `<div class="FlowChart-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('FlowChart destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default FlowChartComp;
