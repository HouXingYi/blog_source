		$(document).ready(function() {
			$('#fullpage').fullpage({
				'navigation': true,
				'navigationPosition': 'right',
				'anchors':['page1','page2','page3','page4','page5'],
				'afterLoad':function(anchorLink,index){
					if (index==1) {
						$('.headBg').animate({opacity: '0.5'}, 3000);
						$('.home_pic').css('margin-top', '70px');
						$('#info1').delay(2400).fadeIn(1000, function () {
							$('#bar').animate({width: '800px'}, 2000, function () {
								$(this).next().fadeIn(1000, function () {
									$(this).next().fadeIn(1000, function () {
										$(this).next().fadeIn(1000);
									});
								});
							});
						});
					}
					if(index==2){
						$('.about_title h1').slideDown(1000, function() {
							$('.about_bar').animate({width:'200px'}, 1000);
						});
					}
					if(index==3){
						$('.skill_title h1').slideDown(1000, function() {
							$('.skill_bar').animate({width:'200px'}, 1000,function(){
								$('.skill_title h2').fadeIn();
							});
						});
						$('.list1').animate({width:'90%'},2000);
						$('.list2').animate({width:'70%'},2000);
						$('.list3').animate({width:'60%'},2000);
						$('.list4').animate({width:'50%'},2000);
						$('.list5').animate({width:'50%'},2000);
						$('.list6').animate({width:'50%'},2000);
					}
					if(index==4){
						$('.demo_title h1').slideDown(1000, function() {
							$('.demo_bar').animate({width:'200px'}, 1000);
						});
					}
				}
			});
		});