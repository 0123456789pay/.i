// AccoUntLite Component Script
export const AccoUntLiteComp = {
    name: 'AccoUntLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AccoUntLite initialized');
        },
        render(data) {
            return `<div class="AccoUntLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AccoUntLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AccoUntLiteComp;
