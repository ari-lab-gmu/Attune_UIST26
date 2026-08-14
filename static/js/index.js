window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize result carousels (if any)
    bulmaCarousel.attach('.results-carousel.carousel', options);

    // Video presentation: Preview first, swipe to Full (no autoplay)
    var videoCarousels = bulmaCarousel.attach('#video-carousel', {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: false,
        autoplay: false,
        navigation: true,
        pagination: true,
    });

    setupVideoPresentationControls(videoCarousels);
    
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})

function pauseYoutubeIframes(root) {
    if (!root) return;
    root.querySelectorAll('iframe').forEach(function(iframe) {
        if (!iframe.contentWindow) return;
        iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: []
        }), '*');
    });
}

function setupVideoPresentationControls(videoCarousels) {
    if (!videoCarousels || videoCarousels.length === 0) return;

    var carousel = videoCarousels[0];
    var tabs = document.querySelectorAll('.video-tab');

    function setActiveTab(index) {
        tabs.forEach(function(tab) {
            var isActive = Number(tab.dataset.slide) === index;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function goToSlide(index) {
        if (!carousel.state || carousel.state.index === index) {
            setActiveTab(index);
            return;
        }
        pauseYoutubeIframes(document.getElementById('video-carousel'));
        // bulma-carousel's show(index) has a typeof bug ('Number' vs 'number');
        // set next manually, then show().
        carousel.state.next = index;
        carousel.show();
        setActiveTab(index);
    }

    carousel.on('before:show', function() {
        pauseYoutubeIframes(document.getElementById('video-carousel'));
    });

    carousel.on('after:show', function(state) {
        var index = 0;
        if (state && typeof state.next === 'number') {
            index = state.next;
        } else if (state && typeof state.index === 'number') {
            index = state.index;
        }
        var length = (state && state.length) || 2;
        index = ((index % length) + length) % length;
        setActiveTab(index);
    });

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            goToSlide(Number(tab.dataset.slide));
        });
    });
}
