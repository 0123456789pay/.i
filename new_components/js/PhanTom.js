// PhanTom Component Script
export const PhanTomComp = {
    name: 'PhanTom',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PhanTom initialized');
        },
        render(data) {
            return `<div class="PhanTom-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PhanTom destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PhanTomComp;
