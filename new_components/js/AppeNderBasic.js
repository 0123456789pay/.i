// AppeNderBasic Component Script
export const AppeNderBasicComp = {
    name: 'AppeNderBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AppeNderBasic initialized');
        },
        render(data) {
            return `<div class="AppeNderBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AppeNderBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AppeNderBasicComp;
