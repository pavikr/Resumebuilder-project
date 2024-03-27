

let myResume={
    skills:[],
    personal_details:{
      languages:[],
      hobbies:[],
    },
    education:[
      {
        course_name:"",
        inst_name:"",
        percentage:"",
        year_of_passed:""

    },
    {
      course_name:"",
      inst_name:"",
      percentage:"",
      year_of_passed:""

  },
  {
    course_name:"",
    inst_name:"",
    percentage:"",
    year_of_passed:""

}

  ],
  experience:[
    {
      company_name:"",
      year:"",
      position:"",
      year_of_experience:""

  },
  {
    company_name:"",
    year:"",
    Position:"",
    year_of_experience:""
},
  ] , 
  project:[
    {
    project_name:"",
    duration:"",
    organization:"",
    team_size:"",
    description:""
  },
  {
    project_name:"",
    duration:"",
    organization:"",
    team_size:"",
    description:""
  }
]
}

function gen(ele,key,p_key,index,c_key){
    // console.log(ele)
    // myResume.name=ele.value;
    // let name=document.getElementById("name").value;
    if(p_key){
  myResume[p_key][key]=ele.value;
    }
    
    if(ele.value==""){
      alert("please fill the field")
    }
    else if(c_key){
      myResume[key][index][c_key]=ele.value
      
    }
    else{
  myResume[key]=ele.value;
    }
  preview()
}
function preview(){
   
    // let name=document.getElementById("name").value;
    document.getElementById("code").innerHTML=JSON.stringify(myResume,null,4)
}
function AddArrValue(key,id){
    let value=document.getElementById(id).value;
    myResume[key].push(value)
    document.getElementById(id).value=""  
    preview()
} 
function ArrValue(key,id,pa_key){
  let value=document.getElementById(id).value;
  myResume[pa_key][key].push(value)
  document.getElementById(id).value=""  
  preview()
  
}


// let resumes=[];
// function save(){
//   resumes.push(myResume)
//   let data=JSON.stringify(resumes)
//   localStorage.setItem("localdata",data)
  
  
//   let input=localStorage.getItem("localdata")
//   // let datas=JSON.parse(input)
//   console.log(input)
// } 
// // function display(){
// //   let details=localStorage.getItem("localdata")
// //   if (details){
// //     let value=document.getElementById("key");
// //     value.innerHTML=details;
// //     console.log(details)
    
// //   }
// // }

// function login(){
// if(!localStorage.getItem("resume_list")){//if we get the item in not in localstorage
//     let data=localStorage.setItem("resume_list",JSON.stringify([]));//then set resume list datas in localstorage
// // let details=JSON.stringify(myResume)
// // let data=[...resumes,...myResume]
// }
// let existing_list=localStorage.getItem("resume_list");//once check the condition then get list to localstorage
// let existing_data=JSON.parse(existing_list);//convet string to object
// let detail=[...existing_data,myResume];// add myResume in exiting data(add the list)
// console.log(detail)
// localStorage.setItem("resume_list",JSON.stringify(detail))//after add list then set list in localstorage
// window.location="list.html";// then move to nextpage.
// // alert(1)

// }

// function resumeData(){
//   let existing_list=localStorage.getItem("resume_list");
//   let existing_data=JSON.parse(existing_list);
//   let renderHTML="";//take empty string
//   for (let each in existing_data){
//     renderHTML=renderHTML+ `<li><a href="view.html?index=${each}">${existing_data[each].title}</a>   <button onclick="deleteInput('${each}')">delete</button>
//     <a href="edit.html?index=${each}"><button>edit</button></a></li>` 
// }
// document.getElementById("list").innerHTML=renderHTML//ul id 
// }

  // document.getElementById("new").innerHTML
  // renderHTML=renderHTML+ $parse{existing_data}
function deleteInput(key){
  let resume=[]
  let existing_list=localStorage.getItem("resume_list");
  let existing_data=JSON.parse(existing_list);
  for (let each in existing_data){
    if(each!=key){
    resume.push(existing_data[each])
      console.log(resume)
    }
    
  }
  localStorage.setItem("resume_list",JSON.stringify(resume))
  window.location="list.html"
  
  }
  // function edit(){
  //   let existing_list=localStorage.getItem("resume_list");
  //   let existing_data=JSON.parse(existing_list);
  //   document.getElementById("title")=existing_data[index]
  // }
  
  
