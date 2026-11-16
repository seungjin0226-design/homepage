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

  // 이벤트 팝업
  var pop = document.getElementById('event-pop');
  if (pop) {
    var key = 'pop-hide-' + pop.id;
    var today = new Date(); var ymd = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    var until = pop.getAttribute('data-until');
    var hidden = false;
    try { hidden = localStorage.getItem(key) === ymd; } catch (e) {}
    if ((!until || ymd <= until) && !hidden) {
      pop.hidden = false; document.body.classList.add('pop-open');
      var first = pop.querySelector('[data-pop-close]'); if (first) first.focus();
    }
    var closePop = function () { pop.hidden = true; document.body.classList.remove('pop-open'); };
    pop.querySelectorAll('[data-pop-close]').forEach(function (b) { b.addEventListener('click', closePop); });
    var t = pop.querySelector('[data-pop-today]');
    if (t) t.addEventListener('click', function () { try { localStorage.setItem(key, ymd); } catch (e) {} closePop(); });
    pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) closePop(); });
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
