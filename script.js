// Basic interactivity: nav toggle, year, and booking form handler
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle && navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // pre-fill trip in contact form when clicking Book buttons
  document.querySelectorAll('a[data-trip]').forEach(a => {
    a.addEventListener('click', (e) => {
      const trip = a.getAttribute('data-trip');
      const form = document.querySelector('#booking-form');
      if (form) {
        const select = form.querySelector('select[name="trip"]');
        if (select) {
          select.value = trip;
          // smooth scroll to form
          e.preventDefault();
          form.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      }
    });
  });

  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const summary = {
        name: data.get('name'),
        email: data.get('email'),
        trip: data.get('trip'),
        date: data.get('date'),
        people: data.get('people'),
        notes: data.get('notes')
      };
      // In production, send to server or form endpoint. For now show a confirmation.
      alert('Booking request received:\n' +
        'Name: ' + summary.name + '\n' +
        'Email: ' + summary.email + '\n' +
        'Trip: ' + summary.trip + '\n' +
        'Date: ' + summary.date + '\n' +
        'Passengers: ' + summary.people + '\n\n' +
        'We will contact you to confirm availability.');
      form.reset();
    });
  }
});
