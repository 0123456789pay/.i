// ListBox Component Script
export const ListBoxComp = {
    name: 'ListBox',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('ListBox initialized');
        },
        render(data) {
            return `<div class="ListBox-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('ListBox destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default ListBoxComp;
