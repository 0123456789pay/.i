// SupeRAggregatorBasic Component Script
export const SupeRAggregatorBasicComp = {
    name: 'SupeRAggregatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAggregatorBasic initialized');
        },
        render(data) {
            return `<div class="SupeRAggregatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAggregatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAggregatorBasicComp;
