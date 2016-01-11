// var id2html = {};
// var urladdress = "http://9.115.24.168:3000";
// $(document).ready(function (){ 
// 	$('#sticky_nav').fixedDiv('fix-div2');
// $(function() {
//             getModuleInfo();
//         });
// })

// function getModuleInfo() {
// 	$.ajax({
// 		type: "GET",
// 		dataType: "json",
// 		url: urladdress + "/findProjectByUser",
		
// 		success: function(json) {
// 		var tbBody = "";
// 		tbBody += "<ul class='modpic'>";
// 			$.each(json, function(i, n) {
				
// 				tbBody += "<div class='col-sm-6 col-md-4 col-lg-3 modmore' id='" + n.id + "'>";
// 				tbBody += "<div class='thumbnail' style='height: 334px;'>"
// 				tbBody += "<img class='imgclass' src='" + n.cover + "' alt=''>";
// 				tbBody += "<span>";
// 				tbBody += "<p>" + n.projectname + "</p>";
// 				tbBody += "<p class='buts567' style='display:none;'>";
// 				tbBody += '<a href="#" class="but5" onClick="copyli(\''+ n.id +'\');"></a>';
// 				tbBody += '<a href="#" class="but6" onClick="deleteli(\''+ n.id +'\');"></a>';
// 				//tbBody += "<a href='javascript:;' class='but7'></a>";
// 				tbBody += "</p>";
// 				tbBody += "<p class='buts4'><a href='javascript:;' class='but4'></a></p>";
// 				tbBody += "<img class='qrclass' src='" + n.qrcode + "' alt=''>";
// 				tbBody += "<a href='" + urladdress + "/downloadQRCode?url=" + n.qrcode + "' style='color:#3815EC'>Download QR</a>";
// 				tbBody += "<p>";	
// 				tbBody += '<a href="#" class="but1" onClick="overlay_click(\''+ n.id +'\');"></a>';
// 				tbBody += "<a href='javascript:;' class='but2'></a>";
// 				tbBody += "<a href='javascript:;' class='but3'></a>";
// 				tbBody += "</p>";
// 				tbBody += "</span>";
// 				tbBody += "</div>";
// 				tbBody += "</div>";
// 			});
// 		tbBody += "</ul>";
// 		$(".modlist").append(tbBody);
		
// 		$.each(json, function(j, m) {
// 			var tbBody2 = '<div id="' + m.id + '">';
// 			tbBody2 += '<div style="width:100%"><p>';
// 			tbBody2 += '<span style="float: left;">' + m.projectname + '</span>';
// 			tbBody2 += '<span style="float: right;"><strong>Created at</strong> ' + m.createtime + ',  <strong>Last modified at</strong> ' + m.lastmodify + '</span>';
// 			tbBody2 += '</p><br /><hr /><br />';
// 			tbBody2 += '<div style="width:50%;float: left;position: relative;"><img style="width: 294.603px; height: 464px;" class="imgclass" src="' + m.cover + '" alt="">';
// 			tbBody2 += '<div class="ProjectPreview-container-preview-btnarea"><button class="ProjectPreview-container-preview-btn"><i class="caret-up"></i></button><button class="ProjectPreview-container-preview-btn"><i class="caret-down"></i></button></div>';
// 			tbBody2 += '</div>';
// 			tbBody2 += '<div style="width:50%;float: left;">';
// 			tbBody2 += '<form class="ibm-column-form" method="post" action="__REPLACE_ME__">';
// 			tbBody2 += '<p>Scan dimensional barcode to preview and share to friends</p>';
// 			tbBody2 += '<p><img class="qrclass" src="' + m.qrcode + '" alt=""></p>';
// 			tbBody2 += '<p>You can copy the following link to send to a friend</p>';
// 			tbBody2 += '<p><span style="margin-left: 0;">';
// 			tbBody2 += '<input type="text" value="' + m.qrcode + '" size="40" name="QR_link" />';
// 			tbBody2 += '<button type="button" class="ibm-btn-pri ibm-btn-small ibm-btn-blue-50" style="float: right;height: 38px;padding-top: 6px;">Copy link</button>';
// 			tbBody2 += '</span></p></form></div></div></div>';
// 			id2html[m.id] = tbBody2;
// 		});
// 		//bind js hover event
// 		$(".modmore").hover(function(){
// 			$(this).find("span").stop().animate({top: '-55px'},200);
// 		},function(){
// 			$(this).find("span").stop().animate({top: '260px'},200);
// 			$(".buts4").show();
// 			$(".buts567").hide();
// 		})
	
// 		$(".buts4").on("click", function() {
// 			$(".buts4").hide();
// 			$(".buts567").show();
// 		});
		
// 		},
// 		error: function(json) {
// 			console.log("false to load");
// 		}
// 	});
// }
// //overlay onclick		
// function overlay_click(a) {	
// 	$("#overlayjson").html(id2html[a]);
// 	IBMCore.common.widget.overlay.show("overlayjson");
// };

// //copy overlay		
// function copyli(a) {
// 	var cpBody = '<div style="width:100%;text-align: center;">';
// 	cpBody += '<p style="font-size: 25px;">Copy Project</p><hr><p></p>';
// 	cpBody += '<p>New project name:</p>';
// 	cpBody += '<p style="padding:0;"><input type="text" value="" size="30" id="copy_proname" style="height: 2.25em;line-height: 2.25em;text-indent: 5px;" name="project name"></p>';
// 	cpBody += '<p style="height:20px"><span class="emptyred" style="color: #FF0000;display:none;">Please input a new project name!</span></p>';
// 	cpBody += '<p><input id="copycancel" class="ibm-btn-cancel-sec" style="margin: 0 10px 0 10px;" name="ibm-cancel" value="Cancel" type="submit">';
// 	cpBody += '<input id="copycontinue" class="ibm-btn-arrow-pri" style="margin: 0 10px 0 10px;" name="ibm-continue" value="Continue" type="submit"></p>';

// 	$("#copydeloverlay").html(cpBody);
// 	IBMCore.common.widget.overlay.show("copydeloverlay");
// 	copyoverlay_click(a);
// };
// //copy function
// function copyoverlay_click(id) {
	
// 	$("#copycontinue").click(function(){
// 	var pronameval = $("#copy_proname").val();
// 		if(pronameval!=""){
// 			$(".emptyred").hide();
// 			$.post(urladdress + "/copyProject?",
// 			{
// 				pid: id,
// 				projectname: pronameval,
// 			},
// 			function(data,status){
// 				IBMCore.common.widget.overlay.hide("copydeloverlay");
// 				alert("Project copy '" + status +"'!");
// 				$(".modlist").empty();
// 				getModuleInfo();
// 			});
// 		}
// 		else{
// 			$(".emptyred").show();
// 			return false;
// 		}
// 	});
// 	$("#copycancel").click(function(){  
// 			IBMCore.common.widget.overlay.hide("copydeloverlay");
// 	});
// }
// //delete overlay		
// function deleteli(a) {
// 	var delBody = '<div style="width:100%;text-align: center;">';
// 	delBody += '<p style="font-size: 25px;">Delete Project</p><hr><p></p>';
// 	delBody += '<p style="color: #C5C5C5;">The deletion can <strong>NOT</strong> be recovered, continue to delete?</p>';
// 	delBody += '<p><input id="delcontinue" class="ibm-btn-arrow-pri" style="margin: 0 10px 0 10px;" name="ibm-continue" value="Continue" type="submit">';
// 	delBody += '<input id="delcancel" class="ibm-btn-cancel-sec" style="margin: 0 10px 0 10px;" name="ibm-cancel" value="Cancel" type="submit"></p>';

// 	$("#copydeloverlay").html(delBody);
// 	IBMCore.common.widget.overlay.show("copydeloverlay");
// 	deleteoverlay_click(a);
// };
// //delete function
// function deleteoverlay_click(id) {
// 	$("#delcontinue").click(function(){
// 		IBMCore.common.widget.overlay.hide("copydeloverlay");
// 		$.post(urladdress + "/delProject?pid=" + id, function(data,status){
// 			  //$("#"+id).remove();
// 			  $(".modlist").empty();
// 				getModuleInfo();
// 		});
// 	});
// 	$("#delcancel").click(function(){  
// 		IBMCore.common.widget.overlay.hide("copydeloverlay");
// 	});
// }
	
// //JS animation for 2 static row/image
// $.fn.fixedDiv = function(actCls){
//         var pos = 0,
//             that = $(this),
//             topVal;

//         if(that.length > 0){
//             topVal = that.offset().top;
//         }

//         function fix(){
//             pos = $(document).scrollTop();

//             if (pos > topVal) {
//                 that.addClass(actCls);
				
//                 if (!window.XMLHttpRequest) {
//                     that.css({
//                         position: 'absolute',
//                         top     : pos
//                     });
//                 }
//             } else {
//                 that.removeClass(actCls);
//                 if (!window.XMLHttpRequest) {
//                     that.css({
//                         position: 'static',
//                         top     : 'auto',
//                     });
//                 }
				
//             }
//         }
//         fix();

//         $(window).scroll(fix);
// }

// //wheel function start
// var scrollFunc = function (e) {  
//         e = e || window.event;  
//         if (e.wheelDelta) {  //for IE and google               
//             if (e.wheelDelta > 0) { //wheel up
//                 if ($("#isfirst").val()==2){
// 				$('#ibm-leadspace-head').animate({height: 'toggle', opacity: 'toggle'}, "slow");
// 				$('#ibm-universal-nav').animate({height: 'toggle', opacity: 'toggle'}, "slow");
// 				$("#isfirst").val("0");
// 				}
//             }  
//             if (e.wheelDelta < 0) { //wheel down
// 			$('#sticky_nav').fixedDiv('fix-div2');
//             }  
//         } else if (e.detail) {  //for Firefox
//             if (e.detail> 0) { //wheel up  
//                 if ($("#isfirst").val()==2){
// 				$('#ibm-leadspace-head').animate({height: 'toggle', opacity: 'toggle'}, "slow");
// 				$('#ibm-universal-nav').animate({height: 'toggle', opacity: 'toggle'}, "slow");
// 				$("#isfirst").val("0");
// 				}
//             }  
//             if (e.detail< 0) { //wheel down
// 			$('#sticky_nav').fixedDiv('fix-div2');
//             }  
//         }  
//     }  
//     if (document.addEventListener) {//firefox  
//         document.addEventListener('DOMMouseScroll', scrollFunc, false);  
//     }  
//     //ie google  
//     window.onmousewheel = document.onmousewheel = scrollFunc;
// //wheel function end
	
