document.addEventListener('DOMContentLoaded', function() {
    // Эффект при прокрутке для шапки
    window.addEventListener('scroll', function() {
        const header = document.getElementById('mainHeader');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Анимации при прокрутке
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Анимация чисел в статистике
                if (entry.target.classList.contains('stat-number')) {
                    animateValue(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Анимация чисел
    function animateValue(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Управление количеством пассажиров
    document.querySelectorAll('.passenger-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = document.getElementById('passengers');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus') && value < 9) {
                input.value = value + 1;
            } else if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            }
        });
    });

    // Генерация карты мест
    function generateSeatMap() {
        const seatMap = document.getElementById('seatMap');
        seatMap.innerHTML = '';
        
        // Бизнес класс (4 ряда)
        for (let row = 1; row <= 4; row++) {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            for (let seatNum = 1; seatNum <= 6; seatNum++) {
                const seat = document.createElement('div');
                seat.className = 'seat business';
                
                // Определяем тип места
                const seatType = seatNum === 1 || seatNum === 6 ? 'window' : 'aisle';
                seat.textContent = `${row}${String.fromCharCode(64 + seatNum)}`;
                seat.setAttribute('data-seat-type', seatType === 'window' ? 'У иллюминатора' : 'У прохода');
                seat.setAttribute('data-price', row === 1 ? 35000 : 30000);
                
                if (seatType === 'window') {
                    seat.classList.add('window');
                }
                
                seat.addEventListener('click', toggleSeatSelection);
                seatRow.appendChild(seat);
            }
            
            seatMap.appendChild(seatRow);
        }
        
        // Разделитель
        const separator = document.createElement('div');
        separator.style.height = '30px';
        seatMap.appendChild(separator);
        
        // Эконом класс (20 рядов)
        for (let row = 5; row <= 24; row++) {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            for (let seatNum = 1; seatNum <= 6; seatNum++) {
                const seat = document.createElement('div');
                const isOccupied = Math.random() < 0.3;
                const seatType = seatNum === 1 || seatNum === 6 ? 'window' : 
                                seatNum === 3 || seatNum === 4 ? 'aisle' : 'middle';
                const hasExtraSpace = row > 20 && (seatNum === 2 || seatNum === 5) && Math.random() < 0.5;
                
                seat.className = isOccupied ? 'seat occupied' : 'seat';
                seat.textContent = `${row}${String.fromCharCode(64 + seatNum)}`;
                seat.setAttribute('data-seat-type', 
                    seatType === 'window' ? 'У иллюминатора' : 
                    seatType === 'aisle' ? 'У прохода' : 'Среднее место');
                seat.setAttribute('data-price', hasExtraSpace ? 28000 : 25000);
                
                if (seatType === 'window' && !isOccupied) {
                    seat.classList.add('window');
                }
                
                if (hasExtraSpace && !isOccupied) {
                    seat.classList.add('extra-space');
                    seat.setAttribute('data-seat-type', 'С дополнительным местом');
                }
                
                if (!isOccupied) {
                    seat.addEventListener('click', toggleSeatSelection);
                }
                
                seatRow.appendChild(seat);
            }
            
            seatMap.appendChild(seatRow);
        }
    }

    // Переключение выбора места
    function toggleSeatSelection() {
        this.classList.toggle('selected');
        updateSelectedSeats();
    }

    // Обновление информации о выбранных местах
    function updateSelectedSeats() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const seatsList = document.querySelector('.seats-list');
        const totalPriceElement = document.querySelector('.total-price');
        const selectedSeatsInfo = document.getElementById('selectedSeatsInfo');
        
        let totalPrice = 0;
        seatsList.innerHTML = '';
        
        selectedSeats.forEach(seat => {
            const seatNumber = seat.textContent;
            const seatType = seat.getAttribute('data-seat-type');
            const seatPrice = parseInt(seat.getAttribute('data-price'));
            totalPrice += seatPrice;
            
            const seatItem = document.createElement('div');
            seatItem.className = 'seat-item';
            seatItem.innerHTML = `
                <div>
                    <span class="seat-number">${seatNumber}</span>
                    <span class="seat-type">${seatType}</span>
                </div>
                <div>
                    <span class="seat-price">${seatPrice.toLocaleString()} ₽</span>
                    <span class="remove-seat" data-seat="${seatNumber}"><i class="fas fa-times"></i></span>
                </div>
            `;
            
            seatsList.appendChild(seatItem);
        });
        
        // Обновляем общую стоимость
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} ₽`;
        selectedSeatsInfo.textContent = `Выбрано мест: ${selectedSeats.length}`;
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-seat').forEach(btn => {
            btn.addEventListener('click', function() {
                const seatNumber = this.getAttribute('data-seat');
                const seatToRemove = document.querySelector(`.seat.selected:contains("${seatNumber}")`);
                
                if (seatToRemove) {
                    seatToRemove.classList.remove('selected');
                    updateSelectedSeats();
                }
            });
        });
    }

    // Обработка формы поиска
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const spinner = document.querySelector('.loading-spinner');
        spinner.classList.remove('hidden');
        
        // Имитация загрузки данных с сервера
        setTimeout(() => {
            spinner.classList.add('hidden');
            
            // Показываем секцию выбора мест
            document.querySelector('.seat-selection').style.display = 'block';
            
            // Генерируем карту мест
            generateSeatMap();
            
            // Прокручиваем к выбору мест
            document.querySelector('.seat-selection').scrollIntoView({
                behavior: 'smooth'
            });
        }, 1500);
    });

    // Подтверждение выбора мест
    document.getElementById('confirmBtn').addEventListener('click', function() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        
        if (selectedSeats.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно место');
            return;
        }
        
        // Собираем информацию о выбранных местах
        const seatsInfo = Array.from(selectedSeats).map(seat => {
            return {
                number: seat.textContent,
                type: seat.getAttribute('data-seat-type'),
                price: parseInt(seat.getAttribute('data-price'))
            };
        });
        
        // Здесь должна быть логика отправки на сервер
        console.log('Выбранные места:', seatsInfo);
        
        // Показываем уведомление об успешном бронировании
        showBookingConfirmation(seatsInfo);
    });

    // Показ подтверждения бронирования
    function showBookingConfirmation(seats) {
        const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);
        
        const confirmationHTML = `
            <div class="confirmation-overlay">
                <div class="confirmation-modal">
                    <h2><i class="fas fa-check-circle"></i> Бронирование подтверждено!</h2>
                    <p>Ваш рейс SW-256 Москва → Париж успешно забронирован.</p>
                    
                    <div class="booking-details">
                        <h3>Детали бронирования:</h3>
                        <p><strong>Дата:</strong> 12 июня 2023</p>
                        <p><strong>Время вылета:</strong> 08:45</p>
                        <p><strong>Выбранные места:</strong></p>
                        
                        <ul class="confirmed-seats">
                            ${seats.map(seat => `
                                <li>
                                    <span>${seat.number}</span>
                                    <span>${seat.type}</span>
                                    <span>${seat.price.toLocaleString()} ₽</span>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <div class="total-confirmed">
                            <strong>Итого:</strong>
                            <span>${totalPrice.toLocaleString()} ₽</span>
                        </div>
                    </div>
                    
                    <p>Информация о бронировании отправлена на ваш email.</p>
                    
                    <button class="btn" id="closeConfirmation">
                        <i class="fas fa-print"></i> Распечатать билеты
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', confirmationHTML);
        
        // Обработчик закрытия модального окна
        document.getElementById('closeConfirmation').addEventListener('click', function() {
            document.querySelector('.confirmation-overlay').remove();
            resetBookingForm();
        });
    }

    // Сброс формы бронирования
    function resetBookingForm() {
        document.querySelector('.seat-selection').style.display = 'none';
        document.getElementById('searchForm').reset();
    }

    // Инициализация при загрузке
    function init() {
        // Установка минимальной даты (сегодня)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        document.getElementById('departure').min = today.toISOString().split('T')[0];
        document.getElementById('return').min = tomorrow.toISOString().split('T')[0];
        
        // Установка значений по умолчанию для дат
        document.getElementById('departure').valueAsDate = today;
        document.getElementById('return').valueAsDate = tomorrow;
    }

    init();
});

// Полифил для :contains()
document.querySelectorAll = function(selector) {
    const elements = document.querySelectorAll(selector);
    
    return Array.prototype.filter.call(elements, function(element) {
        return element.textContent.includes(selector.split(':contains(')[1].replace(')', ''));
    });
};