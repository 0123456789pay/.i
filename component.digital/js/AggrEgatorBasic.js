// AggrEgatorBasic Component Script
export const AggrEgatorBasicComp = {
    name: 'AggrEgatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AggrEgatorBasic initialized');
        },
        render(data) {
            return `<div class="AggrEgatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AggrEgatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AggrEgatorBasicComp;
