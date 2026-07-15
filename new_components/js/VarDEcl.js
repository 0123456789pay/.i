// VarDEcl Component Script
export const VarDEclComp = {
    name: 'VarDEcl',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('VarDEcl initialized');
        },
        render(data) {
            return `<div class="VarDEcl-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('VarDEcl destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default VarDEclComp;
