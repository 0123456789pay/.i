// TopNAv Component Script
export const TopNAvComp = {
    name: 'TopNAv',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TopNAv initialized');
        },
        render(data) {
            return `<div class="TopNAv-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TopNAv destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TopNAvComp;
