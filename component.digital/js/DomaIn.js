// DomaIn Component Script
export const DomaInComp = {
    name: 'DomaIn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DomaIn initialized');
        },
        render(data) {
            return `<div class="DomaIn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DomaIn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DomaInComp;
