// LeadForm Component Script
export const LeadFormComp = {
    name: 'LeadForm',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('LeadForm initialized');
        },
        render(data) {
            return `<div class="LeadForm-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('LeadForm destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default LeadFormComp;
