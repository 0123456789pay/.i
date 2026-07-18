// AligNerBasic Component Script
export const AligNerBasicComp = {
    name: 'AligNerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AligNerBasic initialized');
        },
        render(data) {
            return `<div class="AligNerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AligNerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AligNerBasicComp;
