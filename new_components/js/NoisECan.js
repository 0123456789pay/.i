// NoisECan Component Script
export const NoisECanComp = {
    name: 'NoisECan',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('NoisECan initialized');
        },
        render(data) {
            return `<div class="NoisECan-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('NoisECan destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default NoisECanComp;
