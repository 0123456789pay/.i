// BannErBasic Component Script
export const BannErBasicComp = {
    name: 'BannErBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BannErBasic initialized');
        },
        render(data) {
            return `<div class="BannErBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BannErBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BannErBasicComp;
