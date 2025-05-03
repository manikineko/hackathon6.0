// Modern enhancements: jQuery popup for EULA and data notice
$(document).ready(function() {
  if (!localStorage.getItem('eula_agreed')) {
    $('#eula-modal').fadeIn(400);
  }
  $('#eula-agree-btn').on('click', function() {
    localStorage.setItem('eula_agreed', 'yes');
    $('#eula-modal').fadeOut(350);
  });
});
