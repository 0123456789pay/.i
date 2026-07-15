// VoicECmd Component Script
export const VoicECmdComp = {
    name: 'VoicECmd',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('VoicECmd initialized');
        },
        render(data) {
            return `<div class="VoicECmd-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('VoicECmd destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default VoicECmdComp;
