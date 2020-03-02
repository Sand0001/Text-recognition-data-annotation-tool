// var uploadUrl = 'http://127.0.0.1:80';
// var uploadUrl = 'http://39.104.88.168/other_ocr?';
//var uploadUrl = 'http://10.1.6.142:8001/file';
//文件选择完毕时
function FileChangeFn(event) {
    $('.opst_txt').text('重新选择文件');
    $('.send_btn').show();
    var event = event || window.event,
        dom = '',
        ofile = $("#oFile").get(0).files[0],
        otype = ofile.type || '获取失败',
        osize = ofile.size / 1054000,
        ourl = window.URL.createObjectURL(ofile); //文件临时地址
    $('#file_type').text("选择上传文件类型：" + otype);
    $('#file_size').text("选择上传文件大小，共" + osize.toFixed(2) + "MB。");

    console.log("文件类型：" + otype); //文件类型
    console.log("文件大小：" + osize); //文件大小
    console.log("文件临时地址：" + ourl); //文件临时地址

    if ('video/mp4' == otype || 'video/avi' == otype || 'video/x-msvideo' == otype) {
        dom = '<video id="video" width="100%" height="100%" controls="controls" autoplay="autoplay" src=' + ourl + '></video>';
    }
    if ('audio/mp3' == otype || 'audio/wav' == otype  || 'audio/x-m4a' == otype) {
        dom = '<audio id="audio" width="100%" height="100%" controls="controls" autoplay="autoplay" loop="loop" src=' + ourl + ' ></audio>';
    }
    if ('image/jpeg' == otype || 'image/png' == otype || 'image/gif' == otype) {
       // dom = '<img id="photo" width="100%" height="100%" alt="我是image图片文件" src=' + ourl + ' title="" />';
        dom = '<img id="photo" width="100%" alt="我是image图片文件" src=' + ourl + ' title="" />';
    }
    // dom = '<img id="pdf_viewer" width="100%" height="100%" alt="我是pdf图片文件" src=' + ourl + ' title="" />';
    if ('PDF/pdf' == otype || 'application/pdf' == otype) {
         dom = '<object id="show_pdf" type="application/pdf" width="100%" alt="我是pdf文件" data=' + ourl + 
         ' title="" ><p>抱歉，您的浏览器不支持PDF预览，请点击链接下载PDF文件<a href="file:///Users/zhao/Documents/ocr/test.pdf"></a>/p> </object>';
     }
    $('#file_box').html(dom);
    // $('#show_pdf').html(pdf);
};

//侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
function OnProgRess(event) {
    var event = event || window.event;
    //console.log(event);  //事件对象
    console.log("已经上传：" + event.loaded); //已经上传大小情况(已上传大小，上传完毕后就 等于 附件总大小)
    //console.log(event.total);  //附件总大小(固定不变)
    var loaded = Math.floor(100 * (event.loaded / event.total)); //已经上传的百分比  
    $("#speed").html(loaded + "%").css("width", loaded + "%");
};


var texthtml = '<p>e.&nbsp;Any&nbsp;event&nbsp;of&nbsp;ventricular&nbsp;arthythmia&nbsp;2&nbsp;Grade&nbsp;2&nbsp;in&nbsp;severity&nbsp;within&nbsp;6&nbsp;months&nbsp;before&nbsp;study&nbsp;drug</p><p>&nbsp;&nbsp;&nbsp;&nbsp;administration</p><p>f.&nbsp;Any&nbsp;history&nbsp;of&nbsp;cerebrovascular&nbsp;accident&nbsp;within&nbsp;6&nbsp;months&nbsp;before&nbsp;study&nbsp;drug&nbsp;administration</p><p></p><p></p><p>5.&nbsp;Significant&nbsp;Medícal&nbsp;History&nbsp;(may&nbsp;also&nbsp;attach&nbsp;list)</p><p></p><p>&nbsp;&nbsp;&nbsp;&nbsp;1)&nbsp;T-/NK-cell&nbsp;lymphoma&nbsp;history&nbsp;and&nbsp;prior&nbsp;therapy(s).&nbsp;Include&nbsp;radiotherapy&nbsp;and/or&nbsp;stem&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cell&nbsp;transplantation.</p><table border="2px" style="width:100%"><tr><th colspan="2"> T-INK-cell lymphoma<br/>history</th>     <th colspan="5">Prior therapy for T-/NK-cell lymphoma</colspan></tr><tr></tr><tr> <th>Diagnosis<br/>date (or <br/>relapsed/re<br/>relapsed/re<br/>fractory<br/>date)</th> <th>Stage</th> <th>Therapy/regimer</th> <th>Start date</th>   <th>Stop date</th>   <th>Best<br/>response</th> <th>Reason for <br/>discontinuation</th></tr><tr> <th>2017.8 </th>   <th>右鼻腔) <br/>结外<br/>NKIT细<br/>胞性淋巴<br/>瘤,鼻型</th><th>甲氨蝶呤3.0g d1+<br/>培门冬酶3750iu<br/>d2+地塞米松40mg<br/>d1-4化疗(6个疗<br/>程</th>  <th>2017.10.11</th>   <th>2018.3.28</th>   <th>PD</th> <th>PD</th> </tr><tr><th>2018.4.16 </th><th></th><th></th><th></th><th></th><th></th><th></th></tr></table><p>&nbsp;&nbsp;&nbsp;ii)&nbsp;Other&nbsp;active&nbsp;or&nbsp;past&nbsp;significant&nbsp;medical&nbsp;condition(s)&nbsp;and/or&nbsp;major&nbsp;surgical&nbsp;procedure(s)</p><p>&nbsp;&nbsp;&nbsp;including&nbsp;but&nbsp;not&nbsp;limited&nbsp;to&nbsp;the&nbsp;following:&nbsp;other&nbsp;non-T-/NK-&nbsp;cell&nbsp;malignancy,&nbsp;autoimmun</p><p>&nbsp;&nbsp;&nbsp;disease&nbsp;that&nbsp;may&nbsp;relapse,&nbsp;pulmonary&nbsp;disease,&nbsp;and/or&nbsp;cardiovascular&nbsp;disease</p><p>&nbsp;&nbsp;&nbsp;</p><table border="2px" style="width:100%"><tr><th> Significant medical condition(s) or<br/>major surgical procedure(s)</th><th> Start Date</th> <th>   End Date </th>    <th> Ongoing </th> </tr> <th>NA </th>                                   <th> NA</th>             <th> NA</th>            <th>NA</th> </tr></table>';

function startLoad() {
	$('#loading').show();
	$("#imgage1").html('image');
	$("#imgage2").html('image');
	// $("#imgage3").html('image');
    $("#text1").html("dip");
    $("#text2").html("baidu");
    // $("#text3").html("other");
}

function endLoad() {
	$('#loading').hide();
}


function composeTR(row_key, img_url, key, value) {
    // console.log(img_url);
    // return '<tr ><td><a href="javascript:void(0);" id=" '+ img_id+' " class="img_class" onclick="showimg(this)">' + img_url + '</a></td></tr>';
    // return '<tr ><td><form  method="post" action=""><a href="javascript:void(0);" class="img_class" value="'+img_url+'" onclick="showimg()">' + img_url + '</a></form></td></tr>';
    ourl = "/Users/zhao/Downloads/164/" + img_url;
    console.log(row_key)
    return '<form class="form" method="post" action=""><table  id="'+row_key+'"><tr><td><span>'+row_key
    +'</span></td><td><img class="photo" width="100%" alt="我是image图片文件" src='
    + ourl + ' title=""/></td><td><ul><li>'+key
    +'</li><li><input class="text" type="text" value='+key
    +'></li></ul></td><td><input type="button" value=保存 onclick="savetext('+row_key 
    +');"/></td></tr></table></form>';
}


// savetext
function savetext(id_tr) {  
var id_form = $(".form").get(id_tr);
    // alert(id_tr);
    // console.log(id_form);
    var img_url = $(".photo").get(id_tr);
    // console.log(img_url.src);
    var text_mod = $(".text").get(id_tr).value;
    // console.log($(".text").get(id_tr).value)
    formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    var json_response = {"imgurl":img_url,"text":text_mod};
    console.log(json_response);
    formData.append(json_response); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    // formData.append("text", text_mod);
    console.log(formData.JSON);
    $.ajax({
        //请求方式
        type:"post",
        //文件位置
        url: resUrl, // 后端服务器上传地址
        //返回数据格式为json,也可以是其他格式如
        dataType: "json",
        contentType: "application/json",
        data: formData,
        processData: false,  // 不处理数据
        contentType: false,   // 不设置内容类型
        cache: false, // 是否缓存
        async: true, // 是否异步执行
        processData: false, // 是否处理发送的数据  (必须false才会避开jQuery对 formdata 的默认处理)
        contentType: false, // 是否设置Content-Type请求头

        xhr: function() {
            startLoad();
            if (OnProgRess && xhr.upload) {
                xhr.upload.addEventListener("progress", OnProgRess, false);
                return xhr;
            }
        },
        //请求成功后要执行的函数，拼接html
        success: function(data){
            alert('上传成功');
            endLoad();
        },error: function(data) {
            alert('上传失败');
            endLoad();
            }
    });

}


function load(data) {
    
	if (data) {
        // $('#res_imgs').text("");
        html_patient = "";
        var res_imgs = data["url_img"];
        // console.log(res_imgs)
        for(i in res_imgs){
            // var key = OCR[i]['key']
            // var value = OCR[i]['value']
            // var txt = OCR[i]['txt']
            // var img_url = res_imgs[i].replace(/\s+/g,"");
            var img_url = res_imgs[i];
            html_patient += composeTR(i, img_url, "key", "value");
        }
        $('#all_page').html(html_patient); 
    }
}


//开始上传文件
function showAlljpg() {
    // $('.speed_box').show();
    // var oFile = $("#oFile").get(0).files[0], //input file标签
    // formData = new FormData(); //创建FormData对象
    // xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    // formData.append("file", oFile); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    
    $.ajax({
        //请求方式
        type:"post",
        //文件位置
        url: "res_url.txt", // 后端服务器上传地址
        //返回数据格式为json,也可以是其他格式如
        dataType: "json",

        //请求成功后要执行的函数，拼接html
        success: function(data){
            $("#speed").html("上传成功");
            alert(data);
            console.log(data)
            // data = JSON.parse(data);
            load(data);
            endLoad();
            //alert(returndata);  
            //开始逻辑处理了
        },error: function(data) {
            // endLoad();
            $("#speed").html("上传失败");
            console.log(data)
            alert('请正确配置后台服务！');
            // load(data);
            endLoad();
            }
    });
};



//文件选择完毕时
function FileChangeFn2(event) {
    $('.opst_txt2').text('重新选择文件');
    $('.send_btn2').show();
    var event = event || window.event,
        dom = '',
        ofile = $("#oFile2").get(0).files[0],
        otype = ofile.type || '获取失败',
        osize = ofile.size / 1054000,
        ourl = window.URL.createObjectURL(ofile); //文件临时地址
    $('#file_type2').text("选择上传文件类型：" + otype);
    $('#file_size2').text("选择上传文件大小，共" + osize.toFixed(2) + "MB。");

    console.log("文件类型：" + otype); //文件类型
    console.log("文件大小：" + osize); //文件大小

    if ('video/mp4' == otype || 'video/avi' == otype || 'video/x-msvideo' == otype) {
        dom = '<video id="video" width="100%" height="100%" controls="controls" autoplay="autoplay" src=' + ourl + '></video>';
    }
    if ('audio/mp3' == otype || 'audio/wav' == otype  || 'audio/x-m4a' == otype) {
        dom = '<audio id="audio" width="100%" height="100%" controls="controls" autoplay="autoplay" loop="loop" src=' + ourl + ' ></audio>';
    }
    if ('image/jpeg' == otype || 'image/png' == otype || 'image/gif' == otype) {
        dom = '<img id="photo" width="90%" height="90%" alt="我是image图片文件" src=' + ourl + ' title="" />';
    }
    if ('PDF/pdf' == otype || 'application/pdf' == otype) {
        // dom = '<img id="pdf_viewer" width="100%" height="100%" alt="我是pdf图片文件" src=' + ourl + ' title="" />';
         dom = '<object id="show_pdf" width="100%" height="100%"  type="application/pdf" alt="我是pdf文件" data=' + ourl + 
         ' title="" ><p>抱歉，您的浏览器不支持PDF预览，请点击链接下载PDF文件<a href="file:///Users/zhao/Documents/ocr/test.pdf"></a>/p> </object>';
     }
    $('#file_box').html(dom);
};

//侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
function OnProgRess2(event) {
    var event = event || window.event;
    //console.log(event);  //事件对象
    console.log("已经上传：" + event.loaded); //已经上传大小情况(已上传大小，上传完毕后就 等于 附件总大小)
    //console.log(event.total);  //附件总大小(固定不变)
    var loaded = Math.floor(100 * (event.loaded / event.total)); //已经上传的百分比  
    $("#speed2").html(loaded + "%").css("width", loaded + "%");
};

//开始上传文件
function UploadFileFn2() {

    $('.speed_box2').show();
    var oFile = $("#oFile2").get(0).files[0], //input file标签
    formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    formData.append("myfile", oFile); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去

    $.ajax({
        type: "POST",
        url: uploadUrl, // 后端服务器上传地址
        // data: formData, // formData数据
        dataType: "json",
        cache: false, // 是否缓存
        async: true, // 是否异步执行
        processData: false, // 是否处理发送的数据  (必须false才会避开jQuery对 formdata 的默认处理)
        contentType: false, // 是否设置Content-Type请求头
        xhr: function() {
            if (OnProgRess && xhr.upload) {
                xhr.upload.addEventListener("progress", OnProgRess2, false);
                return xhr;
            }
        },
        success: function(returndata) {
            $("#speed2").html("上传成功");
		
            //alert(returndata);  
        },
        error: function(returndata) {
            $("#speed2").html("上传失败");
            console.log(returndata)
            alert('请正确配置后台服务！');
        }
    });
}

var compare = function (x, y) {//比较函数
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}


//开始分析
function analysze() {
//  移除之前的
//    $('#item1').html('');
//    $('#item2').html('');
//    $('#item3').html('');
//    $('#item4').html('');
//    $('#item5').html('');
//    $('#item6').html('');
//     var oFile1 = $("#oFile").get(0).files[0].name;//input file标签
//     var oFile2 = $("#oFile2").get(0).files[0].name; //input file标签
//     formData = new FormData(); //创建FormData对象
//     xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
//     formData.append("f1", oFile1); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
//     formData.append("f2", oFile2); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
//    var ajaxbg = $("#background,#progressBar");
//     $.ajax({
//         type: "POST",
//         url: "check.php", // 后端服务器上传地址
//         data: formData, // formData数据
//         cache: false, // 是否缓存
//         async: true, // 是否异步执行
//         processData: false, // 是否处理发送的数据  (必须false才会避开jQuery对 formdata 的默认处理)
//         contentType: false, // 是否设置Content-Type请求头
// 	timeout: 60000,
// 	beforeSend:function() {
// 	  ajaxbg.show(); 
// 	},
//         xhr: function() {
//             if (OnProgRess && xhr.upload) {
//                 xhr.upload.addEventListener("progress", OnProgRess, false);
//                 return xhr;
//             }
//         },
//         success: function(returndata) {
// 	  ajaxbg.hide();
// 	  if(returndata.indexOf("Fatal error") != -1) {

// 		alert("分析失败");
// 		return;
// 	  }
//           $("#speed2").html("上传成功");
// 	  var list_arr = returndata.split('\r\n');
// 	  for (var i = 0; i < list_arr.length; i+=1) {
// 		line = list_arr[i];
// 		if (line.indexOf("JSON:") != -1) {
// 			var ele = line.substr(line.indexOf("JSON:") + 5);
// 			ele_obj = JSON.parse(ele);
// 			if (ele_obj.length == 0 || ele_obj[0] == null) {
// 				alert("分析成功，无差异");
// 			   	$('#item1').append('<p>无差异</p>');
//    				$('#item2').append('<p>无差异</p>');
// 				return;
// 			}
// 			ele_obj.sort(compare);
// 			for (var j = 0; j < ele_obj.length; j+=2) {
// 				var id1 =  j + 1;
// 	  			$('#item' + id1).append('<img src="slides/' +  ele_obj[j] + '?x=' + Math.random() +  '" class="img-fluid" alt="">');
// 				var id2 = j + 2;
// 	  			$('#item' + id2).append('<img src="slides/' + ele_obj[ j + 1] + '?x=' + Math.random() + '" class="img-fluid" alt="">');
// 			}
// 		}
// 	  }
// 	  //$('#item1').append('<img src="slides/slide.png?"' + Math.random() +  ' class="img-fluid" alt="">');
// 	  //$('#item2').append('<img src="slides/slide2.png?"' + Math.random() + ' class="img-fluid" alt="">');
// 	alert("分析成功");
//             //alert(returndata);  
//         },
//         error: function(returndata) {
// 	    ajaxbg.hide();
//             $("#speed2").html("上传失败");
//             console.log(returndata)
//             alert('请正确配置后台服务！');
//         }
//     });
}
