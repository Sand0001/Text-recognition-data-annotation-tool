var resUrl = 'http://39.104.88.168/ocr_recognition_test?language&json_response';
// var reqURL = 'http://39.104.88.168/other_ocr?';
var uploadUrl = 'http://39.104.88.168/ocr_recognition_test';
// var uploadUrl = 'http://127.0.0.1/ocr_recognition_test';



var alltabtr = 0;


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


function startLoad() {
	$('#loading').show();
	$('.res_box').html('');
	$('#tab_show').html('');
}

function endLoad() {
	$('#loading').hide();
}



function composeTR(row_key, img_url, img_name, rec_img, rec_text, label) { // id, 图片URL，原图名，文字图名，文字，修改的文字
    // console.log(img_url);
    // return '<tr ><td><a href="javascript:void(0);" id=" '+ img_id+' " class="img_class" onclick="showimg(this)">' + img_url + '</a></td></tr>';
    // return '<tr ><td><form  method="post" action=""><a href="javascript:void(0);" class="img_class" value="'+img_url+'" onclick="showimg()">' + img_url + '</a></form></td></tr>';
    dom = "";
    ourl = img_url + img_name;
    rec_ourl = img_url + rec_img;
    // console.log(label);
    
    if(rec_text != ""){
      rec_text = rec_text.replace(/(["])/g,'&#34');
    //   console.log(rec_text);
    } 
    //rec_text = rec_text.replace(/(["])/g,'&#34');
    //console.log(rec_text);
    
    dom = '<form class="form" method="post" action="" target="exec_target"><table class="tab_show" border=2 id='+ row_key + 'max-width="100%">' +
    '<tr><td class="row_id"><p><input type="checkbox" name="num" value="check" max-width="100%"/>'+ row_key + '</p></td>' +
    '<td><div id="test-select'+ row_key + '" class="select"></div></td> ' +
    '<td class="td_left"><ul><li><img class="photo" max-width="100%" alt="我是image图片文件" src="' + ourl +
    '"title=""/></li><li><img class="photo" max-width="99%" alt=我是image图片文件 src="' + rec_ourl + 
    '"title=""/></li></td> <td class=""><ul><li>' + rec_text + '</li><li>' + label +
    '</li><li><input class="text_mod" type="text" value="' + rec_text + 
    '" /></li></ul></td><td><select type="text" class="is_save"><option value="true">有效</option><option value="false">无效</option></select></td><td><input type="submit" value=保存 onclick="savetext( '+row_key+
    ');"/></td></tr></table></form>'
    
    var data= [   { name: '1', value: 1 },
                  { name: '2', value: 2 },
                  { name: '3', value: 3 },
                  { name: '4', value: 4 },
                  { name: '5', value: 5 },
                  { name: '6', value: 5 },
                  { name: '7', value: 5 },
                  { name: '8', value: 5 },
                  { name: '9', value: 5 },
                  { name: '10', value: 5 }, ];
    $(function(){ 
        var value = '#test-select' + row_key;
        // console.log(value);
        // console.log(data);
        var muliSelect = xmSelect.render({ el: value, data });
        // console.log(muliSelect);
        //   } 
        }); 

    return dom
}


function statistical() {
    console.log("statistical()----------------------");
    // var count = $("#all_num").val();
    // var language = $("#language").val();
    // console.log(count);
    var lst = new Array;
    for(i = 0; i < alltabtr; i++){
        var select_id = "#test-select"+i;
        console.log(select_id);     
        // var lst = document.getElementById(select_id).getElementById("label-content").length;
        // var lst = document.getElementById(select_id).getElementsByClassName("label-content");
        var str = $(select_id +" .label-content ").attr("title");
        // list.append(txt)
        console.log(str)
        if (str.indexOf("1")!=-1){
            lst.push("1");
        }
        if (str.indexOf("2")!=-1){
            lst.push("2");
        }
        if (str.indexOf("3")!=-1){
            lst.push("3");
        }
        if (str.indexOf("4")!=-1){
            lst.push("4");
        }
        if (str.indexOf("5")!=-1){
            lst.push("5");
        }
        // console.log(lst);      
    }
    // return lst;
    getWordCnt(lst);
    // console.log(getWordCnt(lst)) ;    
}


function getWordCnt(lst){ 
    // var arr = ["1"];
    var arr = lst;
    var obj = {}; 
    for(var i= 0, l = arr.length; i< l; i++){ 
        var item = arr[i]; 
        obj[item] = (obj[item] +1 ) || 1; 
    } 
    // return obj; 
    console.log(obj);
    $("#type1").html(obj[1]);
    $("#type2").html(obj[2]);
    $("#type3").html(obj[3]);
    $("#type4").html(obj[4]);
    $("#type5").html(obj[5]);
    // $("#type6").html(obj[6]);
}
// console.log(getWordCnt());//{apple: 2, orange: 3, pear: 1}



function clearSelect(){
    $("#type1").html(0);
    $("#type2").html(0);
    $("#type3").html(0);
    $("#type4").html(0);
    $("#type5").html(0);
    // $("#type6").html(0);
    for(i = 0; i < alltabtr; i++){
        var select_id = "#test-select"+i;
        // var str = $(select_id +" .label-content ").;
        $(select_id).oncl;
        // var select_id = document.getElementsByClassName(".xm-iconfont .xm-icon-close");
        console.log(select_id);
        // document.getElementsByClassName(".xm-iconfont .xm-icon-close").onclick;
        // $(".xm-iconfont .xm-icon-close").onclick;
        $("::before").onclick;
        // console.log('onclick');
    }
}


//将URL中的UTF-8字符串转成中文字符串  
function getCharFromUtf8(str) {  
    var cstr = "";  
    var nOffset = 0;  
    if (str == "")  
    return "";  
    //    str = str.toLowerCase();  
        nOffset = str.indexOf("%E");  
    if (nOffset == -1)  
    return str;  
    while (nOffset != -1) {  
            cstr += str.substr(0, nOffset);  
            str = str.substr(nOffset, str.length - nOffset);  
    if (str == "" || str.length < 9)  
    return cstr;  
            cstr += utf8ToChar(str.substr(0, 9));  
            str = str.substr(9, str.length - 9);  
            nOffset = str.indexOf("%E");  
        }  
    return cstr + str;  
    } 
    
    //将编码转换成字符  
    function utf8ToChar(str) {  
    var iCode, iCode1, iCode2;  
        iCode = parseInt("0x" + str.substr(1, 2));  
        iCode1 = parseInt("0x" + str.substr(4, 2));  
        iCode2 = parseInt("0x" + str.substr(7, 2));  
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
    } 
    
// savetext
function savetext(id_tr) {  
    var id_form = $(".form").get(id_tr);
    // alert(id_tr);
    // console.log(id_form);
    var img_url = $(".photo").get(id_tr*2).src;
    console.log("小图src：")
    console.log(getCharFromUtf8(img_url));
    var text_mod = $(".text_mod").get(id_tr).value;
    var is_save = $(".is_save").get(id_tr).value;
    // console.log($(".text").get(id_tr).value)
    // formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    var json_response = {"imgurl":getCharFromUtf8(img_url),"text":text_mod,"is_save":is_save};
    var language = $("#language").val();
    console.log(language);
    // console.log(json_response);
    // formData.append("json_response",json_response); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    // formData.append("text", text_mod);
    // console.log(text_mod);
    $.ajax({
        //请求方式
        type:"post",
        //文件位置
        url: resUrl, // 后端服务器上传地址
        //返回数据格式为json,也可以是其他格式如
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(json_response),
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
            startLoad();
	    // alert('上传成功');
            endLoad();
        },error: function(data) {
            alert('上传失败');
            endLoad();
            }
    });

}


function load(data) {
    
	if (data) {
        var code = data['code'];
        if(code == 0){
            html_patient = "";
            var file_url = data["file_url"];
            var res_imgs = data["img_info"];
            var after_detect_img_info = data["after_detect_img_info"];
            console.log(file_url);
            // console.log(res_imgs);
            var aNum = "";
            for(i in res_imgs){
                var img_name = res_imgs[i]['img_name'];
                var text = res_imgs[i]['text'];
                var rec_img = res_imgs[i]['rec_img'];

                // console.log(img_name);
                if(rec_img != ""){
                    // dom = '<img id="photo" width="100%" alt="我是image图片文件" src=' + file_url+after_detect_img_info + ' title="" />';
                    var label = text["label"];
                    var rec_text = text["rec_text"];

                    // console.log(text);
                    // var img_url = res_imgs[i].replace(/\s+/g,"");
                    // var img_url = res_imgs[i];
                    html_patient += composeTR(i, file_url, img_name, rec_img, rec_text, label);
                }
                aNum = i;
                alltabtr = i;
            }
            dom = '<img id="photo" width="100%" alt="我是image图片文件" src=' + file_url+after_detect_img_info + ' title="" />';
            all_num = aNum;
            $('#res_box').html(dom);
            $('#all_page').html(html_patient); 
            $('#all_num').html(all_num);
        }
        
    }
}


//开始上传文件
function showAlljpg() {
    $('.speed_box').show();
    var oFile = $("#oFile").get(0).files[0]; //input file标签
    var language = $("#language").val();
    var checkLabel = $("#checkLabel").val();
    var txtlabel = $("#txtlabel").val();
    var select_all = $("#test-select").val();
    // console.log(select_all);

    formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    formData.append("file", oFile); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    formData.append("language", language);
    formData.append("checkLabel", checkLabel);
    formData.append("txtlabel", txtlabel);
    console.log(language);
    console.log(checkLabel);
    console.log(txtlabel); 
    $.ajax({
        type: "POST",
        url: uploadUrl, // 后端服务器上传地址
        // url: "test.txt",
        data: formData, // formData数据
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
            $("#speed").html("上传成功");
            // alert(data);
	    //startLoad();            
            // console.log(data)
            data = JSON.parse(data);
            load(data);
            endLoad();
        },error: function(data) {
            $("#speed").html("上传失败");
            startLoad();
	    // console.log(data)
            alert('请正确配置后台服务！');
            endLoad();
            }
    });
};



