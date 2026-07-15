// SupeRBarcodeBasic Component Script
export const SupeRBarcodeBasicComp = {
    name: 'SupeRBarcodeBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBarcodeBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBarcodeBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBarcodeBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBarcodeBasicComp;
