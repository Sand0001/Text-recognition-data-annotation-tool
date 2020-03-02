<html>
<head>
<meta charset="utf-8"/>
</head>
<body>
<?php
//获取文件列表
function getFile($dir) {
    $fileArray[]=NULL;
    if (false != ($handle = opendir ( $dir ))) {
        $i=0;
        while ( false !== ($file = readdir ( $handle )) ) {
            //去掉"“.”、“..”以及带“.xxx”后缀的文件
            if ($file != "." && $file != ".."&&strpos($file,".png")) {
                $fileArray[$i]=$file;
                if($i==100){
                    break;
                }
                $i++;
            }
        }
        //关闭句柄
        closedir ( $handle );
    }
    return $fileArray;
}
//调用方法getDir("./dir")……
?> 

<?php
	#$_GET['f1'] = '医药医疗卫生工作汇报PPT模板2.pptx';
	#$_GET['f2'] = '医药医疗卫生工作汇报PPT模板2的副本.pptx';
	set_time_limit(0);
	$doc_root_dir = "/opt/lampp/htdocs";
	exec("rm -f ".$doc_root_dir."/office/slides/slide*.png");    
	#exec("rm -f ".$doc_root_dir."/office/slides/slide2.png");    
	$jar = $doc_root_dir."/office/check.jar";
	$output_dir = $doc_root_dir."/office/slides/";
	$input_file_a = $doc_root_dir."/file_up/".$_POST['f1'];
	$input_file_b = $doc_root_dir."/file_up/".$_POST['f2'];
	exec("java -jar  $jar $input_file_a $input_file_b $output_dir", $outPut);    
	echo("java -jar  $jar $input_file_a $input_file_b $output_dir");
	print_r($outPut);
	$file_arr = getFile($doc_root_dir."/office/slides/");
	echo ("JSON:".json_encode($file_arr, JSON_UNESCAPED_UNICODE));
?>

</body>
</html>
