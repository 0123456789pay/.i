// DireCtLink Component Script
export const DireCtLinkComp = {
    name: 'DireCtLink',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DireCtLink initialized');
        },
        render(data) {
            return `<div class="DireCtLink-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DireCtLink destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DireCtLinkComp;
