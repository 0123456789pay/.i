// ArchIverBasic Component Script
export const ArchIverBasicComp = {
    name: 'ArchIverBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ArchIverBasic initialized');
        },
        render(data) {
            return `<div class="ArchIverBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ArchIverBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ArchIverBasicComp;
