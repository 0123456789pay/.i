// SupeRAnimatorBasic Component Script
export const SupeRAnimatorBasicComp = {
    name: 'SupeRAnimatorBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRAnimatorBasic initialized');
        },
        render(data) {
            return `<div class="SupeRAnimatorBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRAnimatorBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRAnimatorBasicComp;
