// AnnoTatorPlus Component Script
export const AnnoTatorPlusComp = {
    name: 'AnnoTatorPlus',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorPlus initialized');
        },
        render(data) {
            return `<div class="AnnoTatorPlus-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorPlus destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorPlusComp;
