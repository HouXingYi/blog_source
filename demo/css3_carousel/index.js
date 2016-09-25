

$(function(){
	
	var deg = 0;
	
	$(".container img").each(function(i){
		$(this).css("transform","rotateY(" + i*40 + "deg) translateZ(300px)");
		$(this).css("background","url(images/b" + (i+1) + ".jpg)");
	});
	$(".container img").on("click",function(){
		deg += 40;
		$(".container").css("transform","rotateY(" +deg+ "deg)");
	});
	
});
