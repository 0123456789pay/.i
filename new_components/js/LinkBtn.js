// LinkBtn Component Script
export const LinkBtnComp = {
    name: 'LinkBtn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('LinkBtn initialized');
        },
        render(data) {
            return `<div class="LinkBtn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('LinkBtn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default LinkBtnComp;
