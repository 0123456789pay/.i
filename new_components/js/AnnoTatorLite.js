// AnnoTatorLite Component Script
export const AnnoTatorLiteComp = {
    name: 'AnnoTatorLite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorLite initialized');
        },
        render(data) {
            return `<div class="AnnoTatorLite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorLite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorLiteComp;
