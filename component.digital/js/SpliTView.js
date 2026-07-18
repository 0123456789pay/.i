// SpliTView Component Script
export const SpliTViewComp = {
    name: 'SpliTView',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SpliTView initialized');
        },
        render(data) {
            return `<div class="SpliTView-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SpliTView destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SpliTViewComp;
