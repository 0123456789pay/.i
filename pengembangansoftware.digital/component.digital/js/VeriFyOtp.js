// VeriFyOtp Component Script
export const VeriFyOtpComp = {
    name: 'VeriFyOtp',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('VeriFyOtp initialized');
        },
        render(data) {
            return `<div class="VeriFyOtp-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('VeriFyOtp destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default VeriFyOtpComp;
