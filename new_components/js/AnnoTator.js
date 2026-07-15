// AnnoTator Component Script
export const AnnoTatorComp = {
    name: 'AnnoTator',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnnoTator initialized');
        },
        render(data) {
            return `<div class="AnnoTator-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnnoTator destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnnoTatorComp;
