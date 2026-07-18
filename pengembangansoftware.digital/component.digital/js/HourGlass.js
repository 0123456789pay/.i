// HourGlass Component Script
export const HourGlassComp = {
    name: 'HourGlass',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HourGlass initialized');
        },
        render(data) {
            return `<div class="HourGlass-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HourGlass destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HourGlassComp;
