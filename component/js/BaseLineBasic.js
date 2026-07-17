// BaseLineBasic Component Script
export const BaseLineBasicComp = {
    name: 'BaseLineBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('BaseLineBasic initialized');
        },
        render(data) {
            return `<div class="BaseLineBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('BaseLineBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default BaseLineBasicComp;
