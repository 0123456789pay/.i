// ActiVatorBasic Component Script
export const ActiVatorBasicComp = {
    name: 'ActiVatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ActiVatorBasic initialized');
        },
        render(data) {
            return `<div class="ActiVatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ActiVatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ActiVatorBasicComp;
