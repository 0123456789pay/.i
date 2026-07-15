// AnnoTator18 Component Script
export const AnnoTator18Comp = {
    name: 'AnnoTator18',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTator18 initialized');
        },
        render(data) {
            return `<div class="AnnoTator18-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTator18 destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTator18Comp;
