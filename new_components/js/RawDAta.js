// RawDAta Component Script
export const RawDAtaComp = {
    name: 'RawDAta',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('RawDAta initialized');
        },
        render(data) {
            return `<div class="RawDAta-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('RawDAta destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default RawDAtaComp;
