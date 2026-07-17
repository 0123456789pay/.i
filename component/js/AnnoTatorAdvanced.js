// AnnoTatorAdvanced Component Script
export const AnnoTatorAdvancedComp = {
    name: 'AnnoTatorAdvanced',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorAdvanced initialized');
        },
        render(data) {
            return `<div class="AnnoTatorAdvanced-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorAdvanced destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorAdvancedComp;
