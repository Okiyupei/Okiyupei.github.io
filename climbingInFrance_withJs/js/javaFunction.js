document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const closeBtn = document.querySelector('.close');
    
    // Get all images in the gallery 
    const images = document.querySelectorAll('div img');
    
    // Add tabindex attributes to all images
    console.log('Adding tabindex attributes to images...');
    images.forEach((img, index) => {
        img.setAttribute('tabindex', '0');
        console.log(`Added tabindex to image ${index + 1}`);
    });

    // Function to open the modal
    function openModal(img) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        
        let caption = document.getElementById('imageCaption');
        if (!caption) {
            caption = document.createElement('div');
            caption.id = 'imageCaption';
            modal.appendChild(caption);
        }
        caption.textContent = img.alt;

        // Set focus to the modal for accessibility
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Open modal on click or key press
    images.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });

        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this);
            }
        });
    });

    // Close modal when clicking the × button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Close modal when focus moves outside it
    modal.addEventListener('focusout', function(event) {
        if (!modal.contains(event.relatedTarget)) {
            closeModal();
        }
    });
});
