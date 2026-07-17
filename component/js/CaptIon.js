// CaptIon Component Script
export const CaptIonComp = {
    name: 'CaptIon',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('CaptIon initialized');
        },
        render(data) {
            return `<div class="CaptIon-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('CaptIon destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default CaptIonComp;
