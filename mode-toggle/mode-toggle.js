const modeBtn = document.querySelector('.dark-mode-toggle');
const body = document.querySelector('body');

if(localStorage.getItem('currentMode') === 'dark') {
  body.classList.add('mode');
}

export function toggle() {
  if(modeBtn) {
  modeBtn.addEventListener('click', () => {
    body.classList.toggle('mode');
    
    if(body.classList.contains('mode')) {
      localStorage.setItem('currentMode', 'dark')
    } else{
     localStorage.setItem('currentMode', 'light');
   }
 });
 }
}