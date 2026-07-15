// GetPAram Component Script
export const GetPAramComp = {
    name: 'GetPAram',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('GetPAram initialized');
        },
        render(data) {
            return `<div class="GetPAram-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('GetPAram destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default GetPAramComp;
