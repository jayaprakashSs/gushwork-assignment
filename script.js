document.addEventListener("DOMContentLoaded", () => {
    // Sticky Header functionality
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    let isSticky = false;

    window.addEventListener('scroll', () => {
        // Find the first fold (bottom of the header or hero section)
        const firstFold = hero ? hero.offsetTop + 100 : 300;
        
        if (window.scrollY > firstFold) {
            if (!isSticky) {
                header.classList.add('sticky');
                isSticky = true;
            }
        } else {
            if (isSticky) {
                header.classList.remove('sticky');
                isSticky = false;
            }
        }
    });

    // FAQ Accordion Toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close all other items for accordion effect
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the current clicked item
            item.classList.toggle('active');
        });
    });

    // Applications Image Carousel Scroll functionality
    const appCarousel = document.getElementById('app-carousel');
    const appPrev = document.getElementById('app-prev');
    const appNext = document.getElementById('app-next');

    if (appCarousel && appPrev && appNext) {
        // App Card width 420px + 32px gap
        const scrollAmount = 452;

        appNext.addEventListener('click', () => {
            appCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        appPrev.addEventListener('click', () => {
            appCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Process Steps content update functionality
    const processSteps = document.querySelectorAll('.step');
    const processTitle = document.querySelector('.process-title');
    const processDesc = document.querySelector('.process-desc');
    const featureList = document.querySelector('.hero-features');

    const processData = {
        'Raw Material': {
            title: 'High-Grade Raw Material Selection',
            desc: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
            features: ['PE100 grade material', 'Optimal molecular weight distribution']
        },
        'Extrusion': {
            title: 'Advanced HDPE Extrusion',
            desc: 'Our state-of-the-art extruders maintain consistent temperature profiles to ensure superior material bonding and structural integrity.',
            features: ['Precise temperature control', 'High-torque screw geometry']
        },
        'Cooling': {
            title: 'Multistage Precise Cooling',
            desc: 'Controlled water temperature in sequential spray tanks prevents internal stress and ensures dimensional stability.',
            features: ['Efficient heat dissipation', 'Automated temperature regulation']
        },
        'Sizing': {
            title: 'Precision Vacuum Sizing',
            desc: 'Innovative vacuum calibration technology locks in critical dimensions and surface finish for peak performance.',
            features: ['Tight tolerance compliance', 'Polished surface finish']
        },
        'Quality Control': {
            title: 'Rigorous Quality Assurance',
            desc: 'Every batch undergoes comprehensive testing for pressure resistance, impact strength, and thermal stability.',
            features: ['Real-time monitoring', 'ISO standard certification']
        },
        'Marking': {
            title: 'Automated Inkjet Marking',
            desc: 'Permanent laser or inkjet marking provides full traceability and clear product identification according to global standards.',
            features: ['Full batch traceability', 'Clear identification']
        },
        'Cutting': {
            title: 'Automated Precision Cutting',
            desc: 'High-speed planetary cutters provide clean, square ends for perfect installation and welding compatibility.',
            features: ['Clean square cuts', 'No-burr finish']
        },
        'Packaging': {
            title: 'Final Inspection & Packaging',
            desc: 'Strategic coil and crate packaging protects the finished product during transit while optimizing storage efficiency.',
            features: ['Durable protection', 'Optimized storage']
        }
    };

    processSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepName = step.textContent.trim();
            const data = processData[stepName];

            if (data) {
                // Update active state
                processSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');

                // Update content with a slight fade
                processTitle.style.opacity = 0;
                processDesc.style.opacity = 0;
                featureList.style.opacity = 0;

                setTimeout(() => {
                    processTitle.textContent = data.title;
                    processDesc.textContent = data.desc;
                    
                    // Update features list
                    featureList.innerHTML = data.features.map(f => `
                        <li class="hero-feature">
                            <span class="check-icon"><span>&#10003;</span></span>
                            ${f}
                        </li>
                    `).join('');

                    processTitle.style.opacity = 1;
                    processDesc.style.opacity = 1;
                    featureList.style.opacity = 1;
                }, 200);
            }
        });
    });

    // Hero gallery basic interaction
    const heroThumbnail = document.querySelectorAll('.thumbnail');
    heroThumbnail.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove selection state from all
            heroThumbnail.forEach(t => t.style.borderColor = "var(--gray-200)");
            // Add selection state
            thumb.style.borderColor = "var(--primary)";
        });
    });

    // Image Zoom functionality
    const mainImageContainer = document.querySelector('.main-image');
    const heroImage = document.querySelector('.hero-img');

    if (mainImageContainer && heroImage) {
        mainImageContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = mainImageContainer.getBoundingClientRect();
            // Calculate percentage position
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            
            heroImage.style.transformOrigin = `${x}% ${y}%`;
            heroImage.style.transform = 'scale(2)'; // 2x zoom level
        });

        mainImageContainer.addEventListener('mouseleave', () => {
            heroImage.style.transformOrigin = 'center center';
            heroImage.style.transform = 'scale(1)';
        });
    }

    // Testimonials Auto-scroll
    const testimonialGrid = document.getElementById('testimonial-grid');
    if (testimonialGrid) {
        let scrollAmount = 444; // Card width 420px + 24px gap
        setInterval(() => {
            if (testimonialGrid.scrollLeft + testimonialGrid.clientWidth >= testimonialGrid.scrollWidth - 10) {
                testimonialGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testimonialGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);
    }
    // Modal Dialog functionality (Multiple Modals)
    const catalogueModal = document.getElementById('catalogue-modal');
    const quoteModal = document.getElementById('quote-modal');
    
    const catalogueSubmit = document.getElementById('modal-submit');
    const catalogueEmailInput = document.getElementById('modal-email');

    // Helper to open/close
    const openModal = (m) => {
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = (m) => {
        m.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close buttons
    document.getElementById('close-catalogue')?.addEventListener('click', () => closeModal(catalogueModal));
    document.getElementById('close-quote')?.addEventListener('click', () => closeModal(quoteModal));

    // Outside clicks
    [catalogueModal, quoteModal].forEach(m => {
        m?.addEventListener('click', (e) => {
            if (e.target === m) closeModal(m);
        });
    });

    // 1. Buttons that open Catalogue Modal
    const catalogueButtons = document.querySelectorAll('.catalogue-form .btn, .resource-link, .btn-outline');
    catalogueButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(catalogueModal);
        });
    });

    // 2. Buttons that open Quote Modal
    const quoteButtons = document.querySelectorAll('.btn-cta-submit, .hero-actions .btn-primary');
    quoteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(quoteModal);
        });
    });

    // Catalogue Validation
    if (catalogueEmailInput) {
        catalogueEmailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(catalogueEmailInput.value.trim())) {
                catalogueSubmit.classList.add('active');
            } else {
                catalogueSubmit.classList.remove('active');
            }
        });
    }

    if (catalogueSubmit) {
        catalogueSubmit.addEventListener('click', () => {
            if (catalogueSubmit.classList.contains('active')) {
                catalogueSubmit.textContent = 'Preparing Download...';
                setTimeout(() => {
                    catalogueSubmit.textContent = 'Success!';
                    setTimeout(() => closeModal(catalogueModal), 1500);
                }, 2000);
            }
        });
    }

    // Quote Submit
    document.getElementById('quote-submit')?.addEventListener('click', function() {
        this.textContent = 'Submitting...';
        setTimeout(() => {
            this.textContent = 'Success!';
            setTimeout(() => {
                closeModal(quoteModal);
                this.textContent = 'Submit Form';
            }, 1500);
        }, 2000);
    });
});
