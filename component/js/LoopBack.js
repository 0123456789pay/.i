// LoopBack Component Script
export const LoopBackComp = {
    name: 'LoopBack',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('LoopBack initialized');
        },
        render(data) {
            return `<div class="LoopBack-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('LoopBack destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default LoopBackComp;
