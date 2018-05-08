(() => {
  window.dialog.init();
  
  let menuMode = false;

  let app = $('.app');
  let iframe = $('iframe');

  let bookWrapper = $('.book-wrapper');
  let topMenu = $('.app-menu.top');

  iframe.on('load', () => {
    iframe[0].contentDocument.addEventListener('click', toggleMenuMode);
    iframe[0].contentDocument.addEventListener('touchend', toggleMenuMode);
    iframe[0].contentDocument.documentElement.scrollTop = 5000;

    if (!!navigator.userAgent.match(/iP(ad|hone|od)/i) && !!navigator.userAgent.match(/WebKit/i) && !navigator.userAgent.match(/CriOS/i)) {
      iframe.css('width', iframe[0].parentElement.offsetWidth);
      iframe.css('height', iframe[0].parentElement.offsetHeight);
    }
  });

  $('.clickable-menu, .clickable-menu *').each((index, element) => {
    element.bukMenu = true;
  });

  document.documentElement.addEventListener('click', (event) => {
    if (!event.target.bukMenu) toggleMenuMode();
  });

  const toggleMenuMode = () => {
    menuMode = !menuMode;

    if (menuMode) {
      app.addClass('menu-mode');
      const scale = calculateScale().toFixed(3);
      bookWrapper.css('transform', `scale3d(${scale}, ${scale}, 1)`);
    } else {
      app.removeClass('menu-mode');
      bookWrapper.css('transform', 'scale3d(1, 1, 1)');
    }
  };

  const calculateScale = () => {
    let naviWidth = window.innerWidth - 24 * 2;
    let naviHeight = window.innerHeight - 24 - topMenu[0].offsetHeight;

    let pageWidth = bookWrapper[0].offsetWidth;
    let pageHeight = bookWrapper[0].offsetHeight;

    let scale;
    if (naviWidth / naviHeight  > pageWidth / pageHeight) {
      scale = naviHeight / pageHeight;
    } else {
      scale = naviWidth / pageWidth;
    }

    return scale;
  };

  $.get('../contents.html?' + (new Date()).getTime(), (data) => {
    iframe[0].contentDocument.open();
    iframe[0].contentDocument.write(data);
    iframe[0].contentDocument.close();
  });

})();