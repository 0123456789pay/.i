// MacrOCmd Component Script
export const MacrOCmdComp = {
    name: 'MacrOCmd',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MacrOCmd initialized');
        },
        render(data) {
            return `<div class="MacrOCmd-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MacrOCmd destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MacrOCmdComp;
