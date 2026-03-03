// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('senderEmail').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Display success message
            const successMsg = document.getElementById('successMessage');
            contactForm.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMsg.style.display = 'none';
            }, 3000);
            
            console.log('Contact form submitted:', { email, message });
        });
    }

    // Order Form Handler
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        // Add Item Button
        const addItemBtn = document.getElementById('addItemBtn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', function(e) {
                e.preventDefault();
                addNewItem();
            });
        }

        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateOrderForm()) {
                return;
            }
            
            // Get form data
            const formData = new FormData(orderForm);
            const orderDetails = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('emailAddress'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                country: formData.get('country'),
                items: getOrderItems(formData)
            };
            
            // Display success message
            const successMsg = document.getElementById('successMessage');
            document.querySelector('.order-form-wrapper').innerHTML = '';
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.style.display = 'block';
            successDiv.innerHTML = `
                <strong>✓ Success!</strong> 
                <p>Your order has been submitted successfully!</p>
                <p>Order Details:</p>
                <ul style="text-align: left; display: inline-block; margin-top: 1rem;">
                    <li>Name: ${orderDetails.firstName} ${orderDetails.lastName}</li>
                    <li>Email: ${orderDetails.email}</li>
                    <li>Phone: ${orderDetails.phone}</li>
                    <li>Address: ${orderDetails.address}, ${orderDetails.country}</li>
                    <li>Items: ${orderDetails.items.length} item(s)</li>
                </ul>
                <p style="margin-top: 1rem;"><a href="index.html" style="color: inherit; text-decoration: underline;">← Back to Home</a></p>
            `;
            document.querySelector('.order-form-wrapper').appendChild(successDiv);
            
            console.log('Order submitted:', orderDetails);
        });
    }
});

function addNewItem() {
    const itemsContainer = document.getElementById('itemsContainer');
    const itemCount = itemsContainer.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'item-group';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="itemName${itemCount}">Shoe Type *</label>
                <select id="itemName${itemCount}" name="itemName[]" class="item-select" required>
                    <option value="">Select a shoe type</option>
                    <option value="Classic Heels">Classic Heels - $89</option>
                    <option value="Casual Sneakers">Casual Sneakers - $59</option>
                    <option value="Elegant Boots">Elegant Boots - $119</option>
                    <option value="Wedding Collection">Wedding Collection - $159</option>
                    <option value="Summer Sandals">Summer Sandals - $69</option>
                    <option value="Speed Cat Heels">Speed Cat Heels - $119</option>
                    <option value="Loafers">Loafers - $99</option>
                    <option value="Ballet Flats">Ballet Flats - $49</option>
                    <option value="Ankle Booties">Ankle Booties - $139</option>
                </select>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="quantity${itemCount}">Quantity *</label>
                <input 
                    type="number" 
                    id="quantity${itemCount}" 
                    name="quantity[]" 
                    class="quantity-input" 
                    min="1" 
                    value="1" 
                    required>
                <span class="error-message"></span>
            </div>
            <button type="button" class="btn btn-danger remove-item">Remove</button>
        </div>
    `;
    
    itemsContainer.appendChild(newItem);
    
    // Add remove event listener
    newItem.querySelector('.remove-item').addEventListener('click', function(e) {
        e.preventDefault();
        newItem.remove();
    });
}

function getOrderItems(formData) {
    const items = [];
    const itemNames = formData.getAll('itemName[]');
    const quantities = formData.getAll('quantity[]');
    
    for (let i = 0; i < itemNames.length; i++) {
        items.push({
            name: itemNames[i],
            quantity: quantities[i]
        });
    }
    
    return items;
}

function validateOrderForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate each field
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First name is required';
        isValid = false;
    }
    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Last name is required';
        isValid = false;
    }
    if (!email) {
        document.getElementById('emailAddressError').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('emailAddressError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    if (!phone) {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        isValid = false;
    }
    if (!address) {
        document.getElementById('addressError').textContent = 'Address is required';
        isValid = false;
    }
    if (!country) {
        document.getElementById('countryError').textContent = 'Country is required';
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add smooth scroll behavior for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
