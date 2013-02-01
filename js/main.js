
(function(){
   $("body").addClass("jquery");
        
 var Country={
        
        
        defaults:{
            Effect:"fadeIn",
            Speed:500,
            CountryContainer:$("#countrylist"),
            CountryTemplate:$("#country-template").html(),
            StateContainer:$("#statecontainer"),
            StateTemplate: $("#state-template").html(),
            Url: "search.php",
            Image: "glass.png",
            backgroundColor:"#111",
            opacity:.4,
            zindex:2
            
        },

       
        init:function(config){
            $.extend(this.defaults,config);
            this.fetchCountrylist();
            this.bindEvents();
            
            
           
        },
            
        
        fetchCountrylist:function(){
    
              var request=this.getAjax({ method: "country"});
              this.handleRequestAjax(request,"country");    
         },
             
         
         fetchStateList:function(id){
              this.createLoading();
              var request=this.getAjax({ method: "state",country_id:id});       
              this.handleRequestAjax(request,"state"); 
              
         },
             
         
         centerElement:function(element){
            element.appendTo("body").css({
                position : "absolute",
                top      : ($(window).height() - element.outerHeight()) / 2 + "px",
                left     : ($(window).width() - element.outerWidth()) / 2 +"px"
                
            });
            
          
         },
        
         removeElement:function(element){
            if(element.length===1){
                element.remove();
           }
         },
        
         addOverlay:function(){
            
            $("<div>",{class:"overlay"}).css({
                zindex:Country.defaults.zindex,
                opacity:Country.defaults.opacity,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
                backgroundColor:Country.defaults.backgroundColor
            }).prependTo("body");
         },
         
          
         createLoading:function(){
           this.addOverlay();          
           this.centerElement($("<div>loading</div>").addClass("loading"));
         },
           
          
         removeLoading:function(){
           this.removeOverlay();
           this.removeElement($("div.loading"));
         },
         
           
         removeOverlay:function(){
           this.removeElement($("div.overlay"));        
           
         },
         
        
         getAjax:function(data){
            
            return $.ajax({               
                   type: "POST",
                   url: Country.defaults.Url,
                   data: data,
                   dataType: "json"
              });
         },
             
             
 
 
             
         handleRequestAjax:function(request,Type){
             
             request.done(function(data){
                 
                  if(!data.error){    
                      
                      Country.template(data.result,Type);
                     
                  }else{
                     alert("something went wrong try again ");
                  }

              });

              request.fail(function(jqXHR, textStatus) {
                    alert( "Request failed:  " + textStatus );
                });
            
            //waiting status remove if exists
              request.always(function(){
                  Country.removeLoading();
              });
            
         },
             
        
        bindEvents:function(){           
            this.defaults.CountryContainer.on("change",this.addChangeEvent);
        },
        
   
       addChangeEvent:function()
       {           
          Country.fetchStateList(this.value);
       },
        
      
        template:function(data,type){
           var def=Country.defaults,
               container = (type==="country")?def.CountryContainer:def.StateContainer,
               template  = (type==="country")?def.CountryTemplate:def.StateTemplate;
               template=Handlebars.compile(template);
               
            if(type==="country"){                
                container.html(template(data));                
            }
            else{
                
                container.hide().html(template(data))[def.Effect](def.Speed);
            }
            
        }
    };
        Country.init();
    })();

     