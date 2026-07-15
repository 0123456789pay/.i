import os

# Templates untuk JS
js_templates = [
    '''// {name}.js - Component for handling {func}
export default function {camelName}(config) {{
    const element = document.createElement('div');
    element.className = '{cssClass}';
    element.innerHTML = '<h2>{title}</h2><p>{desc}</p>';
    
    this.init = function() {{
        document.body.appendChild(element);
        console.log('{name} initialized');
    }};
    
    this.update = function(data) {{
        element.querySelector('p').textContent = data;
    }};
    
    this.destroy = function() {{
        element.remove();
    }};
    
    return {{ init: this.init, update: this.update, destroy: this.destroy }};
}}
''',
    '''// {name}.js - Module for {func}
const {camelName} = (() => {{
    let state = {{ count: 0, active: false }};
    
    function render() {{
        return `<div class="{cssClass}">${{state.count}}</div>`;
    }}
    
    function increment() {{
        state.count++;
        return render();
    }}
    
    function toggle() {{
        state.active = !state.active;
        return state.active;
    }}
    
    return {{ render, increment, toggle, getState: () => state }};
}})();

export default {camelName};
''',
    '''// {name}.js - Utility for {func}
export function {camelName}(options = {{}}) {{
    const defaults = {{
        timeout: 1000,
        retries: 3,
        callback: null
    }};
    
    const config = {{ ...defaults, ...options }};
    
    this.execute = async function() {{
        console.log('Executing {name} with config:', config);
        return new Promise(resolve => {{
            setTimeout(() => resolve('Success'), config.timeout);
        }});
    }};
    
    this.validate = function(input) {{
        return input !== null && input !== undefined;
    }};
    
    return this;
}}
''',
    '''// {name}.js - Handler for {func}
class {pascalName} {{
    constructor(selector) {{
        this.element = document.querySelector(selector);
        this.events = [];
    }}
    
    bind(event, callback) {{
        this.events.push({{ event, callback }});
        if (this.element) {{
            this.element.addEventListener(event, callback);
        }}
        return this;
    }}
    
    emit(eventName, data) {{
        const event = new CustomEvent(eventName, {{ detail: data }});
        if (this.element) {{
            this.element.dispatchEvent(event);
        }}
    }}
    
    destroy() {{
        this.events.forEach(({{ event, callback }}) => {{
            if (this.element) {{
                this.element.removeEventListener(event, callback);
            }}
        }});
    }}
}}

export default {pascalName};
''',
    '''// {name}.js - Service for {func}
const {camelName}Service = {{
    baseUrl: '/api/{kebabName}',
    
    async fetch(id) {{
        const response = await fetch(`${{this.baseUrl}}/${{id}}`);
        return response.json();
    }},
    
    async create(data) {{
        const response = await fetch(this.baseUrl, {{
            method: 'POST',
            headers: {{ 'Content-Type': 'application/json' }},
            body: JSON.stringify(data)
        }});
        return response.json();
    }},
    
    async update(id, data) {{
        const response = await fetch(`${{this.baseUrl}}/${{id}}`, {{
            method: 'PUT',
            headers: {{ 'Content-Type': 'application/json' }},
            body: JSON.stringify(data)
        }});
        return response.json();
    }},
    
    async delete(id) {{
        const response = await fetch(`${{this.baseUrl}}/${{id}}`, {{
            method: 'DELETE'
        }});
        return response.ok;
    }}
}};

export default {camelName}Service;
'''
]

# Templates untuk CSS
css_templates = [
    '''/* {name}.css - Styles for {func} */
.{cssClass} {{
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}}

.{cssClass}:hover {{
    transform: translateY(-5px);
}}

.{cssClass} h2 {{
    margin: 0 0 10px 0;
    font-size: 1.5rem;
}}

.{cssClass} p {{
    margin: 0;
    opacity: 0.9;
}}
''',
    '''/* {name}.css - Theme for {func} */
.{cssClass} {{
    position: relative;
    overflow: hidden;
    padding: 25px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    background-color: #ffffff;
}}

.{cssClass}::before {{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #ff6b6b, #feca57);
}}

.{cssClass} .content {{
    margin-left: 15px;
}}

@keyframes pulse {{
    0%, 100% {{ opacity: 1; }}
    50% {{ opacity: 0.7; }}
}}

.{cssClass}.loading {{
    animation: pulse 1.5s infinite;
}}
''',
    '''/* {name}.css - Layout for {func} */
.{cssClass} {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 30px;
    background: #f8f9fa;
}}

.{cssClass}-item {{
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s;
}}

.{cssClass}-item:hover {{
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}}

@media (max-width: 768px) {{
    .{cssClass} {{
        grid-template-columns: 1fr;
        padding: 15px;
    }}
}}
''',
    '''/* {name}.css - Animation for {func} */
.{cssClass} {{
    position: relative;
    padding: 40px 20px;
    text-align: center;
    background: #2c3e50;
    color: #ecf0f1;
    border-radius: 10px;
}}

.{cssClass}-btn {{
    display: inline-block;
    padding: 12px 30px;
    margin-top: 20px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
}}

.{cssClass}-btn:hover {{
    background: #c0392b;
    transform: scale(1.05);
}}

@keyframes fadeIn {{
    from {{ opacity: 0; transform: translateY(20px); }}
    to {{ opacity: 1; transform: translateY(0); }}
}}

.{cssClass} {{
    animation: fadeIn 0.5s ease-out;
}}
''',
    '''/* {name}.css - Card style for {func} */
.{cssClass} {{
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
}}

.{cssClass}::after {{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #00d2ff, #3a7bd5);
}}

.{cssClass}-header {{
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}}

.{cssClass}-body {{
    color: #666;
    line-height: 1.6;
}}
'''
]

# Data untuk generating nama
prefixes = ['App', 'Web', 'Net', 'Sys', 'Dev', 'Pro', 'Max', 'Flex', 'Smart', 'Quick', 
            'Easy', 'Fast', 'Best', 'Top', 'New', 'Super', 'Ultra', 'Mega', 'Hyper', 'Turbo',
            'Auto', 'Dyna', 'Micro', 'Nano', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta',
            'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
            'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon',
            'Phi', 'Chi', 'Psi', 'Omega', 'Prime', 'Elite', 'Core', 'Edge', 'Cloud', 'Data']

middles = ['Form', 'View', 'List', 'Grid', 'Card', 'Panel', 'Box', 'Wrap', 'Zone', 'Area',
           'Mode', 'Type', 'Kind', 'Sort', 'Item', 'Unit', 'Part', 'Section', 'Block', 'Group',
           'Stack', 'Queue', 'Tree', 'Graph', 'Node', 'Link', 'Path', 'Route', 'Port', 'Gate',
           'Base', 'Core', 'Hub', 'Lab', 'Pod', 'Set', 'Map', 'Key', 'Tag', 'Slot',
           'Bar', 'Tab', 'Pan', 'Nav', 'Menu', 'Tool', 'Kit', 'Lib', 'Api', 'Sdk',
           'Bot', 'Net', 'Web', 'App', 'Sys', 'Dev', 'Ops', 'Sec', 'Infra', 'Arch']

suffixes = ['Mgr', 'Ctrl', 'Hand', 'Proc', 'Serv', 'Work', 'Flow', 'Task', 'Job', 'Run',
            'Exec', 'Load', 'Save', 'Read', 'Write', 'Fetch', 'Push', 'Pull', 'Send', 'Recv',
            'Pack', 'Unpack', 'Comp', 'Decomp', 'Enc', 'Dec', 'Hash', 'Sign', 'Verify', 'Auth',
            'Login', 'Logout', 'Reg', 'Sub', 'Unsub', 'Notif', 'Alert', 'Warn', 'Error', 'Log',
            'Trace', 'Debug', 'Test', 'Mock', 'Stub', 'Fake', 'Real', 'Live', 'Demo', 'Sample']

functions = ['user management', 'data processing', 'form validation', 'API integration', 'state management',
             'event handling', 'routing', 'authentication', 'authorization', 'caching',
             'logging', 'error handling', 'notification', 'animation', 'transition',
             'layout', 'styling', 'theming', 'responsive design', 'accessibility',
             'performance optimization', 'memory management', 'resource loading', 'image processing',
             'file upload', 'download management', 'search functionality', 'filtering', 'sorting',
             'pagination', 'infinite scroll', 'lazy loading', 'code splitting', 'bundle optimization',
             'testing', 'debugging', 'monitoring', 'analytics', 'tracking',
             'reporting', 'dashboard', 'visualization', 'chart rendering', 'graph display',
             'table management', 'list rendering', 'grid layout', 'card display', 'modal handling',
             'tooltip display', 'popover management', 'dropdown handling', 'menu navigation', 'breadcrumb',
             'wizard steps', 'progress tracking', 'status indication', 'loading states', 'empty states',
             'error states', 'success messages', 'warning alerts', 'info notifications', 'toast messages',
             'snackbar display', 'banner ads', 'popup windows', 'dialog boxes', 'confirmation prompts',
             'input fields', 'text areas', 'select boxes', 'radio buttons', 'checkboxes',
             'toggle switches', 'sliders', 'range inputs', 'date pickers', 'time selectors',
             'color pickers', 'file inputs', 'drag drop', 'copy paste', 'clipboard operations',
             'keyboard shortcuts', 'mouse events', 'touch gestures', 'voice commands', 'gesture recognition',
             'biometric auth', 'two factor', 'password reset', 'email verification', 'phone verification',
             'social login', 'oauth integration', 'jwt handling', 'session management', 'cookie handling',
             'local storage', 'session storage', 'indexed db', 'web sockets', 'server sent events',
             'push notifications', 'service workers', 'offline support', 'pwa features', 'install prompts',
             'update detection', 'version control', 'rollback support', 'feature flags', 'ab testing',
             'experimentation', 'personalization', 'recommendation', 'prediction', 'machine learning',
             'ai integration', 'chatbot support', 'natural language', 'speech recognition', 'text analysis',
             'sentiment analysis', 'image recognition', 'object detection', 'face recognition', 'qr scanning',
             'barcode reading', 'document parsing', 'pdf generation', 'excel export', 'csv import',
             'json parsing', 'xml handling', 'yaml processing', 'markdown rendering', 'html sanitization',
             'css preprocessing', 'sass compilation', 'less processing', 'stylus support', 'postcss plugins',
             'webpack config', 'rollup bundling', 'vite building', 'parcel packaging', 'esbuild compiling',
             'babel transpiling', 'typescript checking', 'flow typing', 'eslint linting', 'prettier formatting',
             'stylelint rules', 'jest testing', 'mocha specs', 'jasmine suites', 'cypress e2e',
             'playwright tests', 'puppeteer automation', 'selenium grids', 'docker containers', 'kubernetes orchestration',
             'ci cd pipelines', 'github actions', 'gitlab ci', 'jenkins jobs', 'travis builds',
             'circleci workflows', 'bitbucket pipes', 'azure devops', 'aws deployment', 'gcp hosting',
             'azure services', 'digitalocean droplets', 'heroku apps', 'netlify sites', 'vercel deployments',
             'cloudflare cdn', 'fastly edge', 'akamai caching', 'cloudfront distribution', 'route53 dns',
             'load balancing', 'auto scaling', 'health checks', 'monitoring alerts', 'log aggregation',
             'metric collection', 'trace analysis', 'profiling tools', 'performance budgets', 'lighthouse audits',
             'seo optimization', 'accessibility audit', 'security scanning', 'dependency checking', 'vulnerability detection',
             'license compliance', 'code review', 'pull requests', 'merge conflicts', 'branch protection',
             'release management', 'changelog generation', 'semantic versioning', 'package publishing', 'npm registry',
             'yarn workspaces', 'pnpm store', 'monorepo management', 'turbo repo', 'nx workspace',
             'lerna bootstrap', 'changesets version', 'commitlint rules', 'husky hooks', 'lint staged files',
             'pre commit checks', 'git flow workflow', 'github flow', 'gitlab flow', 'trunk based development',
             'feature branches', 'hotfix patches', 'release candidates', 'beta versions', 'alpha releases',
             'nightly builds', 'snapshot versions', 'stable releases', 'lts support', 'end of life',
             'migration guides', 'upgrade paths', 'breaking changes', 'deprecation notices', 'sunset plans',
             'documentation site', 'api reference', 'getting started', 'tutorial guides', 'example projects',
             'code snippets', 'best practices', 'design patterns', 'architecture decisions', 'technical debt',
             'refactoring efforts', 'performance tuning', 'memory leaks', 'cpu optimization', 'network latency',
             'database queries', 'index optimization', 'query caching', 'connection pooling', 'transaction management',
             'replication setup', 'sharding strategy', 'backup procedures', 'disaster recovery', 'business continuity',
             'compliance requirements', 'gdpr regulations', 'hipaa standards', 'pci dss rules', 'iso certifications',
             'soc audits', 'penetration testing', 'security headers', 'cors policies', 'csp directives',
             'xss prevention', 'csrf tokens', 'sql injection', 'nosql injection', 'command injection',
             'path traversal', 'file inclusion', 'remote code', 'denial service', 'brute force attacks',
             'rate limiting', 'throttling requests', 'ip blocking', 'geo blocking', 'ddos protection',
             'waf rules', 'bot detection', 'captcha challenges', 'honeypot traps', 'fraud detection',
             'anomaly detection', 'threat intelligence', 'incident response', 'forensics analysis', 'malware scanning',
             'virus detection', 'ransomware protection', 'phishing prevention', 'spam filtering', 'content moderation',
             'user generated', 'community driven', 'open source', 'proprietary software', 'commercial license',
             'enterprise edition', 'community edition', 'free tier', 'paid plans', 'subscription model',
             'pay per use', 'freemium offering', 'trial period', 'money back', 'refund policy',
             'customer support', 'technical assistance', 'live chat', 'ticket system', 'knowledge base',
             'faq section', 'video tutorials', 'webinar series', 'conference talks', 'meetup groups',
             'developer relations', 'advocate program', 'ambassador network', 'partner ecosystem', 'integration marketplace',
             'plugin directory', 'extension store', 'addon catalog', 'theme gallery', 'template library',
             'component showcase', 'demo applications', 'starter kits', 'boilerplate code', 'scaffold generator',
             'cli tooling', 'gui interface', 'desktop app', 'mobile app', 'progressive web',
             'hybrid solution', 'native module', 'cross platform', 'universal code', 'isomorphic javascript',
             'server side', 'client side', 'edge computing', 'fog computing', 'distributed systems',
             'microservices architecture', 'service mesh', 'api gateway', 'message queue', 'event bus',
             'pub sub pattern', 'request response', 'grpc protocol', 'rest api', 'graphql endpoint',
             'websocket connection', 'sse stream', 'long polling', 'short polling', 'heartbeat mechanism',
             'keep alive', 'connection retry', 'exponential backoff', 'circuit breaker', 'bulkhead pattern',
             'retry policy', 'timeout handling', 'fallback logic', 'cache aside', 'write through',
             'read replica', 'master slave', 'multi master', 'eventual consistency', 'strong consistency',
             'cap theorem', 'acid properties', 'base principles', ' Saga pattern', 'cqrs design',
             'event sourcing', 'domain driven', 'hexagonal architecture', 'clean architecture', 'ddd principles',
             'tactical patterns', 'strategic patterns', 'bounded context', 'aggregate root', 'value object',
             'entity mapping', 'repository pattern', 'unit of work', 'factory method', 'abstract factory',
             'builder pattern', 'prototype clone', 'singleton instance', 'adapter wrapper', 'bridge abstraction',
             'composite tree', 'decorator enhancement', 'facade simplification', 'flyweight sharing', 'proxy access',
             'chain responsibility', 'command encapsulation', 'interpreter evaluation', 'iterator traversal', 'mediator coordination',
             'memento snapshot', 'observer notification', 'state transition', 'strategy algorithm', 'template method',
             'visitor operation', 'null object', 'specification filter', 'transfer object', 'interceptor hook',
             'front controller', 'application service', 'business delegate', 'service locator', 'data mapper',
             'identity map', 'lazy loading', 'eager fetching', 'n plus one', 'batch processing',
             'stream processing', 'real time analytics', 'batch analytics', 'online analytical', 'operational data',
             'data warehouse', 'data lake', 'data mart', 'etl pipeline', 'elt process',
             'change data', 'capture log', 'binlog replication', 'wal shipping', 'cdc streaming',
             'schema evolution', 'versioning strategy', 'backward compatible', 'forward compatible', 'contract first',
             'code first', 'design first', 'api first', 'mobile first', 'desktop first',
             'cloud first', 'on premise', 'hybrid cloud', 'multi cloud', 'edge deployment']

def generate_name(index):
    prefix = prefixes[index % len(prefixes)]
    middle = middles[(index // len(prefixes)) % len(middles)]
    suffix = suffixes[(index // (len(prefixes) * len(middles))) % len(suffixes)]
    return prefix + middle + suffix

def to_camel(name):
    return name[0].lower() + name[1:]

def to_pascal(name):
    return name[0].upper() + name[1:]

def to_kebab(name):
    result = ''
    for i, char in enumerate(name):
        if i > 0 and char.isupper():
            result += '-'
        result += char.lower()
    return result

def to_css_class(name):
    return to_kebab(name)

# Generate 1800 components
js_dir = 'components_js'
css_dir = 'components_css'

os.makedirs(js_dir, exist_ok=True)
os.makedirs(css_dir, exist_ok=True)

all_components = []

for i in range(1800):
    name = generate_name(i)
    func = functions[i % len(functions)]
    camel_name = to_camel(name)
    pascal_name = to_pascal(name)
    kebab_name = to_kebab(name)
    css_class = to_css_class(name)
    
    # Generate JS file
    js_template = js_templates[i % len(js_templates)]
    js_content = js_template.format(
        name=name,
        camelName=camel_name,
        pascalName=pascal_name,
        kebabName=kebab_name,
        cssClass=css_class,
        func=func,
        title=f'{name} Component',
        desc=f'Handles {func}'
    )
    
    js_filename = f'{name}.js'
    with open(os.path.join(js_dir, js_filename), 'w') as f:
        f.write(js_content)
    
    # Generate CSS file
    css_template = css_templates[i % len(css_templates)]
    css_content = css_template.format(
        name=name,
        camelName=camel_name,
        pascalName=pascal_name,
        kebabName=kebab_name,
        cssClass=css_class,
        func=func
    )
    
    css_filename = f'{name}.css'
    with open(os.path.join(css_dir, css_filename), 'w') as f:
        f.write(css_content)
    
    all_components.append({
        'id': i + 1,
        'name': name,
        'jsFile': js_filename,
        'cssFile': css_filename,
        'function': func,
        'camelCase': camel_name,
        'pascalCase': pascal_name,
        'kebabCase': kebab_name,
        'cssClass': css_class
    })

print(f'Generated {len(all_components)} components')
print(f'JS files: {len(os.listdir(js_dir))}')
print(f'CSS files: {len(os.listdir(css_dir))}')
