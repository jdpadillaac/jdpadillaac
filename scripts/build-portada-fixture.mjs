import fs from 'node:fs';

const shell = fs.readFileSync('src/styles/shell.css', 'utf8');
const home = fs.readFileSync('src/styles/home.css', 'utf8');
const built = fs.readFileSync('dist/es/index.html', 'utf8');
const homeBlock = built.match(/<div class="home">[\s\S]*<\/html>/)?.[0];
if (!homeBlock) throw new Error('Could not extract .home from dist/es/index.html');
const inner = homeBlock.replace(/<\/html>\s*$/, '').replace(/<script[\s\S]*?<\/script>/g, '');
const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portada referencia (fixture)</title>
<style>
${shell}
${home}
</style>
</head>
<body>
${inner}
<style>.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style>
<script>
(function(){
  var btn=document.querySelector('.h-menu-btn'), nav=document.getElementById('h-nav');
  if(!btn||!nav) return;
  btn.addEventListener('click',function(){
    var open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(!open));
    nav.classList.toggle('is-open',!open);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.focus();}
  });
})();
</script>
</body>
</html>
`;

fs.mkdirSync('tests/fixtures', { recursive: true });
fs.writeFileSync('tests/fixtures/portada-referencia.html', html);
