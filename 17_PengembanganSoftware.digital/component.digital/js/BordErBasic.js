// BordErBasic Component Script
export const BordErBasicComp = {
    name: 'BordErBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BordErBasic initialized');
        },
        render(data) {
            return `<div class="BordErBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BordErBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BordErBasicComp;
