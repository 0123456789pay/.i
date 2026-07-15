// AccoUntBasic Component Script
export const AccoUntBasicComp = {
    name: 'AccoUntBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AccoUntBasic initialized');
        },
        render(data) {
            return `<div class="AccoUntBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AccoUntBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AccoUntBasicComp;
