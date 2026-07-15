// StdOUt Component Script
export const StdOUtComp = {
    name: 'StdOUt',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('StdOUt initialized');
        },
        render(data) {
            return `<div class="StdOUt-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('StdOUt destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default StdOUtComp;
