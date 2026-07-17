// TinyMce Component Script
export const TinyMceComp = {
    name: 'TinyMce',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TinyMce initialized');
        },
        render(data) {
            return `<div class="TinyMce-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TinyMce destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TinyMceComp;
