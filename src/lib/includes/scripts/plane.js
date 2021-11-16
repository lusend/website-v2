let config = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 5000
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'image',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='0 0 1200 1200'%3E%3Cpath d='M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22L321 1164z' fill='currentColor' style='opacity: 0.5'%3E%3C/path%3E%3C/svg%3E",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 50,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 20,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'right',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 121.81158184520177,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

const particles = particlesJS('lusend-particles', config);

$(document).ready(function () {
  $('#lusend-toggle-plane').on('click', function () {
    if ($('#lusend-toggle-plane').attr('data-active') !== undefined) {
      $('#lusend-hide-plane').hide();
      $('#lusend-show-plane').show();
      $('#lusend-toggle-plane').removeAttr('data-active');
      $('#lusend-particles').css('opacity', 0);
      $('#lusend-plane-density-menu').css('opacity', 0);
      $('#lusend-plane-density-menu').css('pointer-events', 'none');
      pJSDom[0].pJS.particles.move.enable = false;
      pJSDom[0].pJS.fn.particlesRefresh();
    } else {
      $('#lusend-hide-plane').show();
      $('#lusend-show-plane').hide();
      $('#lusend-toggle-plane').attr('data-active', '');
      $('#lusend-particles').css('opacity', 1);
      $('#lusend-plane-density-menu').css('opacity', 1);
      $('#lusend-plane-density-menu').css('pointer-events', 'auto');
      pJSDom[0].pJS.particles.move.enable = true;
      pJSDom[0].pJS.fn.particlesRefresh();
    }
  });

  $('#lusend-plane-density').on('input', function () {
    window.pJSDom[0].pJS.particles.number.density.value_area = $(
      '#lusend-plane-density'
    ).val();
    window.pJSDom[0].pJS.fn.particlesRefresh();
  });

  if ($('#lusend-toggle-plane').attr('data-active') === undefined) {
    pJSDom[0].pJS.particles.move.enable = false;
    pJSDom[0].pJS.fn.particlesRefresh();
  }
});
