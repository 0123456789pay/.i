// SendMail Component Script
export const SendMailComp = {
    name: 'SendMail',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SendMail initialized');
        },
        render(data) {
            return `<div class="SendMail-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SendMail destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SendMailComp;
