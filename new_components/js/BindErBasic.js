// BindErBasic Component Script
export const BindErBasicComp = {
    name: 'BindErBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BindErBasic initialized');
        },
        render(data) {
            return `<div class="BindErBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BindErBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BindErBasicComp;
