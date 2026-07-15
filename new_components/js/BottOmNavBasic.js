// BottOmNavBasic Component Script
export const BottOmNavBasicComp = {
    name: 'BottOmNavBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BottOmNavBasic initialized');
        },
        render(data) {
            return `<div class="BottOmNavBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BottOmNavBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BottOmNavBasicComp;
