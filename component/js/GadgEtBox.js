// GadgEtBox Component Script
export const GadgEtBoxComp = {
    name: 'GadgEtBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('GadgEtBox initialized');
        },
        render(data) {
            return `<div class="GadgEtBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('GadgEtBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default GadgEtBoxComp;
