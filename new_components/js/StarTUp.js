// StarTUp Component Script
export const StarTUpComp = {
    name: 'StarTUp',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('StarTUp initialized');
        },
        render(data) {
            return `<div class="StarTUp-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('StarTUp destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default StarTUpComp;
