// RegFOrm Component Script
export const RegFOrmComp = {
    name: 'RegFOrm',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RegFOrm initialized');
        },
        render(data) {
            return `<div class="RegFOrm-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RegFOrm destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RegFOrmComp;
