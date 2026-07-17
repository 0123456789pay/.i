// OnBoArd Component Script
export const OnBoArdComp = {
    name: 'OnBoArd',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OnBoArd initialized');
        },
        render(data) {
            return `<div class="OnBoArd-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OnBoArd destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OnBoArdComp;
