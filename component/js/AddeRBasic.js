// AddeRBasic Component Script
export const AddeRBasicComp = {
    name: 'AddeRBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AddeRBasic initialized');
        },
        render(data) {
            return `<div class="AddeRBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AddeRBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AddeRBasicComp;
