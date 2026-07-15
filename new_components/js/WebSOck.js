// WebSOck Component Script
export const WebSOckComp = {
    name: 'WebSOck',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('WebSOck initialized');
        },
        render(data) {
            return `<div class="WebSOck-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('WebSOck destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default WebSOckComp;
