// PanZOom Component Script
export const PanZOomComp = {
    name: 'PanZOom',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PanZOom initialized');
        },
        render(data) {
            return `<div class="PanZOom-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PanZOom destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PanZOomComp;
