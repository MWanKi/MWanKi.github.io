document.addEventListener('DOMContentLoaded', () => {
  // AOS 초기화
  AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease-out-cubic'
  });

  // 헤더 스크롤 인터랙션
  const header = document.querySelector('.b-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 스무스 스크롤 (내부 링크 이동 시)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // 헤더 높이만큼 오프셋
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {

  // 1. 숫자 카운팅 (Scroll Trigger)
  const counters = document.querySelectorAll('.counter');

  const runCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText.replace(/,/g, '');
    const increment = target / 100; // 속도 조절

    if (count < target) {
      el.innerText = Math.ceil(count + increment).toLocaleString();
      setTimeout(() => runCounter(el), 20);
    } else {
      el.innerText = target.toLocaleString();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach(c => observer.observe(c));

  // 2. 이미지 틸트(Tilt) 패럴랙스 효과
  const cards = document.querySelectorAll('.success-card');

  cards.forEach(card => {
    const img = card.querySelector('img');

    card.addEventListener('mousemove', (e) => {
      const { offsetWidth: width, offsetHeight: height } = card;
      const { offsetX: x, offsetY: y } = e;

      // 중앙 기준 좌표 계산 (-1 ~ 1)
      const moveX = (x - width / 2) / (width / 2);
      const moveY = (y - height / 2) / (height / 2);

      // 회전값 적용 (최대 10도)
      const rotateY = moveX * 10;
      const rotateX = moveY * -10;

      img.style.transform = `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const logoItems = document.querySelectorAll('.logo-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. 활성 탭 상태 변경
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // 2. 로고 필터링 애니메이션
      logoItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.classList.remove('hide');
          item.classList.add('show');
        } else {
          item.classList.add('hide');
          item.classList.remove('show');
        }
      });
    });
  });
});


// 스크롤 시 애니메이션 트리거
document.addEventListener('DOMContentLoaded', () => {
  const infoSection = document.querySelector('.b-infographic');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        infoSection.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (infoSection) observer.observe(infoSection);
});


document.addEventListener('DOMContentLoaded', () => {
  // 폼 제출 로직 외 불필요한 마우스 트래킹 삭제
  const form = document.querySelector('.b-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.premium-btn');
      btn.querySelector('.btn-text').innerText = 'SENDING...';
      setTimeout(() => {
        alert('정상적으로 접수되었습니다.');
        form.reset();
        btn.querySelector('.btn-text').innerText = 'SEND INQUIRY';
      }, 2000);
    });
  }
});