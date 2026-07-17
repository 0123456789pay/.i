// HtmlTag Component Script
export const HtmlTagComp = {
    name: 'HtmlTag',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HtmlTag initialized');
        },
        render(data) {
            return `<div class="HtmlTag-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HtmlTag destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HtmlTagComp;
