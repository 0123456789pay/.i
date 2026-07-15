// WidgEtBox Component Script
export const WidgEtBoxComp = {
    name: 'WidgEtBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('WidgEtBox initialized');
        },
        render(data) {
            return `<div class="WidgEtBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('WidgEtBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default WidgEtBoxComp;
