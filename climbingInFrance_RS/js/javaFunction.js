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
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-content");

    let scale = 1;
    let startX = 0;
    let startY = 0;
    let initialDistance = 0;

    // Open Modal and Reset Scale
    document.querySelectorAll(".gallery img").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
            scale = 1;
            modalImg.style.transform = "scale(1)";
        });
    });

    // Close Modal
    modal.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
            modal.style.display = "none";
        }
    });

    // Handle Pinch-to-Zoom
    modalImg.addEventListener("touchstart", function (e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = getDistance(e.touches[0], e.touches[1]);
        }
    });

    modalImg.addEventListener("touchmove", function (e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            let newDistance = getDistance(e.touches[0], e.touches[1]);
            let zoomFactor = newDistance / initialDistance;
            scale = Math.max(1, Math.min(3, scale * zoomFactor)); // Restrict zoom range (1x to 3x)
            modalImg.style.transform = `scale(${scale})`;
            initialDistance = newDistance;
        }
    });

    // Handle Double-Tap Zoom
    let lastTap = 0;
    modalImg.addEventListener("touchend", function (e) {
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) { // Double-tap detected
            scale = scale === 1 ? 2 : 1; // Toggle between 1x and 2x zoom
            modalImg.style.transform = `scale(${scale})`;
        }
        lastTap = currentTime;
    });

    // Helper Function: Calculate Distance Between Two Touch Points
    function getDistance(touch1, touch2) {
        return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
    }
});
