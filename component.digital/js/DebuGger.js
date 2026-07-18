// DebuGger Component Script
export const DebuGgerComp = {
    name: 'DebuGger',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DebuGger initialized');
        },
        render(data) {
            return `<div class="DebuGger-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DebuGger destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DebuGgerComp;
