// InfoBox Component Script
export const InfoBoxComp = {
    name: 'InfoBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('InfoBox initialized');
        },
        render(data) {
            return `<div class="InfoBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('InfoBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default InfoBoxComp;
