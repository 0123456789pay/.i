// WheeLSpin Component Script
export const WheeLSpinComp = {
    name: 'WheeLSpin',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('WheeLSpin initialized');
        },
        render(data) {
            return `<div class="WheeLSpin-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('WheeLSpin destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default WheeLSpinComp;
