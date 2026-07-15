// HalfMoon Component Script
export const HalfMoonComp = {
    name: 'HalfMoon',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HalfMoon initialized');
        },
        render(data) {
            return `<div class="HalfMoon-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HalfMoon destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HalfMoonComp;
