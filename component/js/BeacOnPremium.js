// BeacOnPremium Component Script
export const BeacOnPremiumComp = {
    name: 'BeacOnPremium',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BeacOnPremium initialized');
        },
        render(data) {
            return `<div class="BeacOnPremium-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BeacOnPremium destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BeacOnPremiumComp;
