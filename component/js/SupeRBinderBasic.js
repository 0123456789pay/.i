// SupeRBinderBasic Component Script
export const SupeRBinderBasicComp = {
    name: 'SupeRBinderBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBinderBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBinderBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBinderBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBinderBasicComp;
