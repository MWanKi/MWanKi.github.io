// Sticky Form & Mobile Button Control
document.addEventListener('DOMContentLoaded', () => {
  const stickyForm = document.getElementById('stickyForm');
  const mobileBtn = document.querySelector('.mobile-contact-btn');
  const problemSection = document.getElementById('problem');
  let hasShown = false;

  window.addEventListener('scroll', () => {
    if (!problemSection) return;
    
    const sectionTop = problemSection.offsetTop;
    const sectionHeight = problemSection.offsetHeight;
    const sectionMiddle = sectionTop + (sectionHeight / 2);
    const scrollPosition = window.scrollY + window.innerHeight;
    
    // 섹션 2가 중간쯤 보일 때 표시
    if (scrollPosition >= sectionMiddle && !hasShown) {
      // PC: Sticky Form 표시
      if (window.innerWidth > 768 && stickyForm) {
        stickyForm.classList.add('show');
      }
      // Mobile: 플로팅 버튼 표시
      if (window.innerWidth <= 768 && mobileBtn) {
        mobileBtn.classList.add('show');
      }
      hasShown = true;
    }
  });
});

function closeStickyForm() {
  const stickyForm = document.getElementById('stickyForm');
  stickyForm.classList.remove('show');
}

// Sticky Form 제출 처리
document.addEventListener('DOMContentLoaded', () => {
  const stickyForm = document.querySelector('.sticky-form');
  if (stickyForm) {
    stickyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      stickyForm.reset();
    });
  }
});

// Mobile Modal Control
function openMobileModal() {
  const modal = document.getElementById('mobileModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMobileModal() {
  const modal = document.getElementById('mobileModal');
  modal.classList.add('closing');
  
  // 애니메이션 완료 후 모달 제거
  setTimeout(() => {
    modal.classList.remove('show', 'closing');
    document.body.style.overflow = '';
  }, 300);
}

// Mobile Modal Form 제출 처리
document.addEventListener('DOMContentLoaded', () => {
  const mobileForm = document.querySelector('.mobile-modal-form');
  if (mobileForm) {
    mobileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      mobileForm.reset();
      closeMobileModal();
    });
  }
});
