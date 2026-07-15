// HardDisk Component Script
export const HardDiskComp = {
    name: 'HardDisk',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('HardDisk initialized');
        },
        render(data) {
            return `<div class="HardDisk-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('HardDisk destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default HardDiskComp;
