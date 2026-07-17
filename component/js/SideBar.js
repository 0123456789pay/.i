// SideBar Component Script
export const SideBarComp = {
    name: 'SideBar',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('SideBar initialized');
        },
        render(data) {
            return `<div class="SideBar-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('SideBar destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default SideBarComp;
