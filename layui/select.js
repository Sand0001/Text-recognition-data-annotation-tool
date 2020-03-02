
function select_type(){
    var muliSelect = xmSelect.render({
        el: '#test-select1',
        data: [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
        ]
    });
    var muliSelect = xmSelect.render({
        el: '#test-select2',
        data: [
            { name: '1', value: 1 ,select:true},
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
        ]
    })
}


// {/* <script> */}
$(function(){
    function initTableCheckbox() {
        var $thr = $('table thead tr');
        var $checkAllTh = $('<th width="30px"><input type="checkbox" id="checkAll" name="checkAll" /></th>');
        /*将全选/反选复选框添加到表头最前，即增加一列*/
        $thr.prepend($checkAllTh);
        /*“全选/反选”复选框*/
        var $checkAll = $thr.find('input');
        $checkAll.click(function(event){
            /*将所有行的选中状态设成全选框的选中状态*/
            $tbr.find('input').prop('checked',$(this).prop('checked'));
            /*并调整所有选中行的CSS样式*/
            if ($(this).prop('checked')) {
                $tbr.find('input').parent().parent().addClass('warning');
            } else{
                $tbr.find('input').parent().parent().removeClass('warning');
        }
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
        });
        /*点击全选框所在单元格时也触发全选框的点击操作*/
        $checkAllTh.click(function(){
        $(this).find('input').click();
        });
        var $tbr = $('table tbody tr');
        var $checkItemTd = $('<td width="30px"><input type="checkbox" name="checkItem" /></td>');
        /*每一行都在最前面插入一个选中复选框的单元格*/
        $tbr.prepend($checkItemTd);
        /*点击每一行的选中复选框时*/
        $tbr.find('input').click(function(event){
        /*调整选中行的CSS样式*/
        $(this).parent().parent().toggleClass('warning');

        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/
        $checkAll.prop('checked',$tbr.find('input:checked').length == $tbr.length ? true : false);
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
        });
        /*点击每一行时也触发该行的选中操作*/
        $tbr.click(function(){
        $(this).find('input').click();
        });
    }
    initTableCheckbox();
});
// </script>




// function statistical(){
//     '<td><div id="test-select'+ row_key + '" class="select"></div></td> ' +
// }


//统计一个数组中有多少个不重复的单词：
// 不用reduce时： 
var arr = ["1","2","3","4","1","3","1","2","3","4","1","3"]; 
function getWordCnt(){ 
    var obj = {}; 
    for(var i= 0, l = arr.length; i< l; i++){ 
        var item = arr[i]; 
        obj[item] = (obj[item] +1 ) || 1; 
    } 
    return obj; 
}
console.log(getWordCnt());//{apple: 2, orange: 3, pear: 1}

// 用reduce时： 
var arr = ["apple","orange","apple","orange","pear","orange"]; 
function getWordCnt(){ 
    return arr.reduce(function(prev,next){ 
        prev[next] = (prev[next] + 1) || 1; 
        return prev; 
    },{}); 
} 
console.log(getWordCnt());//{apple: 2, orange: 3, pear: 1}




{/* <script src="./layui/layui.all.js"></script>
<script src="./layui_exts/xm-select.js"></script>

<script src='./layui/select.js'></script> 
<script >
  var data= [ { name: '1', value: 1 },
              { name: '2', value: 2 },
              { name: '3', value: 3 },
              { name: '4', value: 4 },
              { name: '5', value: 5 } ];
  // var value = ["#test-select1","#test-select2"];
  // var value = ["#test-select2"];
  // var test = document.muliSelect.value;
  // var num = function nu() { var nu = $('#all_num').var();  console.log(nu); return nu} 
  var value = '';
  var num = 0;
  

  console.log(num);
  console.log(data);
  for( i=0; i< 10; i++){
    value = '#test-select' + i;
    var muliSelect = xmSelect.render({ el: value, data });
    console.log(muliSelect);
  }
  
  // var muliSelect = xmSelect.render({ el: value[1],data });
  // var muliSelect = xmSelect.render({
  //       el: '#test-select2',
  //       data
  // })
</script> */}