$(function(){
	var contentHeight=$(window).height()-120;
	$(".col-left").height(contentHeight);	
//	$(".col-right").height($(window).height()-65);
	$(".col-right").attr("style","max-height:"+($(window).height()-65)+"px")
	$(".phone").height($(window).height()-160)
	$(".grid").width($(".grid img").width())

	$(document).on("click","#grid",function(){
		console.log("1111")
		$(".phone").toggleClass("grid");
	})
	
	$(document).on("click",".close",function(){
		$(this).parent().hide()
		$('.md-dialog-backdrop').remove();
		$('.md-scroll-mask').remove();
		$('.md-scroll-mask-bar').remove();
		$('.md-dialog-container').remove();
	})
	
	$(document).on("click","#text",function(){
		$(".col-right").hide();
		$("#text-properties").show();
		$(".popbox").hide();
		$("#imgpop").hide();	
	})
	
	$(document).on("click","#img",function(){
		$(".col-right").hide();
		$("#img-properties").show();
		$(".popbox").hide();
		$("#imgpop").show()		
	})
	
	$(document).on("click","#graph",function(){
		$(".col-right").hide();
		$("#graph-properties").show();
		$(".popbox").hide();
		$("#graphpop").show();
		$("#imgpop").hide();
	})
	
	$(document).on("click","#form",function(){
		$(".col-right").hide();
		$("#form-properties").show();
		$(".popbox").hide();
		$("#formpop").show();
		$("#imgpop").hide();
	})
	
	$(document).on("click",".inputicon",function(){
		$(".col-right").hide();
		$("#form-text-proterties").show();
	})
	
	$(document).on("click",".textareaicon",function(){
		$(".col-right").hide();
		$("#form-textarea-properties").show();
	})
	
	$(document).on("click",".checkboxicon",function(){
		$(".col-right").hide();
		$("#form-checkbox-properties").show();
	})
	
	$(document).on("click",".radioicon",function(){
		$(".col-right").hide();
		$("#form-radiobox-properties").show();
	})
	
	$(document).on("click",".buttonicon",function(){
		$(".col-right").hide();
		$("#form-button-properties").show();
	})
	

	
	$(document).on("click",".pickup",function(){
		$(this).parent().hide();
	})
	

	
	
})

$(window).resize(function(){
	var contentHeight=$(window).height()-120;
	$(".col-left").height(contentHeight);
	$(".col-right").attr("style","max-height:"+($(window).height()-65)+"px")
	$(".phone").height($(window).height()-160)
	$(".grid").width($(".grid img").width())
})

