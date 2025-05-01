document.addEventListener('DOMContentLoaded', function() {
    // Animate buttons on hover
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Animate cards on hover
    const cards = document.querySelectorAll('.destination-card, .fact-card, .time-zone-card, .offer-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Ripple effect for buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = 'var(--text-secondary)';
        });
    });
    
    // Animate seat selection
    const seats = document.querySelectorAll('.seat');
    
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.style.animation = 'seatDeselect 0.3s ease';
            } else if (!this.classList.contains('booked')) {
                this.style.animation = 'seatSelect 0.3s ease';
            }
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes seatSelect {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes seatDeselect {
        0% { transform: scale(1); }
        50% { transform: scale(0.8); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);