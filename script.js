//step 01: create a XHR Object
var request = new XMLHttpRequest();
//step 02:Api URL/using HTTP Method/establishing a connection
request.open('GET','https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json');
//step 03:establishing the path
request.send();
//step 04:once the data successfully loaded from the server,
//we have to convert the data
//loading a data from a server :event
//onload

var data;

request.onload=function(){
    var userdata=JSON.parse(request.response);
    data=userdata;
    createtable(1);

}

function createtable(a){
    document.body.innerHTML="";
    let container=document.createElement("div");
    container.setAttribute("class","container");

    let row=document.createElement("div");
    row.setAttribute("class","row");

    let col=document.createElement("div");
    col.setAttribute("class","col");

    var table=document.createElement("table");
    table.className="table";
    var thead=document.createElement("thead");
    thead.className="thead-dark";
    var tr=document.createElement("tr");
    var th1=createele("th","ID")
    var th2=createele("th","Name")
    var th3=createele("th","Email")

    tr.append(th1,th2,th3);
    thead.append(tr);

    var tbody=document.createElement("tbody");
    
    for(var i=((a-1)*5);i<(a*5);i++)
    {
        var tr=document.createElement("tr");
        if(i%2==0){
            tr.className = "bg-light";
        }
        var td1=createele("td",data[i]["id"]);
        var td2=createele("td",data[i]["name"]);
        var td3=createele("td",data[i]["email"]);
        tr.append(td1,td2,td3);
        tbody.append(tr);
    }
   
    table.append(thead,tbody);
    var ul=document.createElement("ul");
    // if(a!=1){
        
    //     var li=createli("previous",a);
    //     ul.append(li);
    // }
    for (var j = 0; j < (data.length/5); j++) {
        var k=j+1;
        var li=createli(""+k+"",a);
        ul.append(li);
    }
    // if(a!=20){
    //     var li=createli("next",a);
    //     ul.append(li);
    // }
    col.append(table,ul);
    row.append(col);
    container.append(row);
    document.body.append(container);

}


function createli(srno,activeele){
    let res = document.createElement("li");
    res.setAttribute('value', srno);
    res.innerHTML=srno;
    res.addEventListener("click",setpage); 
    if(activeele==srno){
        res.className="active";  
    }
    return res;
}

function createele(elename,value){
    let res=document.createElement(elename);
    res.innerHTML=value;
    return res;
}

function setpage(){   
    var element=this;
    var a =this.value;
    // if(element.value=="next"){
    //     a=a+1
    // }
    // if(element.value=="previous"){
    //     a=a-1
    // }
    for (const li of document.querySelectorAll("li.active")) {
        li.classList.remove("active");
      }
    createtable(a);
}

