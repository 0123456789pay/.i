// CropX Component Script
export const CropXComp = {
    name: 'CropX',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('CropX initialized');
        },
        render(data) {
            return `<div class="CropX-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('CropX destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default CropXComp;
