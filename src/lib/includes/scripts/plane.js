let config = {
  autoPlay: true,
  fullScreen: {
    enable: true
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'window',
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 150
      },
      push: {
        quantity: 1
      },
      trail: {
        delay: 0.05,
        quantity: 1,
        pauseOnStop: true
      }
    }
  },

  particles: {
    color: {
      value: '#fff',
      animation: {
        h: {
          count: 0
        }
      }
    },
    move: {
      enable: true,
      direction: 'right',
      straight: false
    },
    opacity: {
      value: {
        min: 0.1,
        max: 0.5
      },
      animation: {
        enable: true,
        speed: 0.5,
        startValue: 'random',
        minimumValue: 0.2
      }
    },
    number: {
      density: {
        enable: true,
        area: 800,
        factor: 1000
      },
      limit: 0,
      value: 10
    },
    rotate: {
      path: true
    },
    shape: {
      type: 'image',
      image: {
        width: 100,
        height: 100,
        src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1mYS1zb2xpZCIgd2lkdGg9IjEuMTNlbSIgaGVpZ2h0PSIxZW0iIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBkPSJNNDgwIDE5MkgzNjUuNzFMMjYwLjYxIDguMDZBMTYuMDE0IDE2LjAxNCAwIDAgMCAyNDYuNzEgMGgtNjUuNWMtMTAuNjMgMC0xOC4zIDEwLjE3LTE1LjM4IDIwLjM5TDIxNC44NiAxOTJIMTEybC00My4yLTU3LjZjLTMuMDItNC4wMy03Ljc3LTYuNC0xMi44LTYuNEgxNi4wMUM1LjYgMTI4LTIuMDQgMTM3Ljc4LjQ5IDE0Ny44OEwzMiAyNTZMLjQ5IDM2NC4xMkMtMi4wNCAzNzQuMjIgNS42IDM4NCAxNi4wMSAzODRINTZjNS4wNCAwIDkuNzgtMi4zNyAxMi44LTYuNEwxMTIgMzIwaDEwMi44NmwtNDkuMDMgMTcxLjZjLTIuOTIgMTAuMjIgNC43NSAyMC40IDE1LjM4IDIwLjRoNjUuNWM1Ljc0IDAgMTEuMDQtMy4wOCAxMy44OS04LjA2TDM2NS43MSAzMjBINDgwYzM1LjM1IDAgOTYtMjguNjUgOTYtNjRzLTYwLjY1LTY0LTk2LTY0eiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PC9zdmc+'
      }
    },
    size: {
      value: 64,
      random: {
        enable: true,
        minimumValue: 8
      }
    }
  }
};

const particles = $('#lusend-particles')
  .particles()
  .init(config, (container) => {
    $('#lusend-toggle-plane').on('click', function () {
      if ($('#lusend-toggle-plane').attr('data-active') !== undefined) {
        $('#lusend-hide-plane').hide();
        $('#lusend-show-plane').show();
        $('#lusend-toggle-plane').removeAttr('data-active');
        $('#lusend-particles').css('opacity', 0);
        $('#lusend-plane-density-menu').css('opacity', 0);
        $('#lusend-plane-density-menu').css('pointer-events', 'none');
        container.stop();
      } else {
        $('#lusend-hide-plane').show();
        $('#lusend-show-plane').hide();
        $('#lusend-toggle-plane').attr('data-active', '');
        $('#lusend-particles').css('opacity', 1);
        $('#lusend-plane-density-menu').css('opacity', 1);
        $('#lusend-plane-density-menu').css('pointer-events', 'auto');
        container.start();
      }
    });

    $('#lusend-plane-density').on('input', function () {
      container.options.particles.number.density.area = $(
        '#lusend-plane-density'
      ).val();
      container.refresh();
    });

    if ($('#lusend-toggle-plane').attr('data-active') === undefined) {
      container.stop();
    }

    Mousetrap.bind(
      'up up down down left right left right b a enter',
      function () {
        container.options.particles.size.value = 300;
        container.options.particles.opacity.value.min = 0.8;
        container.options.particles.opacity.value.max = 1;
        container.options.particles.shape.image.width = 102;
        container.options.particles.shape.image.height = 73;
        container.options.interactivity.events.onHover.mode = 'trail';
        container.options.particles.number.density.area = 50;
        container.options.particles.shape.image.src =
          'https://liberty-sa.terradotta.com/_customtags/ct_FileRetrieve.cfm?File_ID=34475';
        container.refresh();
      }
    );
  });
