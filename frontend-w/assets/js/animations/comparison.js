gsap.registerPlugin(ScrollTrigger);

const comTb = document.querySelector('.comparison');
const center = comTb.querySelector('.centralized');
const centerNo = center.querySelector('.number');

const alinaItems = comTb.querySelectorAll('.alina li span');
const freelancerItems = comTb.querySelectorAll('.freelancer li span');

function getResponsiveEndValue() {
  return window.innerWidth < 800 ? '+=400' : '+=700';
}

function getResponsiveTopValue() {
  return window.innerWidth < 1000 ? '400px' : '540px';
}

// Store original styles to reset if needed
alinaItems.forEach(item => item.dataset.originalTransform = 'scale(1) translateX(0)');
freelancerItems.forEach(item => item.dataset.originalTransform = 'scale(1) translateX(0)');

const compareTL = gsap.timeline({
  scrollTrigger: {
    trigger: comTb,
    start: '-30% top',
    end: '+=700',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const countValue = Math.round(progress * 89);
      centerNo.textContent = countValue;

      // Calculate transformations for list items
      updateListItemsTransforms(center.getBoundingClientRect());
    }
  }
});

compareTL.to(center, {
  top: getResponsiveTopValue(),
  duration: 8
});

function updateListItemsTransforms(centerRect) {
  const centerY = centerRect.top + centerRect.height / 2;

  // Transform Alina items (right side)
  transformItems(alinaItems, centerY, -20, 1.3); // Positive X, full scale

  // Transform Freelancer items (left side)
  transformItems(freelancerItems, centerY, 20, 1.3); // Negative X, full scale
}

function transformItems(items, centerY, maxTranslateX, maxScale) {
  items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenterY = itemRect.top + itemRect.height / 2;
    const distance = Math.abs(itemCenterY - centerY);
    const maxDistance = 150; // Pixels from center where effect starts fading

    if (distance < maxDistance) {
      // Calculate intensity (1.0 when centered, 0.0 at maxDistance)
      let intensity = 1 - (distance / maxDistance);

      // For first and last of 3 center items, reduce intensity by 50%
      if (index === 0 || index === 2) intensity *= 0.5;

      const translateX = maxTranslateX * intensity;
      const scale = 1 + (maxScale - 1) * intensity;

      gsap.to(item, {
        x: translateX,
        scale: scale,
        duration: 0.2,
        overwrite: 'auto'
      });
    } else {
      // Reset if too far from center
      gsap.to(item, {
        x: 0,
        scale: 1,
        duration: 0.2,
        overwrite: 'auto'
      });
    }
  });
}

// Listen for resize to recalculate positions
window.addEventListener('resize', () => {
  if (compareTL.scrollTrigger) {
    updateListItemsTransforms(center.getBoundingClientRect());
  }
});