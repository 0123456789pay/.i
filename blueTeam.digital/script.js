document.addEventListener('DOMContentLoaded',function(){
const t=document.getElementById('navToggle'),m=document.getElementById('navMenu');
if(t&&m){t.addEventListener('click',function(){m.classList.toggle('active');});}
document.querySelectorAll('.dropdown').forEach(d=>{
const tg=d.querySelector('.nav-link');
if(tg){tg.addEventListener('click',function(e){if(window.innerWidth<=768){e.preventDefault();d.classList.toggle('active');}});}
});
console.log('MEDIA.DIGITAL Loaded! ⚡');
});
