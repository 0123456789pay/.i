// RefLInk Component Script
export const RefLInkComp = {
    name: 'RefLInk',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RefLInk initialized');
        },
        render(data) {
            return `<div class="RefLInk-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RefLInk destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RefLInkComp;
