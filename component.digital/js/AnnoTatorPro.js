// AnnoTatorPro Component Script
export const AnnoTatorProComp = {
    name: 'AnnoTatorPro',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorPro initialized');
        },
        render(data) {
            return `<div class="AnnoTatorPro-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorPro destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorProComp;
