// BuilDerBasic Component Script
export const BuilDerBasicComp = {
    name: 'BuilDerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BuilDerBasic initialized');
        },
        render(data) {
            return `<div class="BuilDerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BuilDerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BuilDerBasicComp;
