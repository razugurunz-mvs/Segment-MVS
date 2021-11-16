import '../global.js'
import '../plugins/fixed-block.js'


export const MobileNav = () => {
    var navopener = $('.nav-opener'),
    navwrap   = $('.navigation'),
    links     = navwrap.find('a'),
    navactive = 'nav-active';

    navopener.click(function(event) {
        event.preventDefault()
        $('body').toggleClass(navactive);
    });

    $('.navigation li').each(function() {
        var item = $(this);
        var drop = item.find('.drop-down');
        var link = item.find('a').eq(0);
        if(drop.length) {
            item.addClass('hasdrop');
            if(link.length) link.addClass('hasdrop-a').attr({'data-more': '', 'data-outside': ''});
        }
        
        var test = jQuery('.hasdrop-a');

        $(".go-back").on('click', function() {
            test.removeClass("active");
        });
    });

    links.click(function() {
        $(this).hasClass('hasdrop-a') ? false : $('body').removeClass(navactive);
    });

    $('html').on('click touchstart pointerdown MSPointerDown', function(e) {
        var target = $(e.target);
        if(!target.closest(navopener).length && !target.closest(navwrap).length) {
            $('body').removeClass(navactive);
        }
    });
}

export const OpenClose = () => {
    $('[data-more]').next().hide();
    $('[data-more].active').next().show();

    $('[data-more]').click(function(e) {
        e.preventDefault();
        $(this).hasClass('active') ? $(this).removeClass('active').next().slideUp(200) : $(this).addClass('active').next().slideToggle(200);

        if($(this).closest('[data-accordion]').length) {
            $(this).parent().siblings().find('[data-more]').removeClass('active');
            $(this).parent().siblings().find('[data-more]').next().slideUp(200);
        }
    })

    $('[data-outside]').next().find('a:not(.hasdrop-a):not([data-more])').click(function() {
        $('[data-outside]').removeClass('active').next('').slideUp(200);
    });
    $('[data-outside]').click(function(e) {
        $('[data-outside]').not(this).removeClass('active').next().slideUp(200);
    });

    $('html').on('click touchstart pointerdown MSPointerDown', function(e) {
        var target = $(e.target);

        if(!(target.closest('[data-outside]').length) && !(target.closest('[data-outside] + *').length)) {
            setTimeout (function() {
                $('[data-outside]').removeClass('active').next().slideUp(200);
            }, 200)
        }

        if(!(target.closest('[data-outside-1]').length) && !(target.closest('[data-outside-1] + *').length)) {
            setTimeout (function() {
                $('[data-outside-1]').removeClass('active').next().slideUp(200);
            }, 200)
        }
    });
}

export const CustomSelect = () => {
    jQuery('[data-select]').each(function(){
        var item = jQuery(this),
        selectDrop = item.next(),
        linkItems = selectDrop.find('a');

        item.attr({'data-outside': '', 'data-more': ''})

        linkItems.on('click', function(e) {
            e.preventDefault();
            item.text(jQuery(this).text());
            selectDrop.slideUp(200);
            item.removeClass('active').addClass('selected');
            
            selectDrop.find('li').removeClass('active');
            jQuery(this).parent().addClass('active');
        });

        if(selectDrop.children().hasClass('active')) {
            item
            .text(jQuery(this).next().find('.active a').text())
            .addClass('selected');
        }
    });
}

export const Tabs = () => {
    $('[data-tab]').click(function(e){
        e.preventDefault();
        var tab_id = $(this).attr('data-tab');

        $(this).parent().siblings().find('[data-tab]').removeClass('active');
        $("#"+tab_id).siblings().removeClass('active');

        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    })
    $('#'+$('[data-tab].active').data('tab')).addClass('active');
}

export const HeaderFixed = () => {
    jQuery('#header').stickyScrollBlock({
		setBoxHeight: true,
		activeClass: 'fixed-position',
		positionType: 'fixed'
	});
}

export const test = () => {
    (function ($) {
  var input = $("#hero-form input[type='email']")

  $("input[type='email']").on('keyup change', function (e) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test($(this).val())) {
      input.closest('form').addClass('invalid')
    } else {
      input.closest('form').removeClass('invalid')
    }
  })

  $('#hero-form, .js-demo-form').submit(function (e) {
    if ($(this).hasClass("invalid")) {
       e.preventDefault()
      return false;
    }
    const currentInput = $(this).find("input[type='email']")

    if (currentInput.val() === '') {
      return
    }

    e.preventDefault()

    // Utility to convert parameters into an object
    function deparam(paramString) {
      let obj = {};

      paramString = paramString.replace('?', '');
      const params = paramString.split('&');

      params.forEach(param => {
        const paramArr = param.split('='),
          key = paramArr[0],
          val = paramArr[1];
        obj[key] = val;
      });

      return obj;
    }

    var encodedEmail = btoa(currentInput.val())

    // Carry over params from the previous page if applicable
    let appendedParams = {}
    if(window.location.href.indexOf('?') >= 0) {
      var queryParams = window.location.href.split('?')
      appendedParams = deparam(queryParams[1])
    }

    // Check for hidden utm input and append to parameters if it exists
    const hiddenUtmsInput = $(this).find("input[name='hidden_utm']")
    let hiddenUtms = ''
    if( hiddenUtmsInput.length > 0 ){
      hiddenUtms = deparam(hiddenUtmsInput.val())
    }
    if( appendedParams ) {
      // replace the applicable keys
      Object.keys(hiddenUtms).forEach(key => {
        appendedParams[key] = hiddenUtms[key];
      })
    }else{
      appendedParams = hiddenUtms;
    }

    const appendedParamString = `&${$.param(appendedParams)}`;

    // See https://stackoverflow.com/a/506004 for browser redirect API:
    let redirect = `/demo/?email=${encodedEmail}${appendedParamString}`
    if((window.location.pathname).indexOf('/journeys') >= 0) {
      redirect = `https://learn.segment.com/journeys-demo-request/?email=${encodedEmail}${appendedParamString}`
    }
    window.location.href = redirect
    return false
  })
})
}
