// 스크롤 등장 효과와 휴대폰 메뉴
document.documentElement.classList.add('js');

// 새 페이지는 항상 맨 위에서 시작 (#위치로 이동하는 링크는 제외)
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
function toTop() { if (!location.hash) { window.scrollTo(0, 0); } }
window.addEventListener('pageshow', toTop);
window.addEventListener('load', toTop);

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mobile-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
  }
});
