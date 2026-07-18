// HttpReq Component Script
export const HttpReqComp = {
    name: 'HttpReq',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HttpReq initialized');
        },
        render(data) {
            return `<div class="HttpReq-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HttpReq destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HttpReqComp;
