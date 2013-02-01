<?php


require_once 'class.php';


$method=$_POST['method'];

//memcache class wrapper
$cache=new Mcache();

if(isset($method) && $method=="country"){
  
    $query   ="SELECT `id` ,`name` from `country` ";
    
    if(!$cache->get("country"))
    {
        //database class
        $result=(new Db())->get($query);
        
        //caching result
        $cache->add("country",$result,6000);
        
        echo $result;
    }else{
        echo $cache->get("country");
    }
     
    
    
}elseif(isset($method) && $method=="state" && isset($_POST['country_id'])){
  
    $query  ="SELECT `id` ,`name` from `states`  where `country_id` = ?";
    
    if(!$cache->get("state_{$_POST['country_id']}"))
    {
        
        //database class
        $result=(new Db())->get($query,array($_POST['country_id']));
        
        $cache->add("state_{$_POST['country_id']}",$result,6000);
        
        echo $result;
    }else{
      
        echo $cache->get("state_{$_POST['country_id']}");
    }
     
    
    
    
}else{
    
    echo json_encode(array("error"=>true));
}

