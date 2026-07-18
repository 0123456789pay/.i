// OutBOund Component Script
export const OutBOundComp = {
    name: 'OutBOund',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('OutBOund initialized');
        },
        render(data) {
            return `<div class="OutBOund-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('OutBOund destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default OutBOundComp;
