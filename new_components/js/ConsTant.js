// ConsTant Component Script
export const ConsTantComp = {
    name: 'ConsTant',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ConsTant initialized');
        },
        render(data) {
            return `<div class="ConsTant-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ConsTant destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ConsTantComp;
