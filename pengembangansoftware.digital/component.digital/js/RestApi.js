// RestApi Component Script
export const RestApiComp = {
    name: 'RestApi',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RestApi initialized');
        },
        render(data) {
            return `<div class="RestApi-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RestApi destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RestApiComp;
