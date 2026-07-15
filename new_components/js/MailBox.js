// MailBox Component Script
export const MailBoxComp = {
    name: 'MailBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('MailBox initialized');
        },
        render(data) {
            return `<div class="MailBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('MailBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default MailBoxComp;
