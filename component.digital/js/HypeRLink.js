// HypeRLink Component Script
export const HypeRLinkComp = {
    name: 'HypeRLink',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HypeRLink initialized');
        },
        render(data) {
            return `<div class="HypeRLink-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HypeRLink destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HypeRLinkComp;
