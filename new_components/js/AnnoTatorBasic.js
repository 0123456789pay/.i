// AnnoTatorBasic Component Script
export const AnnoTatorBasicComp = {
    name: 'AnnoTatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorBasic initialized');
        },
        render(data) {
            return `<div class="AnnoTatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorBasicComp;
