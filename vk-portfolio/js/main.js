(function () {
  var $ = function (s, r) {
      return (r || document).querySelector(s)
    },
    $$ = function (s, r) {
      return Array.prototype.slice.call((r || document).querySelectorAll(s))
    };

  // 1. Heading reveal: split into words, then letters (so words never break mid-word)
  function split(n, d) {
    Array.prototype.slice.call(n.childNodes).forEach(function (c) {
      if (c.nodeType === 3) {
        var f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) {
            f.appendChild(document.createTextNode(' '));
            return
          }
          var ws = document.createElement('span');
          ws.className = 'w';
          w.split('').forEach(function (ch) {
            var s = document.createElement('span');
            s.className = 'c';
            s.textContent = ch;
            s.style.animationDelay = (d.i++ * .03) + 's';
            ws.appendChild(s)
          });
          f.appendChild(ws)
        });
        n.replaceChild(f, c)
      }
      else split(c, d)
    })
  }
  var h1 = $('#h1');
  if (h1) {
    h1.setAttribute('aria-label', h1.textContent);
    split(h1, { i: 0 })
  }

  // 2. Sliding nav underline
  var nav = $('#nav');
  if (nav) {
    var bar = $('.bar', nav),
      on = $('.on', nav);
    var to = function (a) {
      if (!a) {
        bar.style.width = '0';
        return
      }
      bar.style.left = a.offsetLeft + 'px';
      bar.style.width = a.offsetWidth + 'px'
    };
    $$('a', nav).forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        to(a)
      });
      a.addEventListener('focus', function () {
        to(a)
      })
    });
    nav.addEventListener('mouseleave', function () {
      to(on)
    });
    window.addEventListener('load', function () {
      to(on)
    });
    window.addEventListener('resize', function () {
      to(on)
    });
  }

  // 3. Timeline nodes light up on scroll (experience page)
  var items = $$('.tl li');
  if (items.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('lit')
        })
      }, { threshold: .5 });
      items.forEach(function (i) {
        io.observe(i)
      });
    } else items.forEach(function (i) {
      i.classList.add('lit')
    });
  }

  // 4. Project filters (projects page)
  $$('.tag[data-f]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.tag[data-f]').forEach(function (x) {
        x.classList.remove('on')
      });
      b.classList.add('on');
      var f = b.dataset.f;
      $$('.p').forEach(function (p) {
        p.classList.toggle('hide', f !== 'all' && p.dataset.c !== f)
      });
    })
  });

  // 5. Contact form: validate and post directly to Web3Forms.
  var form = $('#f');
  if (form) form.addEventListener('submit', function (ev) {
    var n = $('#n').value.trim(),
      e = $('#e').value.trim(),
      m = $('#m').value.trim(),
      s = $('#s');
    if (!n || !/\S+@\S+\.\S+/.test(e) || !m) {
      ev.preventDefault();
      s.textContent = 'Enter your name, a valid email, and a message.';
      return
    }
    ev.preventDefault();
    var submit = $('input[type="submit"]', form),
      dialog = $('#success-dialog'),
      close = $('#success-close');
    s.textContent = 'Sending message…';
    submit.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data.success) throw new Error(data.message || 'Message could not be sent. Please try again.');
          return data
        })
      })
      .then(function () {
        form.reset();
        s.textContent = '';
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
          close.focus()
        } else {
          s.textContent = 'Your message has been sent successfully.'
        }
      })
      .catch(function (error) {
        s.textContent = error.message || 'Message could not be sent. Please try again.';
      })
      .finally(function () {
        submit.disabled = false
      });
  });
  var successDialog = $('#success-dialog');
  if (successDialog) {
    $('#success-close').addEventListener('click', function () { successDialog.close() });
    successDialog.addEventListener('click', function (ev) {
      if (ev.target === successDialog) successDialog.close()
    });
  }
})();

