// FileDrop Component Script
export const FileDropComp = {
    name: 'FileDrop',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('FileDrop initialized');
        },
        render(data) {
            return `<div class="FileDrop-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('FileDrop destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default FileDropComp;
