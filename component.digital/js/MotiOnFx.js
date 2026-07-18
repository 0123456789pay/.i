// MotiOnFx Component Script
export const MotiOnFxComp = {
    name: 'MotiOnFx',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MotiOnFx initialized');
        },
        render(data) {
            return `<div class="MotiOnFx-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MotiOnFx destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MotiOnFxComp;
