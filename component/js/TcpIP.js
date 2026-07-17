// TcpIP Component Script
export const TcpIPComp = {
    name: 'TcpIP',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('TcpIP initialized');
        },
        render(data) {
            return `<div class="TcpIP-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('TcpIP destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default TcpIPComp;
