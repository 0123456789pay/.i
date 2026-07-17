// BrowSerBasic Component Script
export const BrowSerBasicComp = {
    name: 'BrowSerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BrowSerBasic initialized');
        },
        render(data) {
            return `<div class="BrowSerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BrowSerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BrowSerBasicComp;
