// MetaTag Component Script
export const MetaTagComp = {
    name: 'MetaTag',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MetaTag initialized');
        },
        render(data) {
            return `<div class="MetaTag-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MetaTag destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MetaTagComp;
