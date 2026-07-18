// JackPlug Component Script
export const JackPlugComp = {
    name: 'JackPlug',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('JackPlug initialized');
        },
        render(data) {
            return `<div class="JackPlug-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('JackPlug destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default JackPlugComp;
