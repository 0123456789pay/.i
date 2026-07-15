// AnnoTatorSilver Component Script
export const AnnoTatorSilverComp = {
    name: 'AnnoTatorSilver',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTatorSilver initialized');
        },
        render(data) {
            return `<div class="AnnoTatorSilver-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTatorSilver destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorSilverComp;
