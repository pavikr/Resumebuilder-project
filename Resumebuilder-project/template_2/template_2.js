let params=new URLSearchParams(document.location.search);
let index=params.get("index");

let existing_list = localStorage.getItem("resume_list");
let existing_data = JSON.parse(existing_list);
let resumeObj=existing_data[index];
console.log(existing_data)
document.getElementById("new_name").innerHTML=resumeObj.name
document.getElementById("new_title").innerHTML=resumeObj.title
document.getElementById("re_content").innerHTML=resumeObj.email
document.getElementById("re_contact").innerHTML=resumeObj.contact
// document.getElementById("re_content").innerHTML=resumeObj.email
let edu_li="";
for(let each of resumeObj.education){
    edu_li=edu_li+
`<div class="item" id="re_education">
                    <h4 class="degree">${each.course_name}</h4>
                    <h5 class="meta">${each.inst_name}</h5>
	                    <div class="time">${each.year_of_passed}</div>
                </div>`
}
document.getElementById("re_education").innerHTML=edu_li;

let languages_li = '';

for(let each of resumeObj.personal_details.languages){

    languages_li = languages_li +`<li > <span class="lang-desc">${each}</span></li>`
}
    
    document.getElementById("new_languages1").innerHTML = languages_li

    let hobbies_li = '';

    for(let each of resumeObj.personal_details.hobbies){
    
        hobbies_li = hobbies_li +`<li > <span class="lang-desc">${each}</span></li>`
    }
        
        document.getElementById("new_hobbies").innerHTML = hobbies_li
    
        let experi_li="";
        for(let each of resumeObj.experience){
            experi_li=experi_li+
        ` <div class="item" id="new_experience">
        <div class="meta">
            <div class="upper-row" >
                <h3 class="job-title">${each.position}</h3>
                <div class="time">${each.year}</div>
            </div><!--//upper-row-->
            <div class="company">${each.company_name}</div>
        </div><!--//meta-->
        <div class="details">
            <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.</p>  
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
        </div><!--//details-->
    </div>`
        } 
        document.getElementById("new_experience").innerHTML = experi_li

        let new_skills="";
        for(let each of resumeObj.skills){
            new_skills=new_skills+`<h3 class="level-title">${each}</h3>
            <div class="progress level-bar">
                <div class="progress-bar theme-progress-bar" role="progressbar" style="width: 99%" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
            </div> `
        }
        document.getElementById("new_skills").innerHTML = new_skills
    
        let project_li="";
        for(let each of resumeObj.project){
            project_li=project_li+
        `<div class="item" id="new_projects">
        <span class="project-title">  <span class="project-tagline">${each.project_name}. </span>
        
        <span class="project-title">  <span class="project-tagline">${each.organization}. </span>
        <span class="project-title">  <span class="project-tagline">${each.position}. </span>
    </div>`
        }
        document.getElementById("new_projects").innerHTML=project_li;