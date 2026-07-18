// RounDBtn Component Script
export const RounDBtnComp = {
    name: 'RounDBtn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RounDBtn initialized');
        },
        render(data) {
            return `<div class="RounDBtn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RounDBtn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RounDBtnComp;
