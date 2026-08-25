document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Navigation Mapping
    const navMapping = {
        'home': '../gramudyam_home/code.html',
        'analytics': '../start_analysis_location/code.html',
        'insights': '../opportunity_gap_analysis/code.html',
        'groups': '../competitor_deep_dive/code.html',
        'compare_arrows': '../business_alternatives_ai_ranking/code.html',
        'account_balance_wallet': '../gramudyam_financial_plan/code.html',
        'warning': '../risk_radar_management/code.html',
        'description': '../business_feasibility_dashboard/code.html'
    };

    const currentPath = window.location.pathname.toLowerCase();
    const sidebarLinks = document.querySelectorAll('aside nav a');
    
    // Clear all active states first and set new hrefs
    sidebarLinks.forEach(link => {
        const iconSpan = link.querySelector('.material-symbols-outlined');
        if (iconSpan) {
            const iconName = iconSpan.textContent.trim();
            if (navMapping[iconName]) {
                const targetUrl = navMapping[iconName];
                link.href = targetUrl;
                
                // Reset styles to inactive
                link.className = "flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors";
                if(iconSpan.classList.contains('fill')) {
                    iconSpan.classList.remove('fill');
                }
                
                // Extract folder name from targetUrl
                const folderName = targetUrl.split('/')[1];
                
                // If current page matches this link's folder
                if (currentPath.includes(folderName)) {
                    link.className = "flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-l-4 border-primary bg-primary-container/10 transition-transform active:scale-[0.98]";
                    iconSpan.classList.add('fill');
                }
            }
        }
    });

    // 2. Mobile Hamburger Menu
    const header = document.querySelector('header');
    const sidebar = document.querySelector('aside');
    if (header && sidebar) {
        let menuBtn = Array.from(header.querySelectorAll('button')).find(btn => btn.textContent.includes('menu'));
        
        if (!menuBtn) {
            menuBtn = document.createElement('button');
            menuBtn.className = "p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container md:hidden mr-2";
            menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
            header.insertBefore(menuBtn, header.firstChild);
        } else {
            menuBtn.classList.remove('hidden');
            menuBtn.classList.add('md:hidden');
        }

        const backdrop = document.createElement('div');
        backdrop.className = "fixed inset-0 bg-black/50 z-30 hidden transition-opacity opacity-0 md:hidden";
        document.body.appendChild(backdrop);

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('flex');
            
            if (!sidebar.classList.contains('hidden')) {
                backdrop.classList.remove('hidden');
                setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
            } else {
                backdrop.classList.add('opacity-0');
                setTimeout(() => backdrop.classList.add('hidden'), 300);
            }
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.classList.contains('hidden') && window.innerWidth < 768 && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('flex');
                backdrop.classList.add('opacity-0');
                setTimeout(() => backdrop.classList.add('hidden'), 300);
            }
        });
    }

    // 3. Screen Flow Buttons & Interactions
    
    // Category selection toggle in Business Input screen
    if (currentPath.includes('start_analysis_business')) {
        const catButtons = document.querySelectorAll('button.bg-surface-container-lowest.border.rounded-xl');
        catButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                catButtons.forEach(b => {
                    b.classList.remove('border-primary', 'bg-primary/5', 'shadow-md');
                    b.classList.add('border-outline-variant');
                });
                btn.classList.remove('border-outline-variant');
                btn.classList.add('border-primary', 'bg-primary/5', 'shadow-md');
            });
        });
    }
    
    // Header icon actions (language / help / account) and the sidebar
    // Voice Assistant link — placeholders, same pattern as the other
    // not-yet-built actions below.
    const headerActions = {
        'language': 'Language selection would open here.',
        'help': 'Help center would open here.',
        'account_circle': 'Account settings would open here.'
    };
    Object.keys(headerActions).forEach(label => {
        const btn = document.querySelector(`button[aria-label="${label}"]`);
        if (btn) {
            btn.addEventListener('click', () => alert(headerActions[label]));
        }
    });

    document.querySelectorAll('aside nav a, aside a').forEach(link => {
        if (link.textContent.trim().toLowerCase().includes('voice assistant')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Voice assistant would open here.');
            });
        }
    });

    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        
        if (text.includes('talk to gramudyam')) {
            btn.addEventListener('click', () => alert('Voice assistant would open here.'));
        }

        // Home
        if (text.includes('start my business analysis')) {
            btn.addEventListener('click', () => window.location.href = '../start_analysis_location/code.html');
        }
        
        // Location
        if (currentPath.includes('start_analysis_location') && (text.includes('next step') || text === 'next')) {
            btn.addEventListener('click', () => window.location.href = '../start_analysis_business/code.html');
        }
        
        // Business
        if (currentPath.includes('start_analysis_business')) {
            if (text.includes('continue')) {
                btn.addEventListener('click', () => window.location.href = '../start_analysis_capital/code.html');
            } else if (text.includes('back')) {
                btn.addEventListener('click', () => window.location.href = '../start_analysis_location/code.html');
            }
        }
        
        // Capital
        if (currentPath.includes('start_analysis_capital')) {
            if (text.includes('analyze my business')) {
                btn.addEventListener('click', () => window.location.href = '../analyzing_your_business/code.html');
            } else if (text.includes('arrow_back')) {
                btn.addEventListener('click', () => window.location.href = '../start_analysis_business/code.html');
            }
        }

        // Dashboard & Others
        if (text.includes('view full plan')) {
            btn.addEventListener('click', () => window.location.href = '../gramudyam_financial_plan/code.html');
        }
        if (text.includes('adjust parameters')) {
            btn.addEventListener('click', () => window.location.href = '../start_analysis_capital/code.html');
        }
        if (text.includes('explore food processing') || text.includes('view grocery details anyway')) {
            btn.addEventListener('click', () => window.location.href = '../business_feasibility_dashboard/code.html');
        }
    });

    // 4. Auto-redirect on analyzing screen
    if (currentPath.includes('analyzing_your_business')) {
        setTimeout(() => {
            window.location.href = '../business_feasibility_dashboard/code.html';
        }, 2000);
    }
});
