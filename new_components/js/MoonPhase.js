// MoonPhase Component Script
export const MoonPhaseComp = {
    name: 'MoonPhase',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MoonPhase initialized');
        },
        render(data) {
            return `<div class="MoonPhase-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MoonPhase destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MoonPhaseComp;
