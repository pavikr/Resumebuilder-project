let params=new URLSearchParams(document.location.search);
let index=params.get("index");

let existing_list = localStorage.getItem("resume_list");
let existing_data = JSON.parse(existing_list);
let resumeObj=existing_data[index];
document.getElementById("re-content").innerHTML="HELLO,"+ resumeObj.title
document.getElementById("re_name").innerHTML=resumeObj.name
//document.getElementById("re-information").innerHTML=resumeObj.personal_details.DOB
document.getElementById("my_no").innerHTML="PHONE NO:"+ resumeObj.contact
document.getElementById("my_id").innerHTML="MAIL:"+ resumeObj.email
document.getElementById("my_place").innerHTML="PLACE:"+ resumeObj.place
document.getElementById("my_dob").innerHTML="BIRTHDAY:"+ resumeObj.personal_details.DOB


console.log(resumeObj.name)

 


let edu_li = '';

for(let each of resumeObj.education){

    edu_li = edu_li + 
    `<li class="time-line-item">
    <span class="badge badge-primary">${each.course_name}</span>
    <h6 class="time-line-item-title">${each.inst_name}</h6>
    <p class="time-line-item-subtitle">${each.percentage}</p>
    <p class="time-line-item-content">${each.year_of_passed}</p>
    
</li>`
                        

}



document.getElementById('re_education').innerHTML = edu_li


let experi_li = '';

for(let each of resumeObj.experience){

    experi_li = experi_li + 
    
                            `<li class="time-line-item">
                                <span class="badge badge-primary">
                                <span class="badge badge-primary">${each.company_name}</span>
                                <h6 class="time-line-item-title">${each.year}</h6>
                                <p class="time-line-item-subtitle">${each.position}</p>
                                <p class="time-line-item-content">Mauris magna sapien,
                                    tortor>${each.year_of_experience}</p>
                            </li>`

                        

}



document.getElementById('new_experience').innerHTML =  experi_li


let languages_li = '';

for(let each of resumeObj.personal_details.languages){

    languages_li = languages_li +`<p >${each}</p>`
}
    
    document.getElementById("new-languages1").innerHTML = languages_li


    let hobbies_li = '';

for(let each of resumeObj.personal_details.hobbies){

    hobbies_li = hobbies_li +`<p >${each}</p>`
}
    
    document.getElementById("new_hobbies").innerHTML = hobbies_li


    let new_skills="";
    for(let each of resumeObj.skills){
        new_skills=new_skills+`<div class="media-body" ID="new_skills1">
        <h5 class="service-title">${each}</h5>
        </div>`
    }
    document.getElementById("new_skills1").innerHTML = new_skills



    // function nav(){
    //     let existing_list = localStorage.getItem("resume_list");
    //     let existing_data = JSON.parse(existing_list);
    //     let empty_navbar=""
    //     for(let each in existing_data){
    //         empty_navbar=empty_navbar+` <a class="nav-link active">HOME</a>
    //         <a href="resume.html?index=${each}" class="nav-link">RESUME</a>
    //         <a href="portfolio.html?index=${each}" class="nav-link">PORTFOLIO</a>
    //         <a href="blog.html?index=${each}" class="nav-link">BLOG</a>
    //         <a href="contact.html?index=${each}" class="nav-link">CONTACT</a>`
    //     }
    //     document.getElementById("collapsible-nav").innerHTML=empty_navbar
    // }