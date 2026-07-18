// BannErLite Component Script
export const BannErLiteComp = {
    name: 'BannErLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BannErLite initialized');
        },
        render(data) {
            return `<div class="BannErLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BannErLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BannErLiteComp;
