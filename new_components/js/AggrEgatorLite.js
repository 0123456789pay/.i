// AggrEgatorLite Component Script
export const AggrEgatorLiteComp = {
    name: 'AggrEgatorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AggrEgatorLite initialized');
        },
        render(data) {
            return `<div class="AggrEgatorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AggrEgatorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AggrEgatorLiteComp;
