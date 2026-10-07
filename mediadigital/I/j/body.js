/**
 * ALLUNIVERS ICONER - Body Module
 * utama isi area pengendali
 */

class IconerBody {
    constructor() {
        this.content = '';
        this.sections = [];
        this.activeSection = null;
    }

    setContent(html) {
        this.content = html;
        this.render();
    }

    addSection(sectionData) {
        this.sections.push(sectionData);
        this.render();
    }

    setActiveSection(sectionId) {
        this.activeSection = sectionId;
        this.render();
    }

    render() {
        const body = document.getElementById('iconer-body');
        if (!body) return;

        body.innerHTML = `
            <div class="body-container">
                ${this.content}
                <div class="sections">
                    ${this.sections.map(section => `
                        <section id="${section.id}" class="body-section ${section.id === this.activeSection ? 'active' : ''}">
                            ${section.content}
                        </section>
                    `).join('')}
                </div>
            </div>
        `;
    }

    clear() {
        this.content = '';
        this.sections = [];
        this.activeSection = null;
        this.render();
    }
}

// otomatis-mulai
if (typeof window !== 'undefined') {
    window.IconerBody = new IconerBody();
}
