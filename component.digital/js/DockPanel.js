// DockPanel Component Script
export const DockPanelComp = {
    name: 'DockPanel',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DockPanel initialized');
        },
        render(data) {
            return `<div class="DockPanel-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DockPanel destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DockPanelComp;
