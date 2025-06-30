// Intellident Coming Soon Page - JavaScript
// Countdown Timer and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    initCountdown();
    
    // Initialize email form
    initEmailForm();
    
    // Initialize animations
    initAnimations();
});

// Countdown Timer Function
function initCountdown() {
    // Set launch date to November 3, 2025
    const launchDate = new Date('2025-11-03T08:00+08:00');
    
    // Store current displayed values for smooth animation
    const current = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    const animating = {
        days: false,
        hours: false,
        minutes: false,
        seconds: false
    };
    const duration = 350; // ms for smooth refined animation

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        
        if (distance < 0) {
            // When countdown reaches zero
            document.querySelector('.countdown-container').innerHTML = 
                '<div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #26B99A, #38C7C7); border-radius: 20px; color: white;"><h2>🎉 We\'re Live! 🎉</h2><p>Visit our main website now!</p><a href="../index.html" style="display: inline-block; padding: 15px 30px; background: white; color: #64ada7; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 1rem;">Visit Intellident</a></div>';
            return;
        }
        
        // Calculate time remaining
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        animateUnit('days', days);
        animateUnit('hours', hours);
        animateUnit('minutes', minutes);
        animateUnit('seconds', seconds);
    }
    
    function animateUnit(unit, targetValue) {
        const element = document.getElementById(unit);
        if (!element) return;
        const startValue = current[unit];
        const endValue = targetValue;
        if (startValue === endValue || animating[unit]) return;
        animating[unit] = true;
        const startTime = performance.now();

        function animateStep(now) {
            const elapsed = now - startTime;
            let progress = Math.min(elapsed / duration, 1);
            
            // Super smooth easing - starts slow, accelerates smoothly, then decelerates
            progress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            // Smooth fade and scale transition
            if (progress < 0.5) {
                // First half: gentle fade out with slight scale
                element.textContent = startValue.toString().padStart(2, '0');
                element.style.opacity = 1 - (progress * 1.2);
                element.style.transform = `scale(${1 - progress * 0.15}) translateY(${progress * 8}px)`;
                element.style.color = `rgba(56, 199, 199, ${1 - progress * 0.3})`;
            } else {
                // Second half: gentle fade in with slight scale
                element.textContent = endValue.toString().padStart(2, '0');
                const secondProgress = (progress - 0.5) * 2;
                element.style.opacity = secondProgress * 1.1;
                element.style.transform = `scale(${0.85 + secondProgress * 0.15}) translateY(${(1 - secondProgress) * 8}px)`;
                element.style.color = `rgba(38, 185, 154, ${secondProgress * 0.7 + 0.3})`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animateStep);
            } else {
                // Reset to final state
                element.textContent = endValue.toString().padStart(2, '0');
                element.style.opacity = 1;
                element.style.transform = 'scale(1) translateY(0)';
                element.style.color = '#38C7C7';
                current[unit] = endValue;
                animating[unit] = false;
            }
        }
        requestAnimationFrame(animateStep);
    }

    // Initialize current values to actual values on load
    function setInitialCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        current.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        current.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        current.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        current.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = current.days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = current.hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = current.minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = current.seconds.toString().padStart(2, '0');
    }

    setInitialCountdown();
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Email Form Handler
function initEmailForm() {
    const form = document.getElementById('notifyForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = form.querySelector('.notify-btn');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        emailInput.disabled = true;
        
        // Submit email to Formspree
        storeEmail(email).then(success => {
            // Show success message regardless (Formspree or localStorage)
            submitBtn.classList.remove('loading');
            form.style.display = 'none';
            successMessage.classList.add('show');
            
            // Reset after 5 seconds
            setTimeout(() => {
                form.style.display = 'block';
                successMessage.classList.remove('show');
                emailInput.value = '';
                emailInput.disabled = false;
            }, 5000);
        }).catch(error => {
            // Handle any errors
            console.error('Error:', error);
            submitBtn.classList.remove('loading');
            emailInput.disabled = false;
            showError('Something went wrong. Please try again.');
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Store email using Formspree
async function storeEmail(email) {
    try {
        // Formspree endpoint for Intellident email collection
        const response = await fetch('https://formspree.io/f/xzzgoele', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                timestamp: new Date().toISOString(),
                source: 'Intellident Coming Soon Page'
            })
        });

        if (response.ok) {
            console.log('Email successfully sent to Formspree:', email);
            return true;
        } else {
            throw new Error('Failed to submit email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Fallback to localStorage if Formspree fails
        let emails = JSON.parse(localStorage.getItem('intellident_emails') || '[]');
        emails.push({
            email: email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('intellident_emails', JSON.stringify(emails));
        return false;
    }
}

// Show error message
function showError(message) {
    const emailInput = document.getElementById('emailInput');
    const wrapper = emailInput.closest('.input-wrapper');
    
    // Visual feedback
    wrapper.style.borderColor = '#ff6b6b';
    wrapper.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
    
    // Reset after 3 seconds
    setTimeout(() => {
        wrapper.style.borderColor = 'rgba(100, 173, 167, 0.3)';
        wrapper.style.boxShadow = 'none';
    }, 3000);
}

// Initialize animations and effects
function initAnimations() {
    // Enhanced hover effects for feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'logoGlow 3s ease-in-out infinite';
            }, 100);
        });
    }
    
    // Add dynamic floating particles
    setInterval(createFloatingParticle, 4000);
}

// Create floating particles
function createFloatingParticle() {
    const backgroundAnimation = document.querySelector('.background-animation');
    if (!backgroundAnimation) return;
    
    // Limit number of particles
    if (document.querySelectorAll('.floating-element').length >= 10) return;
    
    const particle = document.createElement('div');
    particle.className = 'floating-element';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    // Random size
    const size = 30 + Math.random() * 30;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    backgroundAnimation.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 30000);
}

// Console message
console.log('🦷 Intellident Coming Soon Page Loaded! 🦷'); 