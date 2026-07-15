// PopUP Component Script
export const PopUPComp = {
    name: 'PopUP',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PopUP initialized');
        },
        render(data) {
            return `<div class="PopUP-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PopUP destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PopUPComp;
