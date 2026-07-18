// TestUnit Component Script
export const TestUnitComp = {
    name: 'TestUnit',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TestUnit initialized');
        },
        render(data) {
            return `<div class="TestUnit-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TestUnit destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TestUnitComp;
