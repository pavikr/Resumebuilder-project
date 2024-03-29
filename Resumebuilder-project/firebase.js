
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
    import { getFirestore,addDoc,collection,getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
 alert(1)
}
}
window.register=register
  


function logindata(){
    
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
        // if (!userdata) {
        //     alert("your email or password incorrect")
        // }
    })

  }
  window.logindata=logindata



    async function saveResume(){
        let existing_data=localStorage.getItem("userdatas")
        let parsed_data=JSON.parse(existing_data)
    
        const docRef=await addDoc(collection(db,"resumes"),{...myResume,userid:parsed_data.id});
        window.location=`list.html`;
        }
    
    window.saveResume=saveResume

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
        window.location=`reumebuilder.html`
    }

else {
    window.location="login.html"
}


})
}
window.getData=getData



function getdoc(){  
    let existing_data=localStorage.getItem("userdatas")
    let parsed_data=JSON.parse(existing_data)
    getDocs(query(collection(db,"resumes"),where("userid","==",parsed_data.id))).then(docSnap =>{
        // let params4= new URLSearchParams(document.location.search);
        // let resume_id=params4.get("resume_id");  
        let renderHTML="";
        // let list=document.getElementById('list').Value;  
        docSnap.forEach((doc)=>{
          
           
            
        // let eachResume=doc.data()
       renderHTML=renderHTML+`<li><a href="view.html?id=${doc.id}">${doc.data().title}</a><button type="button" onclick="testData('${doc.id}')">Delete</button>
       <a href="edit.html?id=${doc.id}"><button type="button">Edit</button></a></li>`
       
   

document.getElementById("list").innerHTML=renderHTML;
}) 
    }) 
    }
    getdoc()


// function deleteData(dataid){

//     deleteDoc(doc(db,"resumes",dataid));
// getdoc()
//     }
//     window.testData=deleteData

//     if(!localStorage.getItem("userdatas")){
//     location="login.html"
// }
