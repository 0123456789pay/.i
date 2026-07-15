// ActiVatorLite Component Script
export const ActiVatorLiteComp = {
    name: 'ActiVatorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ActiVatorLite initialized');
        },
        render(data) {
            return `<div class="ActiVatorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ActiVatorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ActiVatorLiteComp;
