// VectOrG Component Script
export const VectOrGComp = {
    name: 'VectOrG',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('VectOrG initialized');
        },
        render(data) {
            return `<div class="VectOrG-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('VectOrG destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default VectOrGComp;
