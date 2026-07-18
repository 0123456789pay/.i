// BridGeBasic Component Script
export const BridGeBasicComp = {
    name: 'BridGeBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BridGeBasic initialized');
        },
        render(data) {
            return `<div class="BridGeBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BridGeBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BridGeBasicComp;
