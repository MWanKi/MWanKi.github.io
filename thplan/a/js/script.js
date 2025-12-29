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