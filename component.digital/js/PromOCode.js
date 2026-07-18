// PromOCode Component Script
export const PromOCodeComp = {
    name: 'PromOCode',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PromOCode initialized');
        },
        render(data) {
            return `<div class="PromOCode-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PromOCode destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PromOCodeComp;
