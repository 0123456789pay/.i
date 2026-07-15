// MiniMap Component Script
export const MiniMapComp = {
    name: 'MiniMap',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MiniMap initialized');
        },
        render(data) {
            return `<div class="MiniMap-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MiniMap destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MiniMapComp;
