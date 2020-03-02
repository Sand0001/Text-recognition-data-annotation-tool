var resUrl = 'http://39.104.88.168/ocr_recognition_test?language&json_response';
// var reqURL = 'http://39.104.88.168/other_ocr?';
var uploadUrl = 'http://39.104.88.168/ocr_recognition_test';
// var uploadUrl = 'http://127.0.0.1/ocr_recognition_test';




var alltabtr = 0;
// errorType 展示+传输 修改这里就行
var ERRORTYPE = [];
var ALLIMAGENUMBER = 0
var CHECKLABELDATA = ''
var ERROTYPES_DATA = []


function get_errorType_list(filename){
    ERRORTYPE = filename.split(',').slice(1);
    //ERRORTYPE = errorType_list
    //return errorType_list

}


function put_errolist_on_left(erro_list){
    html_type = "";
    for (var i = 0; i < erro_list.length; i++) {
        // dom = '<td id="eType'+i+'">'+errorType[i]+':</td><td type="text" id="type'+i+'" name="type'+i+'">0</td>' 
        html_type += typedom(erro_list[i],i);
        $("#eType").html(html_type);
    }

    
}

function get_errorType(filename) {

    errorType = get_errorType_list(filename)
    console.log(errorType);
    

    
    put_errolist_on_left(ERRORTYPE)

    // for (var i = 0; i < ERRORTYPE.length; i++) {
    //     // dom = '<td id="eType'+i+'">'+errorType[i]+':</td><td type="text" id="type'+i+'" name="type'+i+'">0</td>' 
    //     html_type += typedom(ERRORTYPE[i],i);
    //     $("#eType").html(html_type);
    // }
    
    
}

function get_erro_type_data_from_row(){
    var data = [];
    for (i = 0; i < ERRORTYPE.length; i++) {
        data.push({ name: ERRORTYPE[i], value: i });
    }
    return data
}

// 将类别显示到左边页面上
function typedom(value,i) {
    dom = '<tr><td id="eType' + i + '">' + value + ':</td><td type="text" id="'+value+'" calss="typenu" name= "'+value+'" >0</td></tr>'
    return dom;
}

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
    if ('audio/mp3' == otype || 'audio/wav' == otype || 'audio/x-m4a' == otype) {
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
    $('.res_box').html('fFFFGG');
    $('#tab_show').html('');
};

function endLoad() {
    $('#loading').hide();
};



function composeTR(row_key, img_url, img_name, rec_img, rec_text, label,data,reload = false) { // id, 图片URL，原图名，文字图名，文字，修改的文字
    // console.log(img_url);
    // return '<tr ><td><a href="javascript:void(0);" id=" '+ img_id+' " class="img_class" onclick="showimg(this)">' + img_url + '</a></td></tr>';
    // return '<tr ><td><form  method="post" action=""><a href="javascript:void(0);" class="img_class" value="'+img_url+'" onclick="showimg()">' + img_url + '</a></form></td></tr>';
    dom = "";
    ourl = img_url + img_name;
    rec_ourl = img_url + rec_img;
    // console.log(label);

    if (rec_text != "") {
        rec_text = rec_text.replace(/(["])/g, '&#34');
        //   console.log(rec_text);
    }

    dom = '<form class="form" method="post" action="" target="exec_target"><table class="tab_show" border=2 id=' + row_key + 'max-width="100%">' +
        '<tr><td class="row_id"><p><input type="checkbox" name="num" value="check" max-width="100%"/>' + row_key + '</p></td>' +
        '<td class="row_select"><div id="test-select' + row_key + '" class="select"></div></td> ' +
        '<td class="row_img"><ul><li><img class="photo" max-width="100%" alt="我是image图片文件" src="' + ourl +
        '"title=""/></li></td> <td class="row_text"><ul><li>' + rec_text + '</li><li>' + label +
        '</li><li><input class="text_mod" type="text" value="' + rec_text +
        '" /></li></ul></td><td class="row_bool"><select type="text" class="is_save"><option value="true">有效</option><option value="false">无效</option></select></td><td class="row_save"><input type="submit" value=保存 onclick="savetext( ' + row_key +
        ');"/></td></tr></table></form>'
    //<li><img class="photo" max-width="99%" alt=我是image图片文件 src="' + rec_ourl +'"title=""/></li>

    $(function() {
        var value = '#test-select' + row_key;
        var muliSelect = xmSelect.render({ el: value, data });
    });
    // a = load_row_erro_type(row_key,data);

    return dom
}

function load_row_erro_type(row_key,data){
    console.log('row_key,data',row_key,data)
    var value = '#test-select' + row_key;
    var muliSelect = xmSelect.render({ el: value, data });    //这个data应该存放的是xmSlect的初始值
    return muliSelect

}

//统计类型个数
function statistical() {
    console.log("statistical()----------------------");
    if (ERRORTYPE != []){
        var lst = new Array;
        var count_num = 0;
        var count_dict = {};
        
        for (var i=0 ;i<ERRORTYPE.length;i++){
            count_dict[ERRORTYPE[i]] = 0;
        }
        for (var jj = 0; jj < ALLIMAGENUMBER; jj++) {   //不知道哪里用了i 还好像是全局变量 
            var select_id = "#test-select" + jj;
            var str = $(select_id + " .label-content ").attr("title");
            if (str != "") {
                row_erroType_list = str.split(',')
                for(var j = 0;j<row_erroType_list.length;j++){
                    count_dict[row_erroType_list[j]] = (count_dict[row_erroType_list[j]] + 1) ;
                }
                count_num += 1 ; //真正计数的图片个数
                $('#all_num').html(count_num)
            }
    }
    for (var item in count_dict) {
        $("#"+item).html(count_dict[item]);
    }
    }
};

//更新xmrenser里面的类别
function get_new_ERROTYPES_DATA(newInputType_list){ 
    new_ERROTYPES_DATA = ERROTYPES_DATA  //这个copy不知道有没有问题 先这么复制吧
 // 更新新的错误类别
    for(var j = 0;j<newInputType_list.length;j++){
        new_ERROTYPES_DATA.push({ name: newInputType_list[j], value: ERROTYPES_DATA.length+j });
    }
    ERROTYPES_DATA = new_ERROTYPES_DATA
    // for (var jj = 0;jj<ERROTYPES_DATA.length;jj++){

    //     state_data.push({ name: ERROTYPES_DATA[jj], value: jj , selected: true})

    // }
    //保存之前统计的状态在 all_state_data
    var all_state_data = [];
    for(var ii = 0;ii <ALLIMAGENUMBER;ii++){
        var state_data = [];
        var select_id = "#test-select" + ii;
        var str = $(select_id + " .label-content ").attr("title");
        var n = 0;
        if (str != "") {
            for(var item in ERROTYPES_DATA){
                row_erroType_list = str.split(',');
                tmp_state = JSON.parse(JSON.stringify(ERROTYPES_DATA[item]));  //这是json的深拷贝
                if (row_erroType_list.includes(ERROTYPES_DATA[item]['name'])){
                    tmp_state['selected'] = true
                    state_data.push(tmp_state);
                }
                else{
                    state_data.push(tmp_state);
                }
                n = n+1;
            }
        }
        else{
            state_data = new_ERROTYPES_DATA;
        }
        console.log('state_data',state_data)
        all_state_data.push(state_data)
        }
        return all_state_data
    }

function uploadNewType(){ //现在还可以重复提交 等之后去掉她

    var newInputType = $("#newInputType").val();
    newInputType_list = newInputType.split(',')
    all_state_data = get_new_ERROTYPES_DATA(newInputType_list)

    load(CHECKLABELDATA,all_state_data,reload = true) // 重新加载xml 行状态
    put_errolist_on_left(ERRORTYPE)

}


//  清除  还没做完
function clearSelect() {
    $("#typenum1").html(0);
    $("#type2").html(0);
    $("#type3").html(0);
    $("#type4").html(0);
    $("#type5").html(0);
    $("#type6").html(0);
    $("#type7").html(0);
    $("#type8").html(0);
    $("#type9").html(0);
    $("#type10").html(0);
    // $("#type6").html(0);
    for (i = 0; i < alltabtr; i++) {
        var select_id = "#test-select" + i;
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
    var img_url = $(".photo").get(id_tr * 2).src;
    
    var text_mod = $(".text_mod").get(id_tr).value;
    var is_save = $(".is_save").get(id_tr).value;
    var typelst = new Array;
    typelst = getErrorType(id_tr);
    console.log("savetext =============" + typelst);

    // formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    var json_response = { "imgurl": getCharFromUtf8(img_url), "text": text_mod, "is_save": is_save, "errorTypes": typelst };
    var language = $("#language").val();
    formData.append("json_response", json_response); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    formData.append("text", text_mod);
    $.ajax({
        //请求方式
        type: "post",
        //文件位置
        url: resUrl, // 后端服务器上传地址
        // url: "test1.txt" ,
        //返回数据格式为json,也可以是其他格式如
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(json_response),
        processData: false, // 不处理数据
        contentType: false, // 不设置内容类型
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
        success: function(data) {
            startLoad();
            // alert('上传成功');
            endLoad();
        },
        error: function(data) {
            alert('上传失败');
            endLoad();
        }
    });

};


function load(data,ERROTYPES_DATA,reload = false) {

    


    if (data) {
        var code = data['code'];
        if (code == 0) {
            html_patient = "";
            var file_url = data["file_url"];
            var res_imgs = data["img_info"];
            var after_detect_img_info = data["after_detect_img_info"];
            var aNum = "";
            for (i in res_imgs) {
                var img_name = res_imgs[i]['img_name'];
                var text = res_imgs[i]['text'];
                var rec_img = res_imgs[i]['rec_img'];
                if (rec_img != "") {
                    // dom = '<img id="photo" width="100%" alt="我是image图片文件" src=' + file_url+after_detect_img_info + ' title="" />';
                    var label = text["label"];
                    var rec_text = text["rec_text"];
                    if (reload == true){
                        //console.log('ERROTYPES_DATA[i]',ERROTYPES_DATA[i])
                        html_patient += composeTR(i, file_url, img_name, rec_img, rec_text, label,ERROTYPES_DATA[i]);  //这个ERROTYPES_DATA应该存放的是xmSlect的初始值

                    }
                    else{
                        html_patient += composeTR(i, file_url, img_name, rec_img, rec_text, label,ERROTYPES_DATA);  //这个ERROTYPES_DATA应该存放的是xmSlect的初始值

                    }
                }
                aNum = i;
                alltabtr = i;
            }
            dom = '<img id="photo" width="100%" alt="我是image图片文件" src=' + file_url + after_detect_img_info + ' title="" />';
            all_num = aNum;
            ALLIMAGENUMBER = aNum
            $('#res_box').html(dom);
            $('#all_page').html(html_patient);
            $('#all_num').html(all_num);
        }

    }
};


//开始上传文件
function showAlljpg() {
    $('.speed_box').show();
    var oFile = $("#oFile").get(0).files[0]; //input file标签
    var language = $("#language").val();
    var checkLabel = $("#checkLabel").val();
    var txtlabel = $("#txtlabel").val();
    var filename = $("#filename").val();
    var select_all = $("#test-select").val();
    // console.log(select_all);
    get_errorType(filename);
    formData = new FormData(); //创建FormData对象
    xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
    formData.append("file", oFile); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去
    formData.append("language", language);
    formData.append("checkLabel", checkLabel);
    formData.append("txtlabel", txtlabel);
    formData.append("filename", filename.split(',')[0]);
    
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
        //请求成功后要执行的函数，拼接htmlf
        success: function(data) {
            $("#speed").html("上传成功");
            
            data = JSON.parse(data);
            CHECKLABELDATA = data

            errorTypes_data = get_erro_type_data_from_row()
            ERROTYPES_DATA = errorTypes_data
            
            load(data,ERROTYPES_DATA);
            endLoad();
        },
        error: function(data) {
            $("#speed").html("上传失败");
            startLoad();
            alert('请正确配置后台服务！');
            endLoad();
        }
    });


};

//获取当前行的错误类型以供保存使用
function getErrorType(i) {
    console.log("getErrorType----------------------------------------");
    var lst = new Array;
    var select_id = "#test-select" + i;
    var str = $(select_id + " .label-content ").attr("title");
    return str
}