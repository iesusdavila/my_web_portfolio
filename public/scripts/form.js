document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const buttonText = document.getElementById('button-text');
  const buttonLoading = document.getElementById('button-loading');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      buttonText.classList.add('opacity-0');
      buttonLoading.classList.remove('hidden');
      formStatus.classList.add('hidden');
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // In a real implementation, you would send this data to a server
        // Here we're simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        formStatus.innerHTML = `
          <div class="text-green-600 dark:text-green-400">
            <p class="font-medium">Message sent successfully!</p>
            <p class="text-sm">Thank you for reaching out. I'll get back to you as soon as possible.</p>
          </div>
        `;
        formStatus.classList.remove('hidden', 'bg-red-100', 'dark:bg-red-900/20', 'text-red-800', 'dark:text-red-400');
        formStatus.classList.add('bg-green-100', 'dark:bg-green-900/20', 'text-green-800', 'dark:text-green-400');
        
        // Reset form
        contactForm.reset();
        
      } catch (error) {
        // Error message
        formStatus.innerHTML = `
          <div class="text-red-600 dark:text-red-400">
            <p class="font-medium">There was an error sending your message.</p>
            <p class="text-sm">Please try again later or contact me directly at [email].</p>
          </div>
        `;
        formStatus.classList.remove('hidden', 'bg-green-100', 'dark:bg-green-900/20', 'text-green-800', 'dark:text-green-400');
        formStatus.classList.add('bg-red-100', 'dark:bg-red-900/20', 'text-red-800', 'dark:text-red-400');
      } finally {
        // Reset button state
        buttonText.classList.remove('opacity-0');
        buttonLoading.classList.add('hidden');
        
        // Show status message
        formStatus.classList.remove('hidden');
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
