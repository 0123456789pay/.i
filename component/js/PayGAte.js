// PayGAte Component Script
export const PayGAteComp = {
    name: 'PayGAte',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PayGAte initialized');
        },
        render(data) {
            return `<div class="PayGAte-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PayGAte destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PayGAteComp;
