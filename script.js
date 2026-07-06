window.addEventListener('scroll',()=>{
  const el=document.getElementById('scrollProgress');
  const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  el.style.width=pct+'%';
});


const container=document.getElementById('particles');
for(let i=0;i<25;i++){
  const p=document.createElement('div');
  p.className='particle';
  const size=Math.random()*4+2;
  const colors=['rgba(0,229,195,0.6)','rgba(79,195,247,0.6)','rgba(0,200,150,0.5)'];
  p.style.cssText=`
    width:${size}px;height:${size}px;
    background:${colors[Math.floor(Math.random()*colors.length)]};
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
    box-shadow:0 0 ${size*2}px currentColor;
  `;
  container.appendChild(p);
}

const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); }
  });
},{threshold:0.12});
revealEls.forEach(el=>observer.observe(el));


function setActive(el){
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
}
const sections=document.querySelectorAll('section');
const navLinks=document.querySelectorAll('.nav-links a');
const secObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>{
        link.classList.remove('active');
        if(link.getAttribute('href')==='#'+entry.target.id) link.classList.add('active');
      });
    }
  });
},{threshold:0.4});
sections.forEach(s=>secObserver.observe(s));


document.getElementById('navToggle').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});


document.querySelectorAll('.ripple').forEach(el=>{
  el.addEventListener('click',function(e){
    const r=document.createElement('span');
    const rect=this.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    r.className='ripple-effect';
    r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
    this.appendChild(r);
    setTimeout(()=>r.remove(),600);
  });
});

const roles=['Aspiring AI & Data Science Engineer &','Python Developer &','Machine Learning Enthusiast &','Data Analysis &','Power BI Dashboard Builder'];
let ri=0,ci=0,deleting=false;
const typedEl=document.getElementById('typed-role');
function typeWriter(){
  const current=roles[ri];
  if(!deleting){
    typedEl.textContent=current.substring(0,ci+1);
    ci++;
    if(ci===current.length){ setTimeout(()=>{deleting=true; typeWriter();},2000); return; }
  } else {
    typedEl.textContent=current.substring(0,ci-1);
    ci--;
    if(ci===0){ deleting=false; ri=(ri+1)%roles.length; }
  }
  setTimeout(typeWriter, deleting?50:80);
}
setTimeout(typeWriter,1500);


const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleBtn.querySelector("i");

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  icon.classList.replace("fa-moon", "fa-sun");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
});


function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}


document.getElementById('resumeBtn').addEventListener('click', async (e)=>{
  try {
    const res = await fetch('resume.pdf', { method: 'HEAD' });
    if (!res.ok) throw new Error('not found');
  } catch {
    e.preventDefault();
    showToast('Resume coming soon — please email me!');
  }
});


document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const body = `Hi Shrushti,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  window.location.href = `mailto:shrushtihandge7823@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  showToast('Opening your mail app…');
});


