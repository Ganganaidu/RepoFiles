
        var t;     
         function CallLivePrice() {
             
            clearTimeout(t);
            var sUrl = "http://www.thisisswitch.com:8084/icatservice/service.svc/GetMainCategory/4";
			$('#loadingmessage').show();
			$.ajax({
            	type: "GET",            
                url: sUrl,
                data: { get_param: 'value' },
                success: OnSuccess,
                error: OnError
            });
         }
         function OnSuccess(data, status) {
             
              $('#scroller').html('');
              $('#scroller').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller').find('ul');
              
              $.each(data.Get_ICatelog_Main_CategoryResult, function (key, val) {
            
              //listItems.append('<li data-icon="false" ><a onclick="Get_sub_cat(\''+val.Cat_Name+'\','+val.MainCat_Id+','+val.User_Id+')" href="#page20" id="Cat_name'+key+'">'+val.Cat_Name+'</a></li>');
             listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_sub_cat(\''+val.Cat_Name+'\','+val.MainCat_Id+','+val.User_Id+')"><a href="#page20" ></a>'+val.Cat_Name+'<a href="#page20"></a></li>');
//listItems.append('<li data-icon="false" data-inset="true"  onclick="Get_sub_cat(\''+val.Cat_Name+'\','+val.MainCat_Id+','+val.User_Id+')"><a href="#page20" style="" ></a><p style="margin-top:20px;height:50%;><lable style="float:left;width:70%; white-space: pre-wrap;font-size:14px;margin: 0px;">'+val.Cat_Name+'<lable><a style="data-icon:none;background:none;border:none; float:right;width:25%;  white-space:wrap;margin: 0px;">&nbsp;</a></p></li>');		       
              });
             $('#scroller ul').listview();
             $('#loadingmessage').hide();
           // t = setTimeout("CallLivePrice()", 2000);         
         }
         function OnError(request, status, error) {
             alert("Connection failed to server");
             
             t = setTimeout("CallLivePrice()", 2000);              
         }

function Get_sub_cat(Cat_Name,MainCat_Id,User_Id)
{
    $('#loadingmessage_page20').show();
    $("#title_subcat").text(Cat_Name);
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetSubCategory/4";
    
 /*   $.ajax({
            	type: "GET",            
                url: url,
                data: { get_param: 'value' },
                success: OnSuccess_sub_cat,
                
            });*/
 
    $.getJSON(url,function(data,status)
    {
   /* function OnSuccess_sub_cat(data,status)
    {*/
    
       $('#scroller20').html('');
              $('#scroller20').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller20').find('ul');
              $.each(data.Get_ICatelog_Sub_CategoryResult, function (key, val) {
                  if(MainCat_Id == val.MainCat_Id && val.Price == "")
                  {
              listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')"><a href="#page21"></a>'+val.Sub_Cat_Name+'</p><a href="#page21"</a></li>');        
            //listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')"><a href="#page21"></a><p style="margin-top:20px;height:40%; font-size:12px;font-weight:bold;"><lable style=" float:left;width:80%;">'+val.Sub_Cat_Name+'</lable></p><a href="#page21" style="float:right;width:15%;"></a></li>');
            //listItems.append('<li data-icon="false"><a onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')" href="#page21" id="Cat_name'+key+'">'+val.Sub_Cat_Name+'</a></li>');
                  }
                  else if(MainCat_Id == val.MainCat_Id && val.Price != "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;height:60px;vertical-align:middle;" ><lable style="white-space:pre-wrap;float:left;width:70%;margin-top:10px;">'+val.Sub_Cat_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;margin-top:10px;">Rs. '+val.Price+'</lable></li>');
                    //listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" ><p style="margin-top:20px;height:50%; font-size:12px;font-weight:bold;"><lable style="white-space:pre-wrap;float:left;width:70%;">'+val.Sub_Cat_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;">Rs. '+val.Price+'</lable></p></li>');  
                  }
		     });
             $('#scroller20 ul').listview();
       $('#loadingmessage_page20').hide();
       // window.location.href="#page20";
        //$.mobile.changePage($('#page20'), {transition: 'pop'});
      
    /*});*/
            
    });
}
function Get_item_cat(Cat_Name,Sub_Cat_Name,MainCat_Id,Sub_Cat_Id,User_Id)
{
     $('#loadingmessage_page21').show();
    $("#title_Item_Name").text(Sub_Cat_Name);
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetItemCategory/4";
    $.getJSON(url,function(data,status)
    {
       $('#scroller21').html('');
              $('#scroller21').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller21').find('ul');
              $.each(data.Get_ICatelog_Item_CategoryResult, function (key, val) {
                  if(MainCat_Id == val.Main_Cat_Id && Sub_Cat_Id == val.Sub_Cat_Id && val.Item_Price == "")
                  {
               listItems.append('<li data-icon="false" data-inset="true" onclick="Get_item4_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.User_Id+')" style="font-size:16px;line-height:60px;vertical-align:middle;"><a href="#page22"></a>'+val.Item_Name+'</p><a href="#page22"</a></li>');       
              //listItems.append('<li data-icon="false" data-inset="true" onclick="Get_item4_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.User_Id+')"><a href="#page22"></a><p style="margin-top:20px;height:40%; font-size:12px;font-weight:bold;"><lable style=" float:left;width:80%;">'+val.Item_Name+'</lable></p><a href="#page22" style="float:right;width:15%;"></a></li>');
              //listItems.append('<li data-icon="false"><a onclick="Get_item4_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.User_Id+')" href="#page22" id="Cat_name'+key+'">'+val.Item_Name+'</a></li>');
                  }
                  else if(MainCat_Id == val.Main_Cat_Id && Sub_Cat_Id ==val.Sub_Cat_Id && val.Item_Price != "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;height:60px;vertical-align:middle;" ><lable style="white-space:pre-wrap;float:left;width:70%;margin-top:10px;">'+val.Item_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;margin-top:10px;">Rs. '+val.Item_Price+'</lable></li>');
                      //listItems.append('<li data-icon="false" data-inset="true" ><p style="margin-top:20px;height:50%; font-size:12px;font-weight:bold;"><lable style="white-space:pre-wrap; float:left;width:70%;">'+val.Item_Name+'</lable><lable style="float:right;white-space:pre-wrap; width:25%;">Rs. '+val.Item_Price+'</lable></p></li>');
                   // listItems.append('<li data-icon="false" data-inset="true" style="vertical-align : middle;"><lable style=" float:left;width:75%;vertical-align : middle;">'+val.Item_Name+'</lable><lable style="float:right; width:25%;vertical-align : middle;"> '+val.Item_Price+'</lable></li>');  
                  }
		        });
            $('#scroller21 ul').listview();
         $('#loadingmessage_page21').hide();
});


}
function Get_item4_cat(Item_Name,MainCat_Id,Sub_Cat_Id,Item_Id,User_Id)
{
     $('#loadingmessage_page22').show();
    $("#title_Item4_Name").text(Item_Name);
    
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetItemCategorylevel4/4";
    $.getJSON(url,function(data,status)
    {
       $('#scroller22').html('');
              $('#scroller22').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller22').find('ul');
              $.each(data.Get_ICatelog_Item_Level4Result, function (key, val) {
                  if(MainCat_Id == val.Main_Cat_Id && Sub_Cat_Id == val.Sub_Cat_Id && Item_Id == val.Item_Id && val.Item_Price == "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_item5_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.SubItem_Id4+','+val.User_Id+')"><a href="#page23"></a>'+val.Item_Name+'</p><a href="#page23"</a></li>');
                     //listItems.append('<li data-icon="false" data-inset="true" onclick="Get_item5_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.SubItem_Id4+','+val.User_Id+')"><a href="#page23"></a><p style="margin-top:20px;height:40%; font-size:12px;font-weight:bold;"><lable style=" float:left;width:80%;">'+val.Item_Name+'</lable></p><a href="#page23" style="float:right;width:15%;"></a></li>');  
                    //listItems.append('<li data-icon="false"><a onclick="Get_item5_cat(\''+val.Item_Name+'\','+val.Main_Cat_Id+','+val.Sub_Cat_Id+','+val.Item_Id+','+val.SubItem_Id4+','+val.User_Id+')" href="#page23" id="Cat_name'+key+'">'+val.Item_Name+'</a></li>');
                  }
                  else if(MainCat_Id == val.Main_Cat_Id && Sub_Cat_Id ==val.Sub_Cat_Id && Item_Id == val.Item_Id && val.Item_Price != "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;height:60px;vertical-align:middle;" ><lable style="white-space:pre-wrap;float:left;width:70%;margin-top:10px;">'+val.Item_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;margin-top:10px;">Rs. '+val.Item_Price+'</lable></li>');
                      //listItems.append('<li data-icon="false" data-inset="true" ><p style="margin-top:20px;height:50%; font-size:12px;font-weight:bold;"><lable style="white-space:pre-wrap;float:left;width:70%;">'+val.Item_Name+'</lable><lable style="white-space:pre-wrap;float:right; width:25%;">Rs. '+val.Item_Price+'</lable></p></li>');
                    //listItems.append('<li data-icon="false" data-inset="true" style="vertical-align : middle;"><lable style=" float:left;width:75%;vertical-align : middle;">'+val.Item_Name+'</lable><lable style="float:right; width:25%;vertical-align : middle;"> '+val.Item_Price+'</lable></li>');  
                  }
		        });
           $('#scroller22 ul').listview();
         $('#loadingmessage_page22').hide();
});
 
}

function Get_item5_cat(Item_Name,Main_Cat_Id,Sub_Cat_Id,Item_Id,SubItem_Id4,User_Id)
{
     $('#loadingmessage_page23').show();
    $("#title_Item5_Name").text(Item_Name);
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetItemCategorylevel5/4";
    $.getJSON(url,function(data,status)
    {
       $('#scroller23').html('');
              $('#scroller23').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller23').find('ul');
              $.each(data.Get_ICatelog_Item_Level5Result, function (key, val) {
                  if(Main_Cat_Id == val.Main_Cat_Id && Sub_Cat_Id == val.Sub_Cat_Id && Item_Id == val.Item_Id && SubItem_Id4 == val.SubItem_Id4 && val.Item_Price == "")
                  {
                        
                    listItems.append('<li data-icon="false"><a href="#page24" id="Cat_name'+key+'">'+val.Item_Name+'</a></li>');
                  }
                  else if(Main_Cat_Id == val.Main_Cat_Id && Sub_Cat_Id ==val.Sub_Cat_Id && Item_Id == val.Item_Id && SubItem_Id4 == val.SubItem_Id4 && val.Item_Price != "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;height:60px;vertical-align:middle;" ><lable style="white-space:pre-wrap;float:left;width:70%;margin-top:10px;">'+val.Item_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;margin-top:10px;">Rs. '+val.Item_Price+'</lable></li>');
                      //listItems.append('<li data-icon="false" data-inset="true" ><p style="margin-top:20px;height:50%; font-size:12px;font-weight:bold;"><lable style="white-space:pre-wrap; float:left;width:70%;">'+val.Item_Name+'</lable><lable style="float:right; width:30%;">Rs. '+val.Item_Price+'</lable></p></li>');
                    //listItems.append('<li data-icon="false" data-inset="true"><lable style=" float:left;width:75%;vertical-align : middle;">'+val.Item_Name+'</lable><lable style="float:right; width:25%;vertical-align : middle;"> '+val.Item_Price+'</lable></li>');  
                  }
		        });
           $('#scroller23 ul').listview();
         $('#loadingmessage_page23').hide();
}); 
}
       
        function map(lat,lng,address)
        {
			var latlng = new google.maps.LatLng(lat,lng);
			var myOptions = {
				zoom: 18,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
			google.maps.event.trigger(map,'resize');
            marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:address
   
            });
            
            
        }
function calllocate()
{
    var lat="17.450647";
    var lng="78.382092";
    var address="";
     var sUrl = "http://www.thisisswitch.com:8084/icatservice/service.svc/GetStoreLocator/4";
			
			$.ajax({
            	type: "GET",            
                url: sUrl,
                data: { get_param: 'value' }, 
    
                success: OnSuccess_map,
                error: OnError
            });
    function OnSuccess_map(data, status) {
              $.each(data.Get_ICatelog_StoreLocator_CategoryResult, function (key, val) {
                  if(val.Store_Id == 11)
                  {
                      var lat_lng=val.Lang_Lat.split(',');
                      lat=lat_lng[0];
                      lng=lat_lng[1];
                      address=val.Store_Address;
                      map(lat,lng,address);
                 
                  }
                  });
        }
 
}

function initialize() {
     CallLivePrice();
    $('select').selectmenu({ nativeMenu: true });
    $('select').selectmenu({ corners: false });

        /*  var imgsrc = ["images/iPhone/drama_iphone_design2_mainframe1@2x.png", "images/iPhone/drama_iphone_design2_mainframe2@2x.png", "images/iPhone/drama_iphone_design2_mainframe3@2x.png"];
             var imgnum = 0;

                function start() {
                    $('#logo').delay(1000).fadeOut(1000, function() {
                        imgnum++;
                        if(imgnum>2) {imgnum=0;}
                        $(this).attr("src",imgsrc[imgnum]);
                    }).delay(1000).fadeIn(1000, start);
                }
                start();*/
   
           
}


function sendfeedback()
{
    
    if($("#text_name").val().length>0 && $("#text_phone").val().length>0 && $("#text_email").val().length>0 && $("#text_sugg").val().length>0 )
    {
        if(validateEmail()){
           $("#loadingmessage_feed").show();
            var Url = "http://www.thisisswitch.com:8084/icatservice/service.svc/NewFeedback?Cust_Name="+$("#text_name").val()+"&Cust_Mobile="+$("#text_phone").val()+"&Cust_Email="+$("#text_email").val()+"&Comment="+$("#text_sugg").val()+"&Services="+$("#selectmenu_service").val()+"&Ambience="+$("#selectmenu_ambience").val()+"&StylistAndBeautyTherapist="+$("#selectmenu_style").val()+"&User_id=4";
			$('#loadingmessage').show();
			$.getJSON(Url,function(data,status)
            {
                alert(data.INSERT_ICatelog_FeedbackResult);
            $("#loadingmessage_feed").hide();
            $("#text_name").val("");
            $("#text_phone").val("");
            $("#text_email").val("");
            $("#text_sugg").text("");
            });
            
       }
        else
        {
           alert("Enter valid Email Id")
        }
        
    }
    else
    {
        alert("Enter the all details")
    }
    function validateEmail(){
            
            var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
            
            if(filter.test($("#text_email").val())){
                
                return true;
            }
            else{
                return false;
            }	
        }

}

function appointment_mail()
{
    if($("#text_name_app").val().length>0 && $("#text_phone_app").val().length>0 && $("#text_email_app").val().length>0 && $("#text_service").val().length>0 && $("#text_therapistname").val().length>0 && $("#date_app").val().length>0 && $("#time_app").val().length>0)
    {
        if(validateEmail()){
           $("#loadingmessage_appoint").show();
           
            var Url = "http://www.thisisswitch.com:8084/icatservice/service.svc/NewAppointment?User_id=4&App_Name="+$("#text_name_app").val()+"&App_PhNo="+$("#text_phone_app").val()+"&App_Emailid="+$("#text_email_app").val()+"&App_Time="+$("#time_app").val()+"&App_date="+$("#date_app").val()+"&App_Service="+$("#text_service").val()+"&App_Comment="+$("#text_therapistname").val()+"";
			$('#loadingmessage').show();
			$.getJSON(Url,function(data,status)
            {
                alert(data.Insert_NEWICatelogdb_AppointmentsResult);
            $("#loadingmessage_appoint").hide();
            $("#text_name").val("");
            $("#text_phone").val("");
            $("#text_email").val("");
            $("#text_sugg").text("");
            });
            
       }
        else
        {
           alert("Enter valid Email Id")
        }
        
    }
    else
    {
        alert("Enter the all details")
    }
    function validateEmail(){
            
            var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
            
            if(filter.test($("#text_email_app").val())){
                
                return true;
            }
            else{
                return false;
            }	
        }
}

function offers()
{ 
     $("#loadingmessage_offer").show();
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetOffer/4/android";
    $.getJSON(url,function(data,status)
    {
        $('#scroller_offer').html('');
        $('#scroller_offer').append('<ul data-role="listview" data-scroll="true"></ul>');
        listItems = $('#scroller_offer').find('ul');
       $.each(data.Get_ICatelog_OfferResult, function (key, val) {
       listItems.append('<li data-icon="false" style="font-size:12px;width:100%;height:100%;" onclick="show_offers(\''+val.Heading+'\',\''+val.Valid_From+'\',\''+val.Valid_To+'\',\''+val.Description+'\',\''+val.Image+'\');" ><a href="#page24" style="white-space: pre-wrap;"  ><img width="80" height="80" style="margin-left: 5px" alt="" src="'+val.Image+'" align="left"/><lable style="width:100%;height:100%;">'+val.Heading+'</lable> <br><span style="font-size:12px;">Time:'+val.Time+'</span><br><sapn style="font-size:10px;width:100%;height:100%;">'+val.Description+'</sapn></a></li>');
           
       }); 
        $('#scroller_offer ul').listview();
         $("#loadingmessage_offer").hide();
    });
}
function show_offers(Heading,Valid_From,Valid_To,Description,Image)
{
    
    $("#off_name").text(Heading);
    $("#off_from").text(Valid_From);
    $("#off_to").text(Valid_To);
    $("#off_desc").text(Description);
    $("#off_image").attr('src',Image)
    
    
}



function events()
{
     $("#loadingmessage_event").show();
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetEvent/4/android";
    $.getJSON(url,function(data,status)
    {
        $('#scroller_event').html('');
        $('#scroller_event').append('<ul data-role="listview" data-scroll="true"></ul>');
        listItems = $('#scroller_event').find('ul');
        if(data.Get_ICatelog_EventResult == "")
        {
          $("#No_Event").show();  
        }
       $.each(data.Get_ICatelog_EventResult, function (key, val) {
       //listItems.append('<li data-icon="false" style="font-size:12px;width:100%;height:100%;" onclick="show_offers(\''+val.Heading+'\',\''+val.Valid_From+'\',\''+val.Valid_To+'\',\''+val.Description+'\',\''+val.Image+'\');" ><a href="#page24" style="white-space: pre-wrap;"  ><img width="80" height="80" style="margin-left: 5px" alt="" src="'+val.Image+'" align="left"/><lable style="width:100%;height:100%;">'+val.Heading+'</lable> <br><span style="font-size:12px;">Time:'+val.Time+'</span><br><sapn style="font-size:10px;width:100%;height:100%;">'+val.Description+'</sapn></a></li>');
           $("#No_Event").hide(); 
       }); 
        $('#scroller_event ul').listview();
         $("#loadingmessage_event").hide();
    });
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    }
    function onConfirm(buttonIndex) {
       if(buttonIndex=='2')
        {
          navigator.app.exitApp(); 
           
        }
        else
        {
            
        }
    }

function onBackKeyDown() {
    
      navigator.notification.confirm(
            'Do you really want to exit?',  
            onConfirm,              
            'Drama',            
            'No,Yes'          
        );
    }
function onMenuKeyDown() {
    
}

function callstop()
{
   
    start().stop();
}







/////////////waste/////////

/*
function Get_sub_cat(Cat_Name,MainCat_Id,User_Id)
{
    $('#loadingmessage_page20').show();
    $("#title_subcat").text(Cat_Name);
    var url="http://www.thisisswitch.com:8084/icatservice/service.svc/GetSubCategory/4";
    
    $.ajax({
            	type: "GET",            
                url: url,
                data: { get_param: 'value' },
                success: OnSuccess_sub_cat,
                
            });
 
    function OnSuccess_sub_cat(data,status)
    {
    
       $('#scroller20').html('');
              $('#scroller20').append('<ul data-role="listview" data-scroll="true"></ul>');
              listItems = $('#scroller20').find('ul');
              $.each(data.Get_ICatelog_Sub_CategoryResult, function (key, val) {
                  if(MainCat_Id == val.MainCat_Id && val.Price == "")
                  {
              listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')"><a href="#page21"></a>'+val.Sub_Cat_Name+'</p><a href="#page21"</a></li>');        
            //listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')"><a href="#page21"></a><p style="margin-top:20px;height:40%; font-size:12px;font-weight:bold;"><lable style=" float:left;width:80%;">'+val.Sub_Cat_Name+'</lable></p><a href="#page21" style="float:right;width:15%;"></a></li>');
            //listItems.append('<li data-icon="false"><a onclick="Get_item_cat(\''+val.Cat_Name+'\',\''+val.Sub_Cat_Name+'\','+val.MainCat_Id+','+val.Sub_Cat_Id+','+val.User_Id+')" href="#page21" id="Cat_name'+key+'">'+val.Sub_Cat_Name+'</a></li>');
                  }
                  else if(MainCat_Id == val.MainCat_Id && val.Price != "")
                  {
                      listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;height:60px;vertical-align:middle;" ><lable style="white-space:pre-wrap;float:left;width:70%;margin-top:10px;">'+val.Sub_Cat_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;margin-top:10px;">Rs. '+val.Price+'</lable></li>');
                    //listItems.append('<li data-icon="false" data-inset="true" style="font-size:16px;line-height:60px;vertical-align:middle;" ><p style="margin-top:20px;height:50%; font-size:12px;font-weight:bold;"><lable style="white-space:pre-wrap;float:left;width:70%;">'+val.Sub_Cat_Name+'</lable><lable style="float:right; white-space:pre-wrap; width:25%;">Rs. '+val.Price+'</lable></p></li>');  
                  }
		     });
            // $('#scroller20 ul').listview();
       $('#loadingmessage_page20').hide();
      
            
    }
}

*/








//NewFeedback?Cust_Name={Cust_Name}&Cust_Mobile={Cust_Mobile}&Cust_Email={Cust_Email}&Comment={Comment}&Services={Services}&Ambience={Ambience}&StylistAndBeautyTherapist={StylistAndBeautyTherapist}&User_id={User_id}")
        
  /*      function loaded() {
    var headerHeight = $('#header').outerHeight(true),
        padding = 15*2; //ui-content padding
    
   $('#scroll_menu, #scroller').height( $(window).innerHeight() - headerHeight - padding );
   
    var iScroller = new iScroll('scroller');
}

/*var myScroll;
function loaded() {
	myScroll = new iScroll('scroll_menu', { onBeforeScrollStart: null });
    myScroll = new iScroll('scroll_subcat1', { onBeforeScrollStart: null });
    
    setTimeout(function () {
       myScroll.refresh();
   }, 100);


}

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
*/

