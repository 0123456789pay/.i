// PlugIn Component Script
export const PlugInComp = {
    name: 'PlugIn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PlugIn initialized');
        },
        render(data) {
            return `<div class="PlugIn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PlugIn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PlugInComp;
