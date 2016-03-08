//////////////////////////////////////////////////////////
//
// TopPage Link
//
//////////////////////////////////////////////////////////

(function($){
	$('a[href^=#]').on('click',function(){
		var $this = $(this);
		var $href = $this.attr('href');
		if(!$href.match(/^#change_[0-9]/)){ //jQueryMobile回避
			if ($href === '#' || $href === ''){
				var $target = 'html';
			} else {
				var $target = $href;
			}
			var $pos = $($target).offset().top;
			$('body,html').animate({scrollTop: $pos},500,'swing');
		}
	});
})(jQuery);


//////////////////////////////////////////////////////////
//
// Top Fixed
//
//////////////////////////////////////////////////////////

(function($){
	var $t = $('.js-scroll-fixed');

	if($t.length > 0){
		var $subt = $('.js-scroll-height');
		var $tPos = $t.offset().top;
		var $tHeight = $t.outerHeight();
		$(window).scroll(function(){
			_scroll($t,$tPos,$tHeight);
		});
	}

	$('.js-slide-inn').each(function(){
			if($(this).hasClass('_on') !== true){
				$(this).hide();
			}else{
				$(this).show();
			}
		})

	$(document).on('click','.js-slide-arrow',function(){
		var $this = $(this);
		_toggleWindow($this);
		return false;
	});

	function _scroll($t,$tPos,$tHeight){
		var $wPos = $(window).scrollTop();
		if($wPos > $tPos){
			$t.addClass('fixed');
			$subt.css({'height':$tHeight});
			$('.js-slide-inn').slideUp();
			$('.js-slide-inn').closest('li').find('.js-slide-arrow').removeClass('slideOpenWindow');
		}else{
			$t.removeClass('fixed');
			$subt.removeAttr('style');
		}
	};

	function _toggleWindow($this){
		if($this.hasClass('slideOpenWindow') === true){
			$this.removeClass('slideOpenWindow');
			$this.closest('li').find('> .js-slide-inn').slideUp();
		}else{
			$this.addClass('slideOpenWindow');
			$this.closest('li').find('> .js-slide-inn').slideDown();
		}
	}
})(jQuery);


//////////////////////////////////////////////////////////
//
// Bottom fixed
//
//////////////////////////////////////////////////////////

(function($){
	$(document).on('scroll touchmove', function(){
		var $elemFix = $('.fixedSubmit');
		var $winH = window.innerHeight;
		var $fixedSubmitH = $elemFix.outerHeight();
		var $scTop = $(window).scrollTop();
		$elemFix.stop(true, true).css({
			"display": "none",
			top: $scTop + $winH - $fixedSubmitH
		}).delay(500).fadeIn(700);
	});
})(jQuery);


//////////////////////////////////////////////////////////
//
// CheckBox
//
//////////////////////////////////////////////////////////

(function($){
	var $tCheck = $('.js-check');
	$($tCheck).find('a').on('click',function(){
		if($(this).hasClass('on') === false){
			$(this).closest($tCheck).find('a').removeClass('on');
			$(this).addClass('on');
		}
		return false;
	});
})(jQuery);


//////////////////////////////////////////////////////////
//
// Tap Style
//
//////////////////////////////////////////////////////////

(function () {
	var _tapClass = "";
	var _hoverClass = "";

	var Hover = window.Hover = function (ele) {
		return new Hover.fn.init(ele);
	};
	Hover.fn = {
		//Hover Instance
		init : function (ele) {
			this.prop = ele;
		}

		,on : function (_hoverClass, _tapClass) {
			hoverClass = _hoverClass;
			tapClass = _tapClass;

			$(window).on("touchstart", function(event) {
				var target = event.target || window.target;

				var bindElement = null;
				if (target.tagName == "A" || target.tagName == "INPUT" || $(target).hasClass(tapClass)) {
					bindElement = $(target);
				} else if ($(target).parents("a").length > 0) {
					bindElement = $(target).parents("a");
				} else if ($(target).parents("." + tapClass).length > 0) {
					bindElement = $(target).parents("." + tapClass);
				}

				if (bindElement != null) {
					Hover().touchstartHoverElement(bindElement);
				}
			});
		}
		,touchstartHoverElement : function (bindElement) {
			bindElement.addClass(hoverClass);
			bindElement.off("touchmove", Hover().touchmoveHoverElement);
			bindElement.on("touchmove", Hover().touchmoveHoverElement);

			bindElement.off("touchend", Hover().touchendHoverElement);
			bindElement.on("touchend", Hover().touchendHoverElement);
		}
		,touchmoveHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
		,touchendHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
	}
	Hover.fn.init.prototype = Hover.fn;

	Hover().on("hover", "tap");
})();
