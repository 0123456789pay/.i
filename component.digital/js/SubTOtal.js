// SubTOtal Component Script
export const SubTOtalComp = {
    name: 'SubTOtal',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SubTOtal initialized');
        },
        render(data) {
            return `<div class="SubTOtal-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SubTOtal destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SubTOtalComp;
