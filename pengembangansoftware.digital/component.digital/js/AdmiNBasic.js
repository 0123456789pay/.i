// AdmiNBasic Component Script
export const AdmiNBasicComp = {
    name: 'AdmiNBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AdmiNBasic initialized');
        },
        render(data) {
            return `<div class="AdmiNBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AdmiNBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AdmiNBasicComp;
