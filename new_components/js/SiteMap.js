// SiteMap Component Script
export const SiteMapComp = {
    name: 'SiteMap',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SiteMap initialized');
        },
        render(data) {
            return `<div class="SiteMap-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SiteMap destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SiteMapComp;
