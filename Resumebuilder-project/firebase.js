
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
    import { getFirestore,addDoc,collection,getDocs,query,where,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBPPPJea_7wZNMX17I1WSKwhrpfxNEcABQ",
      authDomain: "resume-builder-aceb0.firebaseapp.com",
      projectId: "resume-builder-aceb0",
      storageBucket: "resume-builder-aceb0.appspot.com",
      messagingSenderId: "588683110495",
      appId: "1:588683110495:web:a19530bf7d9c17ce8d53ea"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db=getFirestore(app)
    
    let editData={};

    function getEditData(source){
        let urlParams = new URLSearchParams(document.location.search);
        let paramId = urlParams.get("id");

        getDocs(collection(db,"resumes")).then(docSnap =>{
            docSnap.forEach((doc)=>{
                if(paramId==doc.id){
                    let resumeData=doc.data();
                    editData= resumeData;

                    if(source=="view"){
                    getViewData(editData)
                    }
                    else if(source=="edit"){
                    editResume(editData)
                    } 
                   
                }
            })
        })

    }

    window.getEditData= getEditData;
    

async function register(){
   
    var data_name=document.getElementById("name1").value;
    var data_email=document.getElementById("email1").value;
    var data_password=document.getElementById("password1").value;
    if(data_name=="" ||  data_email=="" || data_password==""){
        alert("please fill the field")
    }
    else{
  await addDoc(collection(db,"register"),{
        name:data_name,
        email:data_email,
        password:data_password

        
    })
    
    // console.log(datname,email,password)
   
 window.location="login.html"
 alert("You are login successfully")
}
}
window.register=register
  


function logindata(){
    let params= new URLSearchParams(document.location.search);
    let id=params.get("id");

    
    getDocs(collection(db, "register")).then(logpage => {
        let email = document.getElementById("mail").value;
        let password = document.getElementById("pass").value;
        if (email == "" && password == "") {
            alert("please fill the details")
        }
        let userdata = false;
        logpage.forEach((each) => {
            let data = each.data();
            if (email == data.email && password == data.password) {
                userdata = {
                    mail: data.email,
                    id: each.id,
                    name: data.name
                }
                localStorage.setItem("userdatas", JSON.stringify(userdata))
                location = `resumesecurity.html?id=${each.id}`
                userdata = true
            }

        })
       
    })

  }
  window.logindata=logindata



    
function getData(){
    let params= new URLSearchParams(document.location.search);
    let id=params.get("id");

    getDocs(collection(db,"register")).then(docSnap=>{
let users=[];
docSnap.forEach((doc)=>{
    users.push({...doc.data(),id:doc.id})
});
console.log("Documents Data:",users);

let params= new URLSearchParams(document.location.search);
let firebaseid=params.get("id");
console.log(firebaseid);

let existing_data=localStorage.getItem("userdatas")
let parsed_data=JSON.parse(existing_data)


    if(parsed_data['id']==firebaseid){
        window.location="reumebuilder.html"
    }

else {
    window.location="login.html"
}


})
}
window.getData=getData


async function saveData(){
    let existing_data=localStorage.getItem("userdatas")
    let parsed_data=JSON.parse(existing_data)

    const docRef=await addDoc(collection(db,"resumes"),{...myResume,userid:parsed_data.id});
    window.location="list.html";
    }

window.saveData=saveData




function listData(){  
    let existing_data=localStorage.getItem("userdatas")
    let parsed_data=JSON.parse(existing_data)
    getDocs(query(collection(db,"resumes"),where("userid","==",parsed_data.id))).then(docSnap =>{
        // let params4= new URLSearchParams(document.location.search);
        // let resume_id=params4.get("resume_id");  
        let renderHTML="";
        // let list=document.getElementById('list').Value;  
        docSnap.forEach((doc)=>{
          
           
            
        // let eachResume=doc.data()
       renderHTML=renderHTML+`<tr><td><a href="view.html?id=${doc.id}">${doc.data().title}</a></td><td><button type="button" class="btn btn-danger" onclick="testData('${doc.id}')">Delete</button></td>
      <td> <a href="edit.html?id=${doc.id}"><button class="btn btn-info" type="button">Edit</button></a></td></tr>`
       
   

document.getElementById("list").innerHTML=renderHTML;
}) 
    }) 
    }
    
window.listData=listData

function deleteData(dataid){

    deleteDoc(doc(db,"resumes",dataid));
listData()
    }
    window.testData=deleteData

    
function getViewData(resumeData){
                 document.getElementById("titleview").innerHTML= editData.title;
                 document.getElementById("name").innerHTML= editData.name;
                 document.getElementById("place").innerHTML= editData.place;
                 document.getElementById("objectives").innerHTML= editData.objectives;
                 document.getElementById("contact").innerHTML= editData.contact;
                 document.getElementById("email").innerHTML=editData.email;
                 document.getElementById("fathername").innerHTML = editData.personal_details.fathername
                document.getElementById("mothername").innerHTML = editData.personal_details.mothername
                document.getElementById("gender").innerHTML = editData.personal_details.gender
                document.getElementById("address").innerHTML = editData.personal_details.Address
                document.getElementById("DOB").innerHTML = editData.personal_details.DOB
                document.getElementById("declaration").innerHTML = editData.declaration
               
                
                
    let trs="";
    for (let each of editData.education){
        trs=trs+`<tr><td>${each.course_name}</td>
            <td>${each.inst_name}</td>
            <td>${each.percentage}</td>
            <td>${each. year_of_passed}</td></tr>`
    }
    document.getElementById("trs").innerHTML=trs
    
    let input="";
    for (let each of editData.project){
        input=input+`<tr><td>${each.project_name}</td>
            <td>${each.duration}</td>
            <td>${each.position}</td>
            <td>${each.organization}</td></tr>`
    }
    document.getElementById("input").innerHTML=input

    let data="";
    for (let each of editData.experience){
        data=data+`<tr><td>${each.company_name}</td>
            <td>${each.year}</td>
            <td>${each.position}</td>
            <td>${each.year_of_experience}</td></tr>`
    }
    document.getElementById("data").innerHTML=data

    let list=""
    for(let each of editData.skills){
        list=list+`<li>${each}</li>`
    }
document.getElementById("skill").innerHTML=list


let hobby=""
for(let each of editData.personal_details.hobbies){
    hobby=hobby+`<li>${each}</li>`
    }
    document.getElementById("hobby").innerHTML=hobby
   

let language=""
for(let each of editData.personal_details.languages){
    language=language+`<li>${each}</li>`
     }
   document.getElementById("languages").innerHTML=language  
    }
    
window.getViewData=getViewData



   
   
     
    
function goToTemplate(template_id){
    let idparams= new URLSearchParams(document.location.search);
    let id1=idparams.get("id");
        if(template_id==1){
    window.location=`template_1/index.html?id=${id1}`
}
else if(template_id==2){
    window.location=`template_2/index.html?id=${id1}`
}
else if(template_id==3){
    window.location=`template_3/index.html?id=${id1}`
}
}
window.goToTemplate=goToTemplate

function logout(){
    localStorage.removeItem("userdatas")
    window.location="login.html"
}

    window.logout=logout

function addData(id){
    if(id=='skill_inputdata'){
    let create_add=document.createElement("input");
    create_add.setAttribute('type','text');
    create_add.setAttribute('class','skill');
    create_add.setAttribute('placeholder','Enter your skills');
    document.getElementById("skill_inputdata").appendChild(create_add);
    
}
 else if(id=="language_inputdata"){
    let create_add=document.createElement("input");
    create_add.setAttribute('type','text');
    create_add.setAttribute('class','language');
    create_add.setAttribute('placeholder','Enter your languages');
    document.getElementById("language_inputdata").appendChild(create_add)
    
    }
    else if(id=="hobby_inputdata"){
    let create_add=document.createElement("input");
    create_add.setAttribute('type','text');
    create_add.setAttribute('class','hobby');
    create_add.setAttribute('placeholder','Enter your hobbies');
    document.getElementById("hobby_inputdata").appendChild(create_add)
   
     }

}
window.addData=addData

// let params= new URLSearchParams(document.location.search);
        // let id=params.get("id");
        
        
//                 // editResume = editData;
function editResume(editData){
    document.getElementById("new").value = editData.title
    document.getElementById("name").value = editData.name
    document.getElementById("contact").value = editData.contact
    document.getElementById("place").value = editData.place
    document.getElementById("email").value = editData.email
    document.getElementById("objectives").value = editData.objectives
    document.getElementById("fathername").value = editData.personal_details.fathername
    document.getElementById("mothername").value = editData.personal_details.mothername
    document.getElementById("gender").value = editData.personal_details.gender
    document.getElementById("address").value = editData.personal_details.Address
    document.getElementById("DOB").value = editData.personal_details.DOB
    document.getElementById("declaration").value = editData.declaration


    
    // document.getElementById("skill").value = existing_data[index].skills[0];
    let list = ""
    for (const each of editData.skills) {
        list = list + `<input type="text" class="skill" value="${each}"/>`
       
    }
    document.getElementById("skill_inputdata").innerHTML = list;
   
   
    let language_data = "";
    for (let each of editData.personal_details.languages) {
        language_data = language_data + `<input type="text" class="language" value="${each}"></input>`
    }
    document.getElementById("language_inputdata").innerHTML = language_data
    
    
    let hobby_data = "";
    for (let each of editData.personal_details.hobbies) {
        hobby_data = hobby_data + `<input type="text" class="hobby" value="${each}"></input>`
    }
    document.getElementById("hobby_inputdata").innerHTML = hobby_data

    let education_detail = "";
    for (let each in editData.education) {
        education_detail = education_detail + `<tr>
           <td><input type="text"  value="${editData.education[each].course_name}" class="education-input" onkeyup="updateResume(this,${each},'course_name','education')"/></td>
           <td><input type="text"  value="${editData.education[each].inst_name}" class="education-input" onkeyup="updateResume(this,${each},'inst_name','education')"/></td>
           <td><input type="text"  value="${editData.education[each].percentage}" class="education-input"  onkeyup="updateResume(this,${each},'percentage','education')"/></td>
           <td><input type="text" value="${editData.education[each].year_of_passed}"  class="education-input"  onkeyup="updateResume(this,${each}, 'year_of_passed','education')"/></td>
           </tr>`
    }
    document.getElementById("education-data").innerHTML = education_detail

    let project_detail = "";
    for (let each in editData.project) {
        project_detail = project_detail + `<tr>
           <td><input type="text"  value="${editData.project[each].project_name}" class="project-input" onkeyup="updateResume(this,${each},'project_name','project' )"/></td>
           <td><input type="text"  value="${editData.project[each].duration}" class="project-input" onkeyup="updateResume(this,${each},'duration','project')"/></td>
           <td><input type="text"  value="${editData.project[each].position}" class="project-input" onkeyup="updateResume(this,${each},'position','project')"/></td>
           <td><input type="text" value="${editData.project[each].organization}"  class="project-input" onkeyup="updateResume(this,${each},'organization','project')"/></td>
           </tr>`
    }
    document.getElementById("project-data").innerHTML = project_detail

    let experience_detail = "";
    for (let each in editData.experience) {
        experience_detail = experience_detail + `<tr>
           <td><input type="text"  value="${editData.experience[each].company_name}" class="experience-input" onkeyup="updateResume(this,${each},'company_name','experience' )"/></td>
           <td><input type="text"  value="${editData.experience[each].year}" class="experience-input" onkeyup="updateResume(this,${each},'year','experience')"/></td>
           <td><input type="text"  value="${editData.experience[each].position}" class="experience-input" onkeyup="updateResume(this,${each},'position','experience')"/></td>
           <td><input type="number" value="${editData.experience[each].year_of_experience}"  class="experience-input" onkeyup="updateResume(this,${each},'year_of_experience','experience')"/></td>
           </tr>`
    }
    document.getElementById("experience-data").innerHTML = experience_detail
}
window.editResume=editResume
        

async function updatedata(){

let updated_title = document.getElementById("new").value;
let updated_name= document.getElementById("name").value;
let updated_email = document.getElementById("email").value;

let updated_contact = document.getElementById("contact").value;
let update_address=document.getElementById("address").value;
let updated_objectives = document.getElementById("objectives").value;
let updated_place = document.getElementById("place").value;
let updated_fathername=document.getElementById("fathername").value;
let updated_mothername=document.getElementById("mothername").value;
let updated_gender=document.getElementById("gender").value;
let updated_DOB =document.getElementById("DOB").value;
let update_skills=document.getElementsByClassName("skill");
let update_languages=document.getElementsByClassName("language");
let update_hobbies=document.getElementsByClassName("hobby");

let editskills=[];
for(const each of update_skills){
    editskills.push(each.value);
}

    let new_languages = []
    for (let update of update_languages) {
        new_languages.push(update.value)
        
    }
    let new_hobbies = []
    for (let update of update_hobbies) {
        new_hobbies.push(update.value)
        
    }
   

let params = new URLSearchParams(document.location.search);
let id =params.get("id");
await updateDoc(doc(db,"resumes",id),{
    
    title:updated_title,
    name:updated_name,
    contact:updated_contact,
    email:updated_email,
    objectives:updated_objectives,
    place:updated_place,
    personal_details:{
    fathername:updated_fathername,
    mothername:updated_mothername,
    languages:new_languages,
    hobbies:new_hobbies,
    gender:updated_gender,
    DOB:updated_DOB,   
    address:update_address
},
    skills:editskills,
    education:editData.education,
    project:editData.project,
    experience:editData.experience,
   

   

})
location="list.html"
}

window.updatedata=updatedata
       

    


function updateResume(ele, ele_index, key, par_key) {
    
 
     editData[par_key][ele_index][key]=ele.value;
     
  
//    console.log(ele, ele_index, key, par_key)
   console.log(editData)
}
window.updateResume=updateResume

    
  
function addNewData(id){
    if(id=="education-data"){
     let education_length=editData.education.length;
    let tbody=document.getElementById("education-data")
    let newdata=`<tr>
        <td> <input type="text" onkeyup="updateResume(this,${education_length},'course_name','education')"></td>
        <td> <input type="text" onkeyup="updateResume(this,${education_length},'inst_name','education')"></td>
        <td> <input type="number" onkeyup="updateResume(this,${education_length},'percentage','education')"></td>
        <td> <input type="number" onkeyup="updateResume(this,${education_length},'year_of_passed','education')"></td>
        </tr>`
        editData.education[education_length]={course_name:"",
        inst_name:"",
        percentage:"",
        year_of_passed:""}
    tbody.insertAdjacentHTML('beforeend',newdata)
    }



// function experienceaddData(){
    else if(id=="experience-data"){
    let experience_length=editData.experience.length
    let new_experience=document.getElementById("experience-data")
    let experience_newdata=`<tr>
        <td> <input type="text" onkeyup="updateResume(this,${experience_length},'company_name','experience')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${experience_length},'year','experience')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${experience_length},' position','experience')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${experience_length},'year_of_experience','experience')"/></td>
        </tr>`
    editData.experience[experience_length]={company_name:"",
                                                      year:"",
                                                      position:"",
                                                      year_of_experience:""}   
     new_experience.insertAdjacentHTML('beforeend',experience_newdata)                                                  
}


    else if(id=="project-data"){
    let project_length =editData.project.length
    let new_project=document.getElementById("project-data")
    let project_newdata=`<tr>
        <td> <input type="text" onkeyup="updateResume(this,${project_length},'project_name','project')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${project_length},'duration','project')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${project_length},' position','project')"/></td>
        <td> <input type="text" onkeyup="updateResume(this,${project_length},'organization','project')"/></td>
        </tr>`
    editData.project[project_length]={project_name:"",
                                     duration:"",
                                     position:"",
                                    organization:""}
     new_project.insertAdjacentHTML('beforeend',project_newdata)
   
    }
}
    window.addNewData=addNewData
    
