// BoxMOCompDellite Component Script
export const BoxMOCompDelliteComp = {
    name: 'BoxMOCompDellite',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BoxMOCompDellite initialized');
        },
        render(data) {
            return `<div class="BoxMOCompDellite-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BoxMOCompDellite destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BoxMOCompDelliteComp;
