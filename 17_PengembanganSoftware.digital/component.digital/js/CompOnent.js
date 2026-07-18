// CompOnent Component Script
export const CompOnentComp = {
    name: 'CompOnent',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('CompOnent initialized');
        },
        render(data) {
            return `<div class="CompOnent-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('CompOnent destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default CompOnentComp;
