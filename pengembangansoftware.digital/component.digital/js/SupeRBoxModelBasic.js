// SupeRBoxModelBasic Component Script
export const SupeRBoxModelBasicComp = {
    name: 'SupeRBoxModelBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBoxModelBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBoxModelBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBoxModelBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBoxModelBasicComp;
