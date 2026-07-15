// PicUPload Component Script
export const PicUPloadComp = {
    name: 'PicUPload',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PicUPload initialized');
        },
        render(data) {
            return `<div class="PicUPload-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PicUPload destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PicUPloadComp;
