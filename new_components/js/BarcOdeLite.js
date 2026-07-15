// BarcOdeLite Component Script
export const BarcOdeLiteComp = {
    name: 'BarcOdeLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BarcOdeLite initialized');
        },
        render(data) {
            return `<div class="BarcOdeLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BarcOdeLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BarcOdeLiteComp;
