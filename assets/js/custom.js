/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */
addSimMessageHandler("web", (data) => {
    switch(data.action) {
        case "open" :
                const url = data.url;    
                var myArray = url.split("?");
                var myArray1 = myArray[0].split("/");
                //var left = (screen.width/2)-(300/2);
                // var top = (screen.height/2)-(30/2);
                //var newurl='https://115.111.238.147:889/api/ECommReflection?' + myArray[1];
                // alert(myArray[1].split('&')[1]);

                //var wnd =window.open(newurl+'&un='+ window.localStorage.getItem('un'), '_blank','toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0, copyhistory=0,width=10,height=10, top=1, left=1' );
                //var wnd =window.open('https://115.111.238.151/dbmani.aspx?un='+ window.localStorage.getItem('un') +'&' + myArray[1].split('&')[1] , '_blank','toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0, copyhistory=0,width=10,height=10, top=1, left=1' );
                //var wnd =window.open('http://localhost:56256/gaming_html_css/dbmani.aspx?un='+ window.localStorage.getItem('un') +'&' + myArray[1].split('&')[1] , '_blank','toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0, copyhistory=0,width=1,height=1, top=1, left=1' );
           
                //if(wnd){
                //    setTimeout(function () { wnd.close();}, 10);
                //}

                $.ajax(
                            {
                
                                url: '../dbmani.aspx/Insertscore',
                                data: '{"un":"' + window.localStorage.getItem('un') + '","score":"' + myArray[1].split('&')[1].split('=')[1] + '"}',
                                dataType: "json",
                                type: "POST",
                                contentType: "application/json; charset=utf-8", success: function (res) {
                                    debugger;
                                    //alert("Success");                    
                                    console.log(res);                    
                                },
                                error: function (xhr) {
                                    var err = JSON.parse(xhr.responseText);
                                    alert(err.message);
                                }
                            });
                break;
}                    
})
