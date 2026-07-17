// SupeRBrowserBasic Component Script
export const SupeRBrowserBasicComp = {
    name: 'SupeRBrowserBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SupeRBrowserBasic initialized');
        },
        render(data) {
            return `<div class="SupeRBrowserBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SupeRBrowserBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SupeRBrowserBasicComp;
