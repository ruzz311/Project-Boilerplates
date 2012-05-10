
Tellem = function(){
    
    var _msg = function() {
        return "\n"+
" ________   __    __    _______   __    __ \n"+
"|        | |  |  |  |  /       | |  |  /  / \n"+
"|  ------' |  |  |  |  |   ____| |  | /  / \n"+
"|  |___    |  |  |  |  |  |      |  |/  / \n"+
"|   ___|   |  |  |  |  |  |      |     / \n"+
"|  |       |  |  |  |  |  |____  |     \\ \n"+
"|  |       |   --   |  |       | |  |\\  \\ \n"+
"|__|       \\________/   \\______| |__| \\__\\ \n"+
" \n"+
"                        _____ \n"+
"                       ||   || \n"+
"                       |\\___/| \n"+
"                       |     | \n"+
"                       |     | \n"+
"                       |     | \n"+
"                       |     | \n"+
"                       |     | \n"+
"                       |     | \n"+
"                  _____|<--->|_____ \n"+
"                 /     |     |     \\ \n"+
"             /   |     |     |     | \\ \n"+
"            |    |     |     |     |  | \n"+
"            |    |     |     |     |  | \n"+
"            |                      |  | \n"+
"            |                      |  | \n"+
"            |                        / \n"+
"            |                       / \n"+
"             \\                     / \n"+
"              \\                   / \n"+
"               |                  | \n"+
"               |                  | \n"+
" \n"+
"                   ____     ____  _________   ___     ___ \n"+
"                   \\   \\   /   / /         \\ |   |   |   | \n"+
"                    \\   \\ /   /  |  _____  | |   |   |   | \n"+
"                     \\       /   | |     | | |   |   |   | \n"+
"                      \\     /    | |     | | |   |   |   | \n"+
"                       |   |     | |     | | |   |   |   | \n"+
"                       |   |     | |_____| | |   |___|   | \n"+
"                       |   |     |         | |           | \n"+
"                       |___|     \\_________/ \\___________/ \n"+
" \n";
    };
    
    var public_obj = {
        fuckyou : function(){
            var div = $( '<div/>' );
            div.attr( 'style', 'background: red; color:white; font-weight:bold; position:absolute; top:0; bottom:0; left:0; right:0; height:100%; width:100%; z-index:99999;' );
            div.html( '<pre>'+_msg+'</pre>' ).appendTo( 'body' );
        },
        sorry : function(){
            //document.getElementById('fuck_off');
        }
    };
    
    return public_obj;
};