'use strict';
window.mahlo = ( (base, document) => {
  var mahlo = {};
  var elemCount = 0;
  var loadEvent = () => {};
  var holdUp, delay, offset;

  var check = () => {
    clearTimeout(holdUp);
    holdUp = setTimeout( () => {
      mahlo.show();
      holdUp = null;
    }, delay);
  };

  var inView = (item, window) => {
    if (notShown(item)) {
      return false;
    }
    var container = item.getBoundingClientRect();
    return (container.top <= window.bottom 
        && container.right >= window.left 
        && container.bottom >= window.top 
        && container.left <= window.right);
  };

  var notShown = (item) => {
    return (item.offsetParent === null);
  };

  mahlo.init = (option) => {
    option = option || {};
    const {offset: offsetMain=0} = option;
    const {offsetHrz=offsetMain} = option;
    const {offsetVrt=offsetMain} = option;
    const optionInt = (options, initial) => {
      return parseInt(options || initial);
    };
    offset = {hrz: offsetHrz, vrt: offsetVrt};
    delay = optionInt(option.check, 500);
    ({loadEvent=loadEvent} = option);

    mahlo.show();
    if (document.addEventListener) {
      base.addEventListener('scroll', check, false);
      base.addEventListener('load', check, false);
    } else {
      base.attachEvent('onscroll', check);
      base.attachEvent('onload', check);
    }
  };

  mahlo.show = () => {
    var elements = document.querySelectorAll('img[data-mahlo]');
    var elemTotal = elements.length;
    var window = {
      top: 0 - offset.vrt,
      right: base.innerWidth + offset.hrz,
      bottom: base.innerHeight + offset.vrt,
      left: 0 - offset.hrz
    };

    elements.forEach((elem) => {
      if (inView(elem, window)) {
        elem.src = elem.getAttribute('data-mahlo');
        var srcSet = elem.getAttribute('data-set-mahlo');
        if (srcSet) {
          elem.setAttribute('srcset', srcSet);
          elem.removeAttribute('data-set-mahlo');
        }
        elem.removeAttribute('data-mahlo');
        loadEvent(elem, 'load');
        elemCount++;
      }
    });

    if (elemCount === elemTotal) {
      mahlo.detach();
    }
  };

  mahlo.detach = () => {
    if (document.removeEventListener) {
      base.removeEventListener('scroll', check);
    } else {
      base.detachEvent('onscroll', check);
    }

    clearTimeout(holdUp);
  };

  return mahlo;
})(this, document);
