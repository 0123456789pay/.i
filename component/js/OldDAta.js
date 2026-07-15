// OldDAta Component Script
export const OldDAtaComp = {
    name: 'OldDAta',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OldDAta initialized');
        },
        render(data) {
            return `<div class="OldDAta-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OldDAta destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OldDAtaComp;
