// DoubLeTap Component Script
export const DoubLeTapComp = {
    name: 'DoubLeTap',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DoubLeTap initialized');
        },
        render(data) {
            return `<div class="DoubLeTap-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DoubLeTap destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DoubLeTapComp;
