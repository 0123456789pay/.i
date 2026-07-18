// ForLOop Component Script
export const ForLOopComp = {
    name: 'ForLOop',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ForLOop initialized');
        },
        render(data) {
            return `<div class="ForLOop-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ForLOop destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ForLOopComp;
