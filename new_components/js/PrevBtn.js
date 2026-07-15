// PrevBtn Component Script
export const PrevBtnComp = {
    name: 'PrevBtn',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('PrevBtn initialized');
        },
        render(data) {
            return `<div class="PrevBtn-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('PrevBtn destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default PrevBtnComp;
