// WinPOpup Component Script
export const WinPOpupComp = {
    name: 'WinPOpup',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('WinPOpup initialized');
        },
        render(data) {
            return `<div class="WinPOpup-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('WinPOpup destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default WinPOpupComp;
