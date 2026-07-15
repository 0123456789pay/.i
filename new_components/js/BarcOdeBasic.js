// BarcOdeBasic Component Script
export const BarcOdeBasicComp = {
    name: 'BarcOdeBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BarcOdeBasic initialized');
        },
        render(data) {
            return `<div class="BarcOdeBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BarcOdeBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BarcOdeBasicComp;
