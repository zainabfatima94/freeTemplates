class ProjectCursor {
    constructor() {
        this.cursors = {
            1: document.querySelector('.project-1.project-cursor'),
            2: document.querySelector('.project-2.project-cursor'),
            3: document.querySelector('.project-3.project-cursor')
        };
        
        this.projects = {
            1: document.querySelector('.project-1'),
            2: document.querySelector('.project-2'),
            3: document.querySelector('.project-3')
        };
        
        this.activeCursor = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.updateActiveCursorPosition();
        });
        
        // Set up hover events for each project
        Object.keys(this.projects).forEach(projectNum => {
            const project = this.projects[projectNum];
            const cursor = this.cursors[projectNum];
            
            if (project && cursor) {
                project.addEventListener('mouseenter', () => this.showCursor(projectNum));
                project.addEventListener('mouseleave', () => this.hideCursor(projectNum));
                project.addEventListener('mousemove', (e) => {
                    this.mouseX = e.clientX;
                    this.mouseY = e.clientY;
                    this.updateActiveCursorPosition();
                });
            }
        });
        
        // Update cursor position on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveCursorPosition();
        });
        
        // Initialize GSAP for smooth movement
        this.setupGSAP();
    }
    
    showCursor(projectNum) {
        // Hide any active cursor first
        if (this.activeCursor) {
            this.hideCursor(this.activeCursor);
        }
        
        const cursor = this.cursors[projectNum];
        if (cursor) {
            cursor.classList.add('active');
            this.activeCursor = projectNum;
            
            // Position cursor at mouse
            cursor.style.left = `${this.mouseX - cursor.offsetWidth / 2}px`;
            cursor.style.top = `${this.mouseY - cursor.offsetHeight / 2}px`;
            
            // Add active state to project
            this.projects[projectNum].classList.add('cursor-active');
        }
    }
    
    hideCursor(projectNum) {
        const cursor = this.cursors[projectNum];
        if (cursor) {
            cursor.classList.remove('active');
            
            // Remove active state from project
            if (this.projects[projectNum]) {
                this.projects[projectNum].classList.remove('cursor-active');
            }
            
            if (this.activeCursor === projectNum) {
                this.activeCursor = null;
            }
        }
    }
    
    updateActiveCursorPosition() {
        if (this.activeCursor) {
            const cursor = this.cursors[this.activeCursor];
            if (cursor) {
                const offsetX = cursor.offsetWidth / 2;
                const offsetY = cursor.offsetHeight / 2;
                
                cursor.style.left = `${this.mouseX - offsetX}px`;
                cursor.style.top = `${this.mouseY - offsetY}px`;
            }
        }
    }
    
    setupGSAP() {
        // Smooth cursor movement with GSAP
        gsap.ticker.add(() => {
            if (this.activeCursor) {
                const cursor = this.cursors[this.activeCursor];
                if (cursor) {
                    const currentLeft = parseFloat(cursor.style.left) || 0;
                    const currentTop = parseFloat(cursor.style.top) || 0;
                    const targetLeft = this.mouseX - cursor.offsetWidth / 2;
                    const targetTop = this.mouseY - cursor.offsetHeight / 2;
                    
                    // Smooth interpolation
                    const newLeft = currentLeft + (targetLeft - currentLeft) * 0.2;
                    const newTop = currentTop + (targetTop - currentTop) * 0.2;
                    
                    cursor.style.left = `${newLeft}px`;
                    cursor.style.top = `${newTop}px`;
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCursor();
});