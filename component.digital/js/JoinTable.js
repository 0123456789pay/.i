// JoinTable Component Script
export const JoinTableComp = {
    name: 'JoinTable',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('JoinTable initialized');
        },
        render(data) {
            return `<div class="JoinTable-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('JoinTable destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default JoinTableComp;
