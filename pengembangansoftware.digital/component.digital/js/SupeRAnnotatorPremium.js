// SupeRAnnotatorPremium Component Script
export const SupeRAnnotatorPremiumComp = {
    name: 'SupeRAnnotatorPremium',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnnotatorPremium initialized');
        },
        render(data) {
            return `<div class="SupeRAnnotatorPremium-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnnotatorPremium destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnnotatorPremiumComp;
