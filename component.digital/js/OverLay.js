// OverLay Component Script
export const OverLayComp = {
    name: 'OverLay',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OverLay initialized');
        },
        render(data) {
            return `<div class="OverLay-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OverLay destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OverLayComp;
