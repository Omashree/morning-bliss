document.addEventListener('DOMContentLoaded', () => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.product-info .btn');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            alert('Product added to cart!');
        });
    }
});

document.getElementById('buy-now').addEventListener('click', function() {
    document.getElementById('paypal-button-container').style.display = 'block';

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '15.99'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                
                alert('Transaction completed by ' + details.payer.name.given_name);
                
            });
        },
        onError: function(err) {
            
            console.error('PayPal error:', err);
        }
    }).render('#paypal-button-container');
});
