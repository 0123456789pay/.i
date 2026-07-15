// DoorWay Component Script
export const DoorWayComp = {
    name: 'DoorWay',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('DoorWay initialized');
        },
        render(data) {
            return `<div class="DoorWay-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('DoorWay destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default DoorWayComp;
