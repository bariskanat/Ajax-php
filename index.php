
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <style>
            .jquery input[type=submit]{
                display:none;
            }
            
            div.loading{
              
                width: 300px;
                height: 300px;
                border:1px solid #ccc;
               
               z-index: 3;
            }
        </style>
    </head>
    <body>
        
        <form action="" method="POST" id="countryform">
            
            <select id="countrylist">
                
                <!-----handlebar template for the country starts here---------->
                
                <script id="country-template" type="text/x-handlebars-template">
                    
                    {{#each this}}
                        <option value="{{id}}">{{name}}</option>
                     {{/each}}   
                     
                </script>
            </select>
            <input type="submit" value="submit">
        </form>
            
            <div id="statecontainer">
                
                <!-----handlebar template for the states starts here---------->
                <script id="state-template" type="text/x-handlebars-template">
                    {{#each this}}
                        <div>
                            <span>{{name}}</span>
                        </div>
                     {{/each}}   
                </script>
                
                
            </div>
        
        
        
        
       
        
        
        
        
        
        
        <script src="js/jquery.js"></script>
        <script src="js/handlebars.js"></script>  
        <script src="js/main.js"></script> 
        
        
        
    </body>
</html>
