var index = 1;
var multi = 1;
var forLoop;
var total = 9;
var pageNo = 1;
var sel = 1;
var ext = 9;
var APINumber;
var memory1;
var memory2;
var memory3;
var id; 
var dwn;
var downloadable1 = {};
var downloadable2 = {};
var downloadable3 = {};

$(document).ready(function() { 
    $(window).on('load', function() {
        for (var i = 1; i < 10; i++){
            getNames(i, index);
            index++;
        } // For
        
        sessionStorage.clear();
    }); 
    
    $("#next").click(function(){
        if (pageNo == 9) {
            $("#next").disabled = true;
            for (var n = 2; n < 10; n++) {
                $("#name" + n).text(" ");
                $("#name" + n).css("opacity", "0");
            } // For
        } // If
        $("h1").css("background-color", "#ffffff");
        if (pageNo == 9) {
            $("#next").css("opacity", "0");
        } // If
        
        if (1 <= pageNo & pageNo < 10) {
            pageNo++;
            $("#page").text("PAGE " + pageNo + "/10");
            $("#prev").css("opacity", "1");
            
            index = 1;
            forLoop = total 
            total = total + ext;
            if (pageNo == 10){
                getNames(83, index);
                index++;
            } // If
            else if (pageNo == 2) {
                for (var i = 10; i < 20; i++){
                    if (i != 17){
                        getNames(i, index);
                        index++;
                    } // If
                } // For
                total = 20;   
            } // If
            else {
                for (var i = forLoop; i < (forLoop + ext); i++){
                        getNames(i, index);
                        index++;
                } // For
            } // Else
        } // If
        
    }); // Next
    
    $("#prev").click(function(){
        $("h1").css("background-color", "#ffffff");
        
        if (1 < pageNo & pageNo <= 10) {
            pageNo--;
            $("#page").text("PAGE " + pageNo + "/10");
            $("#next").css("opacity", "1");
            $("h1").css("opacity", "1");
            
            index = 1;
            
            total = forLoop;
            forLoop = forLoop - ext;
            
            if (forLoop <= 2) {
                forLoop = 1;
            } // If     
            
            if (pageNo == 2) {
                for (var i = 10; i < 20; i++){
                    if (i != 17){
                        getNames(i, index);
                        index++;
                    } // If
                } // For
                forloop = 0;   
            } // If
            else {
                for (var i = forLoop; i < (forLoop + ext); i++){
                        getNames(i, index);
                        index++;
                } // For
            } // Else
        } // If
    
        if (pageNo == 1) {
            $("#prev").disabled = true;
        } // If
        if (pageNo == 1) {
            $("#prev").css("opacity", "0");
        } // If 
        
    }); // Prev
    
    $("#name1").click(function(){
        if ($("#name1").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
               if(sel < 4){
                $("#name1").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name1").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name1").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name1").text()).toUpperCase());
                } // Else If
                if (sessionStorage.getItem("name1") == null && sessionStorage.getItem("name1") != $("#name1").text()) {
                    sessionStorage.setItem("name1", $("#name1").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 2;
                    } // If
                    else {
                        multi = 1;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name11") == null && sessionStorage.getItem("name1") != $("#name1").text()) {
                    sessionStorage.setItem("name11", $("#name1").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 2;
                    } // If
                    else {
                        multi = 1;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name111") == null && sessionStorage.getItem("name1") != $("#name1").text()) {
                    sessionStorage.setItem("name111", $("#name1").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 2;
                    } // If
                    else {
                        multi = 1;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
                    
            } // If 
        } // If
        
    }); // Name 1   
    
    $("#name2").click(function(){
        if ($("#name2").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name2").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name2").text()).toUpperCase()); 
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name2").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name2").text()).toUpperCase()); 
                } // Else If
                if (sessionStorage.getItem("name2") == null && sessionStorage.getItem("name2") != $("#name2").text()) {
                    sessionStorage.setItem("name2", $("#name2").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 2;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name22") == null && sessionStorage.getItem("name2") != $("#name2").text()) {
                    sessionStorage.setItem("name22", $("#name2").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 2;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name222") == null && sessionStorage.getItem("name2") != $("#name2").text()) {
                    sessionStorage.setItem("name222", $("#name2").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 2;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
            } // If
        } // If
    }); // Name 2
    
    $("#name3").click(function(){
        if ($("#name3").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name3").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name3").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name3").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name3").text()).toUpperCase()); 
                } // Else If
                if (sessionStorage.getItem("name3") == null && sessionStorage.getItem("name3") != $("#name3").text()) {
                    sessionStorage.setItem("name3", $("#name3").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 4;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name33") == null && sessionStorage.getItem("name3") != $("#name3").text()) {
                    sessionStorage.setItem("name33", $("#name3").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 4;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name333") == null && sessionStorage.getItem("name3") != $("#name3").text()) {
                    sessionStorage.setItem("name333", $("#name3").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 3;
                    } // If
                    else {
                        multi = 4;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else if
            } // If
        } // If
    }); // Name 3
           
    $("#name4").click(function(){
        if ($("#name4").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name4").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name4").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name4").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name4").text()).toUpperCase());
                } // Else If
                if (sessionStorage.getItem("name4") == null && sessionStorage.getItem("name4") != $("#name4").text()) {
                    sessionStorage.setItem("name4", $("#name4").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 4;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    alert(multi)
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name44") == null && sessionStorage.getItem("name4") != $("#name4").text()) {
                    sessionStorage.setItem("name44", $("#name4").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 4;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name444") == null && sessionStorage.getItem("name4") != $("#name4").text()) {
                    sessionStorage.setItem("name444", $("#name4").text());
                    sel++;
                    if (pageNo < 2) {
                        multi = 4;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                }
            } // If
        } // If
      
    }); // Name 4   
   
    $("#name5").click(function(){
        if ($("#name5").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name5").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name5").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name5").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name5").text()).toUpperCase());
                } // Else If
                if (sessionStorage.getItem("name5") == null && sessionStorage.getItem("name5") != $("#name5").text()) {
                    sessionStorage.setItem("name5", $("#name5").text());
                    sel++
                    if (pageNo > 2) {
                        multi = 6;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name55") == null && sessionStorage.getItem("name5") != $("#name5").text()) {
                    sessionStorage.setItem("name55", $("#name5").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 6;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name555") == null && sessionStorage.getItem("name5") != $("#name5").text()) {
                    sessionStorage.setItem("name555", $("#name5").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 6;
                    } // If
                    else {
                        multi = 5;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                }
            } // If    
    } // If
    }); // Name 5
    
    $("#name6").click(function(){
        if ($("#name6").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4) {    
                $("#name6").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name6").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
               else if (sel == 2){
                    $("#sel").append(", " + ($("#name6").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name6").text()).toUpperCase());
                } // Else If
                if (sessionStorage.getItem("name6") == null && sessionStorage.getItem("name6") != $("#name6").text()) {
                    sessionStorage.setItem("name6", $("#name6").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 7;
                    } // If
                    else {
                        multi = 6;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name66") == null && sessionStorage.getItem("name6") != $("#name6").text()) {
                    sessionStorage.setItem("name66", $("#name6").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 7;
                    } // If
                    else {
                        multi = 6;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name666") == null && sessionStorage.getItem("name6") != $("#name6").text()) {
                    sessionStorage.setItem("name666", $("#name6").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 7;
                    } // If
                    else {
                        multi = 6;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi
                    getData(id);
                } // Else If
                
            } // If
        } // If
    }); // Name 6
       
    $("#name7").click(function(){
        if ($("#name7").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name7").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name7").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name7").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name7").text()).toUpperCase());
                }// Else If
                if (sessionStorage.getItem("name7") == null && sessionStorage.getItem("name7") != $("#name7").text()) {
                    sessionStorage.setItem("name7", $("#name7").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 8;
                    } // If
                    else {
                        multi = 7;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name77") == null && sessionStorage.getItem("name7") != $("#name7").text()) {
                    sessionStorage.setItem("name77", $("#name7").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 8;
                    } // If
                    else {
                        multi = 7;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name777") == null && sessionStorage.getItem("name7") != $("#name7").text()) {
                    sessionStorage.setItem("name777", $("#name7").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 8;
                    } // If
                    else {
                        multi = 7;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                } // Else If
                
            } // If
        } // If
    }); // Name 7
    
    $("#name8").click(function(){
        if ($("#name8").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name8").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name8").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name8").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name8").text()).toUpperCase()); 
                } // Else If
                if (sessionStorage.getItem("name8") == null && sessionStorage.getItem("name8") != $("#name8").text()) {
                    sessionStorage.setItem("name8", $("#name8").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 9;
                    } // If
                    else {
                        multi = 8;
                    } // Else
                    
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name88") == null && sessionStorage.getItem("name8") != $("#name8").text()) {
                    sessionStorage.setItem("name88", $("#name8").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 9;
                    } // If
                    else {
                        multi = 8;
                    } // Else
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name888") == null && sessionStorage.getItem("name8") != $("#name8").text()) {
                    sessionStorage.setItem("name888", $("#name8").text());
                    if (pageNo > 2) {
                        multi = 9;
                    } // If
                    else {
                        multi = 8;
                    } // Else
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
                
            } // If
        } // If
    }); // Name 8
           
    $("#name9").click(function(){
        if ($("#name9").text() != downloadable1.name || downloadable2.name || downloadable3.name) {
            if(sel < 4){
                $("#name9").css("background-color", "#70AD47");
                if (sel == 1){
                    $("#sel").text("YOU HAVE SELECTED " + ($("#name9").text()).toUpperCase());
                    $("#download").css("opacity", "1");
                    $("#reset").css("opacity", "1");
                } // If
                else if (sel == 2){
                    $("#sel").append(", " + ($("#name9").text()).toUpperCase());
                } // Else If
                else if (sel == 3){
                    $("#sel").append(" AND " + ($("#name9").text()).toUpperCase());
                } // Else If
                
                if (sessionStorage.getItem("name9") == null) {
                    sessionStorage.setItem("name9", $("#name9").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 10;
                    } // If
                    else {
                        multi = 9;
                    } // Else
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // If
                else if (sessionStorage.getItem("name99") == null && sessionStorage.getItem("name9") != $("#name9").text()) {
                    sessionStorage.setItem("name99", $("#name9").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 10;
                    } // If
                    else {
                        multi = 9;
                    } // Else
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
                else if (sessionStorage.getItem("name999") == null && sessionStorage.getItem("name9") != $("#name9").text()) {
                    sessionStorage.setItem("name999", $("#name9").text());
                    sel++;
                    if (pageNo > 2) {
                        multi = 10;
                    } // If
                    else {
                        multi = 9;
                    } // Else
                    id = ((pageNo - 1) * 9) + multi;
                    getData(id);
                } // Else If
            } // If
        } // If
        
            
    }); // Name 9  
    
    $("#reset").click(function(){
        sessionStorage.clear();
    }); // Reset Button
    
    $("#download").click(function(){
        dwn = JSON.stringify(downloadable1);
        request= new XMLHttpRequest()
        request.open("POST", "StarWars.php", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(dwn)
        
    }); // Download Button
}); // Document
 
function getNames(APINumber, index) {
    $.get("https://swapi.dev/api/people/" + APINumber, function(data, status){
            $("#name" + index).text(data.name);
            memory1 = sessionStorage.getItem("name" + index);
            memory2 = sessionStorage.getItem("name" + index + index);
            memory3 = sessionStorage.getItem("name" + index + index + index);
            if (data.name == memory1){
                $("#name" + index).css("background-color", "#70AD47");
            } // If
            if (data.name == memory2){
                $("#name" + index).css("background-color", "#70AD47");
            } // If
            if (data.name == memory3){
                $("#name" + index).css("background-color", "#70AD47");
            } // If
        }); // Get 
} // getNames

function getData(APINumber) {
    if (isEmpty(downloadable1)) {
        $.get("https://swapi.dev/api/people/" + APINumber, function(data, status){
            downloadable1.id = APINumber;
            downloadable1.name = data.name;
            downloadable1.height = data.height;
            downloadable1.mass = data.mass;
            downloadable1.hair_color = data.hair_color;
            downloadable1.skin_color = data.skin_color;
            downloadable1.eye_color = data.eye_color;
            downloadable1.birth_year = data.birth_year;
            downloadable1.gender = data.gender;
            downloadable1.homeworld = data.homeworld;
            downloadable1.films = data.films;
            downloadable1.species = data.species;
            downloadable1.vehicles = data.vehicles;
            downloadable1.starships = data.starships;
            downloadable1.created = data.created;
            downloadable1.edited = data.edited;
            downloadable1.url = data.url;
        });
    } // If
    else if (isEmpty(downloadable2)) {
        $.get("https://swapi.dev/api/people/" + APINumber, function(data, status){
            downloadable2.id = APINumber;
            downloadable2.name = data.name;
            downloadable2.height = data.height;
            downloadable2.mass = data.mass;
            downloadable2.hair_color = data.hair_color;
            downloadable2.skin_color = data.skin_color;
            downloadable2.eye_color = data.eye_color;
            downloadable2.birth_year = data.birth_year;
            downloadable2.gender = data.gender;
            downloadable2.homeworld = data.homeworld;
            downloadable2.films = data.films;
            downloadable2.species = data.species;
            downloadable2.vehicles = data.vehicles;
            downloadable2.starships = data.starships;
            downloadable2.created = data.created;
            downloadable2.edited = data.edited;
            downloadable2.url = data.url;
        });
    } // If
    else if (isEmpty(downloadable3)) {
        $.get("https://swapi.dev/api/people/" + APINumber, function(data, status){
            downloadable3.id = APINumber;
            downloadable3.name = data.name;
            downloadable3.height = data.height;
            downloadable3.mass = data.mass;
            downloadable3.hair_color = data.hair_color;
            downloadable3.skin_color = data.skin_color;
            downloadable3.eye_color = data.eye_color;
            downloadable3.birth_year = data.birth_year;
            downloadable3.gender = data.gender;
            downloadable3.homeworld = data.homeworld;
            downloadable3.films = data.films;
            downloadable3.species = data.species;
            downloadable3.vehicles = data.vehicles;
            downloadable3.starships = data.starships;
            downloadable3.created = data.created;
            downloadable3.edited = data.edited;
            downloadable3.url = data.url;
        });
    } // If
    
} // Get Names
    
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
} // Is Empty

