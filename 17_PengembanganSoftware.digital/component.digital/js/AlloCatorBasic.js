// AlloCatorBasic Component Script
export const AlloCatorBasicComp = {
    name: 'AlloCatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AlloCatorBasic initialized');
        },
        render(data) {
            return `<div class="AlloCatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AlloCatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AlloCatorBasicComp;
