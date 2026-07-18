// AlloCatorLite Component Script
export const AlloCatorLiteComp = {
    name: 'AlloCatorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AlloCatorLite initialized');
        },
        render(data) {
            return `<div class="AlloCatorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AlloCatorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AlloCatorLiteComp;
