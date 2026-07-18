// BeacOnBasic Component Script
export const BeacOnBasicComp = {
    name: 'BeacOnBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BeacOnBasic initialized');
        },
        render(data) {
            return `<div class="BeacOnBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BeacOnBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BeacOnBasicComp;
