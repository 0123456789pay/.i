// DummY Component Script
export const DummYComp = {
    name: 'DummY',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DummY initialized');
        },
        render(data) {
            return `<div class="DummY-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DummY destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DummYComp;
