// ImgZOom Component Script
export const ImgZOomComp = {
    name: 'ImgZOom',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ImgZOom initialized');
        },
        render(data) {
            return `<div class="ImgZOom-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ImgZOom destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ImgZOomComp;
