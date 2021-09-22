const navRef = document.querySelector('.nav-site__list');
const labelRef = document.querySelector('.map__label');

navRef.addEventListener('click', clickOnNav);

function clickOnNav(e) {
  e.preventDefault();
  const target = e.target.closest('.nav-site__item');

  if (!target) return;

  setActiveItem(target);
  setActiveLabel(target);
}

function setActiveItem(nextActiveItem) {
  const currentActiveItem = navRef.querySelector('li.nav-site__item--active');

  if (currentActiveItem) {
    currentActiveItem.classList.remove('nav-site__item--active');
  }

  nextActiveItem.classList.add('nav-site__item--active');
}
function setActiveLabel(ActiveItem) {
  const mapLabels = document.querySelectorAll('.map__label');

  const type = ActiveItem.dataset.type;
  const currentActiveLabel = [...mapLabels].filter(el =>
    el.dataset.type.includes(type),
  );
  [...mapLabels].map(el => el.classList.remove('map__label--active'));
  if (ActiveItem.classList.contains('nav-site__item--active')) {
    currentActiveLabel.map(el => el.classList.add('map__label--active'));
  }
}

const slider = document.querySelector('.map__container');
let mouseDown = false;
let startX, startY, scrollLeft, scrollTop;

const startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  startY = e.pageY - slider.offsetTop;
  scrollLeft = slider.scrollLeft;
  scrollTop = slider.scrollTop;
};
const stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener('mousemove', e => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - slider.offsetLeft;
  const y = e.pageY - slider.offsetTop;
  const scrollX = x - startX;
  const scrollY = y - startY;
  slider.scrollLeft = scrollLeft - scrollX;
  slider.scrollTop = scrollTop - scrollY;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
