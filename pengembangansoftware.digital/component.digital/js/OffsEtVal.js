// OffsEtVal Component Script
export const OffsEtValComp = {
    name: 'OffsEtVal',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OffsEtVal initialized');
        },
        render(data) {
            return `<div class="OffsEtVal-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OffsEtVal destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OffsEtValComp;
