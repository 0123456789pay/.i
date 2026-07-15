// FlyOUt Component Script
export const FlyOUtComp = {
    name: 'FlyOUt',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('FlyOUt initialized');
        },
        render(data) {
            return `<div class="FlyOUt-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('FlyOUt destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default FlyOUtComp;
