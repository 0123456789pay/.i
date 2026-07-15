// CaptUre Component Script
export const CaptUreComp = {
    name: 'CaptUre',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('CaptUre initialized');
        },
        render(data) {
            return `<div class="CaptUre-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('CaptUre destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default CaptUreComp;
