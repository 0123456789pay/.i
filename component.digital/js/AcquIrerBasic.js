// AcquIrerBasic Component Script
export const AcquIrerBasicComp = {
    name: 'AcquIrerBasic',
    type: 'component',
    version: '1.0.0',
    config: {
        enabled: true,
        theme: 'default',
        size: 'medium'
    },
    methods: {
        init() {
            console.log('AcquIrerBasic initialized');
        },
        render(data) {
            return `<div class="AcquIrerBasic-container">${JSON.stringify(data)}</div>`;
        },
        destroy() {
            console.log('AcquIrerBasic destroyed');
        }
    },
    events: ['click', 'change', 'focus', 'blur'],
    props: ['id', 'class', 'style', 'data']
};

export default AcquIrerBasicComp;
