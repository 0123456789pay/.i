// GlobAlVar Component Script
export const GlobAlVarComp = {
    name: 'GlobAlVar',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('GlobAlVar initialized');
        },
        render(data) {
            return `<div class="GlobAlVar-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('GlobAlVar destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default GlobAlVarComp;
