// ApprOverBasic Component Script
export const ApprOverBasicComp = {
    name: 'ApprOverBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ApprOverBasic initialized');
        },
        render(data) {
            return `<div class="ApprOverBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ApprOverBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ApprOverBasicComp;
