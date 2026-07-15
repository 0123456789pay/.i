// TipBOx Component Script
export const TipBOxComp = {
    name: 'TipBOx',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TipBOx initialized');
        },
        render(data) {
            return `<div class="TipBOx-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TipBOx destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TipBOxComp;
