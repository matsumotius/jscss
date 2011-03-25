(function($){
    var Util = {
        List : function(array){
            this.array = array;
            this.contains = function(value){
                for(var i=0;i<this.array.length;i++){
                    if(array[i] == value) return true;
                }
                return false;
            };
        },
        EXP : {
            ID : function(val){
                return '#'+val;
            },
            CLS : function(val){
                return '.'+val;
            },
            TAG : function(val){
                return val;
            }
        }
    };
    
    $.fn.jscss = function(options){
        var defaults = {
            // nothing  
        };
        var settings = $.extend(defaults, options);
        
        var event_type_of = function(obj){
            return ($.isArray(obj) && obj.length == 2)? { is_multi : true } : { is_multi : false };
        };
        
        var key_type_of = function(key){
            if(key[0] == '#'){
                return { is_id : true, is_cls : false, is_tag : false };
            }else if(key[0] == '.'){
                return { is_id : false, is_cls : true, is_tag : false };
            }else{
                return { is_id : false, is_cls : false, is_tag : true }; 
            }
        };
        
        var execute = function(e, element, hash, key){
            if(hash[key] && hash[key].event[e.type]){
                for(el_name in hash[key].event[e.type]){
                    if(el_name != 'js' && hash[key].event[e.type][el_name]){
                        for(css_key in hash[key].event[e.type][el_name]){
                            $(element).find(el_name).css(css_key, hash[key].event[e.type][el_name][css_key]);
                        }
                    }else if(el_name == 'js' && hash[key].event[e.type].js){
                        hash[key].event[e.type].js(e);
                    }
                }
            }
        };
        
        var apply = function(element, hash){
            if(!element || !hash) return;
            for(key in hash) {
                for(ev_name in hash[key].event){
                    if(key_type_of(key).is_id){
                        element.find(key)[ev_name](function(e){
                            if($(this).attr('id')){
                                execute(e, element, hash, Util.EXP.ID($(this).attr('id')));
                            }
                        });
                    }
                    if(key_type_of(key).is_cls){
                        element.find(key)[ev_name](function(e){
                            if($(this).attr('class')){
                                execute(e, element, hash, Util.EXP.CLS($(this).attr('class')));
                            }
                        });
                    }
                    if(key_type_of(key).is_tag){
                        element.find(key)[ev_name](function(e){
                            if($(this)[0].nodeName){
                                execute(e, element, hash, Util.EXP.TAG($(this)[0].nodeName.toLowerCase()));
                            }
                        });
                    }
                }
            }
        };
        
        apply(this, settings);
        return this;
    }
})(jQuery);