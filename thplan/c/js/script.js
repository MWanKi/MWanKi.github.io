document.addEventListener('DOMContentLoaded', () => {
  // AOS 애니메이션 초기화
  AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true
  });

  // 헤더 스크롤 인터랙션
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.height = '70px';
      header.style.background = 'rgba(11, 14, 20, 0.95)';
    } else {
      header.style.height = '90px';
      header.style.background = 'rgba(11, 14, 20, 0.6)';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const counter = document.querySelector('.counter');

  const startCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const speed = 2000 / target; // 2초 동안 진행

    const updateCount = () => {
      count++;
      el.innerText = count;
      if (count < target) {
        setTimeout(updateCount, speed);
      } else {
        el.innerText = target;
      }
    };
    updateCount();
  };

  // 스크롤 감지 로직
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCount(entry.target);
        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, { threshold: 0.5 });

  if (counter) observer.observe(counter);
});

document.addEventListener('DOMContentLoaded', () => {
  // 퍼널 카드 클릭 시 문의하기 폼으로 부드럽게 이동
  const funnelCards = document.querySelectorAll('.funnel-card');

  funnelCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = card.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100, // 헤더 높이만큼 보정
          behavior: 'smooth'
        });
      }
    });
  });
});