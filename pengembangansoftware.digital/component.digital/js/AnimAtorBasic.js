// AnimAtorBasic Component Script
export const AnimAtorBasicComp = {
    name: 'AnimAtorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AnimAtorBasic initialized');
        },
        render(data) {
            return `<div class="AnimAtorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AnimAtorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AnimAtorBasicComp;
