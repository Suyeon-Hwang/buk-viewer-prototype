(() => {
  window.dialog.init();
  
  let menuMode = false;
  let bookmarked = false

  const app = $('.app');
  const iframe = $('iframe');

  const bookWrapper = $('.book-wrapper');
  const topMenu = $('.app-menu.top');
  const bookmarkers = $('[bookmarker]');

  const leftImg = $('img.left');
  const rightImg = $('img.right');
  const imgContainer = $('.img-container');

  // iframe.on('load', () => {
  //   iframe[0].contentDocument.addEventListener('click', toggleMenuMode);
  //   iframe[0].contentDocument.addEventListener('touchend', toggleMenuMode);
  //   iframe[0].contentDocument.documentElement.scrollTop = 4500;

  //   if (!!navigator.userAgent.match(/iP(ad|hone|od)/i) && !!navigator.userAgent.match(/WebKit/i) && !navigator.userAgent.match(/CriOS/i)) {
  //     iframe.css('width', iframe[0].parentElement.offsetWidth);
  //     iframe.css('height', iframe[0].parentElement.offsetHeight);
  //   }
  // });

  $('.clickable-menu, .clickable-menu *').each((index, element) => {
    element.bukMenu = true;
  });

  bookmarkers.on('click', () => toggleBookmark());

  document.documentElement.addEventListener('click', (event) => {
    if (!event.target.bukMenu) toggleMenuMode();
  });

  const fixedWidth = 1075;
  const fixedHeight = 1518;

  const toggleBookmark = () => {
    bookmarked = !bookmarked;

    bookmarkers.attr('bookmarker', bookmarked);
  }

  const toggleMenuMode = () => {
    menuMode = !menuMode;

    if (menuMode) {
      app.addClass('menu-mode');
      const scale = calculateScale(window.innerWidth, window.innerHeight).toFixed(3);
      bookWrapper.css('transform', `scale3d(${scale}, ${scale}, 1)`);
    } else {
      app.removeClass('menu-mode');
      bookWrapper.css('transform', 'scale3d(1, 1, 1)');
    }
  };

  const calculateScale = (pageWidth, pageHeight) => {
    let naviWidth = window.innerWidth; //- 24 * 2;
    let naviHeight = window.innerHeight - 24 - topMenu[0].offsetHeight;

    let scale;
    if (naviWidth / naviHeight  > pageWidth / pageHeight) {
      scale = naviHeight / pageHeight;
    } else {
      scale = naviWidth / pageWidth;
    }

    return scale;
  };

  const calculateVerticalTransformOrigin = (scale) => {

  }

  const setImageSize = (twoPage) => {
    let fullHeight = window.innerHeight;

    let width, height, marginTop;

    if (twoPage) {
      let size1 = calculateImageSize(fixedWidth, fixedHeight, twoPage);
      let size2 = calculateImageSize(fixedWidth, fixedHeight, twoPage);
      width = size1.width + size2.width;
      height = Math.max(size1.height, size2.height);
    } else {
      let size = calculateImageSize(fixedWidth, fixedHeight);
      width = size.width;
      height = size.height;
    }

    if (fullHeight - height > 0) {
      marginTop = (fullHeight - height) / 2;
    } else {
      marginTop = 0;
    }

    // if (twoPage) {
    //   leftImg.css({
    //     width, height, marginTop
    //   });
    // }

    // rightImg.css({
    //   width, height, marginTop
    // });
    imgContainer.css({
      width, height, top: marginTop
    });
  }

  const calculateImageSize = (fixedWidth, fixedHeight, twoPage) => {
    let horizontalSpacing = 0; //window.innerWidth > 414 ? 48 : 0;

    let fullWidth = window.innerWidth;
    let fullHeight = window.innerHeight;

    let availableWidth = fullWidth - (horizontalSpacing * 2);
    if (twoPage) availableWidth /= 2;
    let availableHeight = fullHeight;

    let scale;

    if (availableWidth / availableHeight > fixedWidth / fixedHeight) {
      scale = availableHeight / fixedHeight;
    } else {
      scale = availableWidth / fixedWidth;
    }

    return {
      width: Math.round(scale * fixedWidth),
      height: Math.round(scale * fixedHeight)
    };
  }

  setImageSize(true);

  // $.get('../contents.html?' + (new Date()).getTime(), (data) => {
  //   iframe[0].contentDocument.open();
  //   iframe[0].contentDocument.write(data);
  //   iframe[0].contentDocument.close();
  // });

})();