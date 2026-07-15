// LogiNBox Component Script
export const LogiNBoxComp = {
    name: 'LogiNBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('LogiNBox initialized');
        },
        render(data) {
            return `<div class="LogiNBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('LogiNBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default LogiNBoxComp;
