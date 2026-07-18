// SupeRBorderBasic Component Script
export const SupeRBorderBasicComp = {
    name: 'SupeRBorderBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBorderBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBorderBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBorderBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBorderBasicComp;
