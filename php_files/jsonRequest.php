<?php
    header('Content-Type:application/json; charset=utf-8');// php가 echo시키는 Content-Type을 말하는 것이다

    // 슈퍼전역변수 $_POST배열에는 json으로 보내진 데이터는 저장되지 않음
    // 클라이언트가 보낸 json문자열을 별도의 공간에 저장되므로 
    // 그 문서를 일거오도록 해야 함

    $jsonData=file_get_contents('php://input');
    
    // echo "$jsonData";
    // 원래는 이 받은 jsonData를 분석하여 원하는 값을 DB같은 곳에 저장
    // 받은 json을 객체로 전환 

    // $obj=json_decode($jsonData);
    // echo "$obj->name, $obj->age, $obj->msg";

    // json-> 연관배열
    $arr=json_decode($jsonData, true);
    // echo $arr['name'];

    // DB에서 읽어온 데이터들은 연관배열로 읽어짐
    // 읽어온 데이터를 클라이언트에 echo할때 (응답)할때 
    // 데이터를 쉽게 구별시키기 위해...
    // JSON으로 echo하는 경우가 대부분
    // 예전에는 XML이나 CSV사용
    

    // 연관배열 -> json문자열로 변환
    echo json_encode($arr);
    








?>