var saaa = 
{
	main_win: null,
	notify_win: null,
	//initialize the main ui
	init_main_win: function()
	{
		saaa.main_win = new air_win(null, "main", $("#layout"));
		win = saaa.main_win;
		win.stateless = false;
		win.buttons.close = $("#close-btn");
		//win.buttons.maximize = $("#max-btn");			
		//win.buttons.minimize = $("#min-btn");;
		//win.buttons.restore = $("#restore-btn");;
		win.buttons.always_on_top = $("#always-top-btn");;
		win.buttons.disable_always_on_top = $("#disable-always-top-btn");;
		//win.buttons.resize = $("#resize-btn");;
		win.buttons.change_theme = $(".change-theme-btn");;
		win.buttons.move = $(".movable");

		
		//install tray service
		var tray_setting = new air_win_tray(null, {icon_16: "icons/icon16.png", icon_128:"icons/icon128.png"});
		tray_setting.add_menu_item("Active",  function(event){
			if(nativeWindow.displayState == air.NativeWindowDisplayState.MINIMIZED){
				win.on_restore();
			}			
			win.win_handle.visible = true;
			win.win_handle.activate();				
			win.win_handle.orderToFront();			
		});
		tray_setting.add_menu_item("Exit",  function(aw, event){
			saaa.main_win.exit();			
		});			
		
		win.install_tray(tray_setting);
		win.buttons.tray = $("#tray-btn");

		win.add_event_listener("close",  function(){air.trace("exit, bye.");			saaa.main_win.exit();});
		$("#header a").mousedown(function(){return false;});
		win.init();		
		win.show();
		
	},
	
	version_check_url: "http://dorame.zduo.net/lastest/versioning.xml",
	filename: "saaa.air", // nn.air
	//update
	update: function()
	{
		var updater = new saaa_updater(saaa.version_check_url, saaa.filename);
		updater.error_handle = function(e, msg)
		{
			$("#update").html('error occured when ' + msg + '(' + e +').<br/><br/>' 
							+ '<b><a href="#" id="update-link-error">continue</a></b>'
				);	
				$("#update").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
							$("#update-link-error").click(function(){init();return false;});
				}});	
		}
		updater.update_ok_handle = function(){$("#status-icon").hide();$("#update").html("update successful");};
    	updater.update_complete_hanlde = function(){air.trace("update complete");};
		updater.update_process_handle = function(percent){ 
			$("#update-percent").text(percent);	
		};
		updater.need_update_or_not_handle = function(needUpdate)
		{
			$("#status-icon").hide();			
			if (needUpdate) {
				$("#update").html('A newer version has been found.<br/><br/>version:' 
								+ updater.lastest_version_info.version 
								+ '<br/>release notes:' + updater.lastest_version_info.releasenotes 
								+ '<br/><br/><b><a href="#" id="update-link-confirm">click herer to update your dorame to lastest version</a></b> <br/><br/>or <a id="update-link-ignore" href="">here</a> to continue current version');
				$("#update").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
						$("#update-link-confirm").click(function(){
								$("#update").html("updating progress:<span id='update-percent'>0</span>%"	);
								$("#update").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
															$("#status-icon").fadeIn();
															updater.update();
														}});								
							}
						);
						$("#update-link-ignore").click(function(){init();return false;});
						
				}});			
				
				//updater.update();
			}else
			{
				$("#update").html('There are no newer version avaliable.');	
				$("#update").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
						$("#update").fadeOut("slow", function(){
						init();
						});
				}});	
				
			}
		}
		$("#update").html('Checking for newer version...');
		$("#status-icon").fadeIn();		
		$("#update").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
				updater.check();			
		}});

	},
	
	init_notify_win: function(parent_win)
	{

		saaa.notify_win = new air_win(parent_win, "notify", $("#layout"));
		win = saaa.notify_win;
		win.buttons.close = $("#close-btn");
		win.init();	
		win.show(function(layout){
// layout.show("drop", { direction: "down" }, 1000);
// layout.show("slide", { direction: "down" }, 1000);
//layout.myslide( {'container': $("body"), queue:false, direction: 'top', 'easing': "linear", 'duration': '200'});//,  'callback': function(){ $(this).effect("bounce", {  times: 3,direction: 'right' }, 300 ) } });						
layout.slideDown(function(){$(this).fadeIn('slow');});

		});		
		
	},	
};

var sandbox_loaded = false;

function init()
{	
		$("#menu li").hide();		
		hide_all_contents();			

		$(".toolbar li a").each(function(){
				$(this).mytips({tip_div: $("#btn-tooltip"), text: $(this).attr("title")});
		});	
		$("#menu-item-about").click(function(){
					load_content($("#about"), function(){			
					$("#menu-item-back-player").show();
					$("#menu-item-about").hide();
					$("#about .title").text(saaa.main_win.application_name + " " + saaa.main_win.application_version);
				});
		});
		$("#menu-item-back-player").click(function(){
				load_sandbox( "http://www.pandora.com/?cmd=mini");	
		});

		//var dm_sandbox_left = 47;
		//var dm_sandbox_top = 93;
		//var dm_win_width = 736 ;
		//var dm_win_height = 404 ;				
		var is_moving = false;
		/*$("#menu-item-ui-mode-clean").click(function(){
				$("#mysandbox iframe").css("left", "0px");
				$("#mysandbox iframe").css("left", "0px");					
				$("#mysandbox iframe").animate({"left": "-="  + dm_sandbox_left + "px", "top": "-=" + dm_sandbox_top + "px"}, "slow",function(){
					$("#menu").show();							
					$("#menu-item-ui-mode-normal").fadeIn();					
				});										
				saaa.main_win.win_handle.width =  dm_win_width - 89;
				saaa.main_win.win_handle.height =  dm_win_height - 120;
				$(this).hide();
				$("#menu").hide();					

		});
		$("#menu-item-ui-mode-normal").click(function(){				
				$("#mysandbox iframe").animate({"left": "+="  + dm_sandbox_left + "px", "top": "+=" + dm_sandbox_top + "px"}, "slow", function(){
					$("#menu").show();
					$("#menu-item-ui-mode-clean").fadeIn();					
				});					
				saaa.main_win.win_handle.width =  dm_win_width;
				saaa.main_win.win_handle.height =  dm_win_height ;
				$(this).hide();
				$("#menu").hide();
				

		});*/
		
		load_sandbox( "https://www.pandora.com/radio/tuner_9_2_0_0_pandora_mini.swf");	
		//load_sandbox( "http://localhost/src/pandora1.html");	
}
function show_sandbox(container, url)
{
	$("#mysandbox").myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '500',  'callback': function(){
			$("#status-icon").hide();
			//if(!sandbox_loaded)	$("#menu-item-ui-mode-clean").show();
			$("#menu-item-about").show();
			$("#menu-item-back-player").hide();
			sandbox_loaded = true;
			$("#menu").fadeIn();	
			
		;} 
	});					
}		
function load_sandbox(url)
{
	hide_all_contents();		
	$("#menu").hide();			
	$("#status-icon").fadeIn();
	if (!sandbox_loaded)
	{
		var html = 	'<iframe  style="margin-top:0px;" sandboxRoot="http://localhost/" documentRoot="app:/"></iframe>';	
		$("#mysandbox").html(html);
		
		$("#mysandbox iframe").attr("src", url);
		$("#mysandbox iframe").one("load", function(){
				show_sandbox();	
		});
	}
	else
	{
		show_sandbox();				
	}
}
function load_content(content, callback)
{
	hide_all_contents();
	$("#menu").hide();
	$("#status-icon").fadeIn();			
	content.myslide( {'container': $("#content"), queue:false, direction: 'left', 'easing': "linear", 'duration': '1000',  'callback': function(){
			if(callback) callback();
			$("#status-icon").hide();					
			$("#menu").fadeIn();
		} 
	});			
}

function hide_all_contents()
{
	$("#content .content").css("top", "-9999px");
	$("#content .content").css("left", "-9999px");			
}
