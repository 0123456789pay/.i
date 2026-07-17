// SupeRBottomNavBasic Component Script
export const SupeRBottomNavBasicComp = {
    name: 'SupeRBottomNavBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBottomNavBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBottomNavBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBottomNavBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBottomNavBasicComp;
