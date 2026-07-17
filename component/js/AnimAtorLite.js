// AnimAtorLite Component Script
export const AnimAtorLiteComp = {
    name: 'AnimAtorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnimAtorLite initialized');
        },
        render(data) {
            return `<div class="AnimAtorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnimAtorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnimAtorLiteComp;
