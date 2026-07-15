// ForwArdRef Component Script
export const ForwArdRefComp = {
    name: 'ForwArdRef',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ForwArdRef initialized');
        },
        render(data) {
            return `<div class="ForwArdRef-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ForwArdRef destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ForwArdRefComp;
