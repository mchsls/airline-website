document.addEventListener('DOMContentLoaded', function() {
    // Seat selection functionality
    const seatMap = document.querySelector('.seat-map');
    const seatsList = document.querySelector('.seats-list');
    const noSeatsMessage = document.querySelector('.no-seats');
    const seatsPriceElement = document.getElementById('seats-price');
    const totalPriceElement = document.getElementById('total-price');
    const continueBookingBtn = document.getElementById('continue-booking');
    
    let selectedSeats = [];
    const baseTicketPrice = 25000; // Base price per ticket
    const taxesAndFees = 3200; // Fixed taxes and fees
    
    if (seatMap) {
        seatMap.addEventListener('click', function(e) {
            const seatElement = e.target.closest('.seat:not(.booked)');
            
            if (seatElement) {
                const seatNumber = seatElement.dataset.seat;
                const seatPrice = parseInt(seatElement.dataset.price) || 0;
                
                // Check if seat is already selected
                const seatIndex = selectedSeats.findIndex(seat => seat.number === seatNumber);
                
                if (seatIndex === -1) {
                    // Add seat to selection
                    selectedSeats.push({
                        number: seatNumber,
                        price: seatPrice,
                        element: seatElement
                    });
                    seatElement.classList.add('selected');
                } else {
                    // Remove seat from selection
                    selectedSeats.splice(seatIndex, 1);
                    seatElement.classList.remove('selected');
                }
                
                updateSeatSelectionDisplay();
            }
        });
    }
    
    function updateSeatSelectionDisplay() {
        // Clear current display
        seatsList.innerHTML = '';
        
        if (selectedSeats.length === 0) {
            noSeatsMessage.style.display = 'block';
            continueBookingBtn.disabled = true;
        } else {
            noSeatsMessage.style.display = 'none';
            continueBookingBtn.disabled = false;
            
            // Add selected seats
            selectedSeats.forEach(seat => {
                const seatBadge = document.createElement('div');
                seatBadge.className = 'seat-badge';
                seatBadge.innerHTML = `
                    ${seat.number}
                    <button class="remove-seat" data-seat="${seat.number}">×</button>
                `;
                seatsList.appendChild(seatBadge);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-seat').forEach(btn => {
                btn.addEventListener('click', function() {
                    const seatToRemove = this.dataset.seat;
                    const seatIndex = selectedSeats.findIndex(seat => seat.number === seatToRemove);
                    
                    if (seatIndex !== -1) {
                        // Update seat in the map
                        selectedSeats[seatIndex].element.classList.remove('selected');
                        selectedSeats.splice(seatIndex, 1);
                        
                        updateSeatSelectionDisplay();
                    }
                });
            });
        }
        
        // Calculate prices
        const ticketsPrice = baseTicketPrice * 2; // Assuming 2 passengers
        const seatsTotalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        const totalPrice = ticketsPrice + seatsTotalPrice + taxesAndFees;
        
        // Update price display
        seatsPriceElement.textContent = `${seatsTotalPrice.toLocaleString('ru-RU')} ₽`;
        totalPriceElement.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;
    }
    
    // Initialize with no seats selected
    updateSeatSelectionDisplay();
    
    // Continue booking button
    if (continueBookingBtn) {
        continueBookingBtn.addEventListener('click', function() {
            // Here would be the actual booking continuation
            console.log('Continuing booking with seats:', selectedSeats);
            alert('Бронирование продолжено! Вы выбрали места: ' + 
                selectedSeats.map(seat => seat.number).join(', '));
        });
    }
});