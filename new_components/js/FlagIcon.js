// FlagIcon Component Script
export const FlagIconComp = {
    name: 'FlagIcon',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('FlagIcon initialized');
        },
        render(data) {
            return `<div class="FlagIcon-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('FlagIcon destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default FlagIconComp;
