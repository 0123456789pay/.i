// UnLoCk Component Script
export const UnLoCkComp = {
    name: 'UnLoCk',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('UnLoCk initialized');
        },
        render(data) {
            return `<div class="UnLoCk-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('UnLoCk destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default UnLoCkComp;
