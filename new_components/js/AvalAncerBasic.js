// AvalAncerBasic Component Script
export const AvalAncerBasicComp = {
    name: 'AvalAncerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AvalAncerBasic initialized');
        },
        render(data) {
            return `<div class="AvalAncerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AvalAncerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AvalAncerBasicComp;
