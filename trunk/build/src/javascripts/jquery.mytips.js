(function(A){A.fn.mytips=function(B){var D={tip_div:"",text:"default tips"};var C=A.extend({},D,B);return this.each(function(){$this=A(this);var F=A.meta?A.extend({},C,$this.data()):C;var E=false;$this.hover(function(){if(!E){F.tip_div.html(F.text);F.tip_div.fadeIn();E=true}},function(){F.tip_div.fadeOut();F.tip_div.html("");E=false})})}})(jQuery);