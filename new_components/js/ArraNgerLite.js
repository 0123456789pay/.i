// ArraNgerLite Component Script
export const ArraNgerLiteComp = {
    name: 'ArraNgerLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ArraNgerLite initialized');
        },
        render(data) {
            return `<div class="ArraNgerLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ArraNgerLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ArraNgerLiteComp;
