// DialOg Component Script
export const DialOgComp = {
    name: 'DialOg',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DialOg initialized');
        },
        render(data) {
            return `<div class="DialOg-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DialOg destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DialOgComp;
