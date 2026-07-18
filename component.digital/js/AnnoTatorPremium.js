// AnnoTatorPremium Component Script
export const AnnoTatorPremiumComp = {
    name: 'AnnoTatorPremium',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorPremium initialized');
        },
        render(data) {
            return `<div class="AnnoTatorPremium-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorPremium destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorPremiumComp;
