// BottOmNavLite Component Script
export const BottOmNavLiteComp = {
    name: 'BottOmNavLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BottOmNavLite initialized');
        },
        render(data) {
            return `<div class="BottOmNavLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BottOmNavLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BottOmNavLiteComp;
