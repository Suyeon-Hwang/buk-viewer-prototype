(() => {
  const dialogs = ['library', 'book-info', 'bookmark', 'pdf-thumbnail'];
  
  const head = $('head');
  const body = $('body');

  const init = () => {
    head.append(`<link rel="stylesheet" type="text/css" href="/dialogs/dialog.css">`);

    dialogs.forEach((dialog) => {
      $.get(`/dialogs/${dialog}/index.html`, (data) => {
        body.append(data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, ''));
        head.append(`<link rel="stylesheet" type="text/css" href="/dialogs/${dialog}/style.css">`);

        const dialogElem = $(`.dialog#${dialog}`);
        dialogElem.on('click touchend touchstart', (event) => {
          event.stopPropagation();
        });
        dialogElem.find('.close-button').on('click touchend', (event) => {
          dialogElem.removeClass('active');
        });
      });
    });
  };

  const activate = (dialogId) => {
    body.find(`.dialog#${dialogId}`).addClass('active');
  }

  window.dialog = {
    init, activate
  };
})();