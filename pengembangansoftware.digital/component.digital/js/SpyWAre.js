// SpyWAre Component Script
export const SpyWAreComp = {
    name: 'SpyWAre',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SpyWAre initialized');
        },
        render(data) {
            return `<div class="SpyWAre-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SpyWAre destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SpyWAreComp;
