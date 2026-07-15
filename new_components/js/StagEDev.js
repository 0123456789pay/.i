// StagEDev Component Script
export const StagEDevComp = {
    name: 'StagEDev',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('StagEDev initialized');
        },
        render(data) {
            return `<div class="StagEDev-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('StagEDev destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default StagEDevComp;
