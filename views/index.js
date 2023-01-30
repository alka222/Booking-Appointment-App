

const myForm = document.querySelector('#my-form');

const msg = document.querySelector('.msg');


const submitButton = document.getElementById("submit");

window.addEventListener("DOMContentLoaded", () => {

    axios.get("http://localhost:3000/user/users")
    .then((response) => {
        // console.log(response);
        for(var i=0; i<response.data.length; i++){

            showUserOnScreen(response.data[i]);  
        }       
    })
    .catch((err) => console.log(err))
   
});


    myForm.addEventListener('submit', onSubmit);

    function onSubmit(e){

        e.preventDefault();

        const nameInput= document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const numberInput= document.querySelector('#number');

        if(nameInput.value === '' || emailInput.value === ''){

            // alert('Please enter all fields');

            msg.classList.add('error');
            msg.innerHTML = 'Please enter all fields';
            setTimeout(() => msg.remove(), 3000);

        }

        else {

            let myObj = {
                name : nameInput.value,
                email : emailInput.value,
                number : numberInput.value
            }

            axios.post("http://localhost:3000/user/add-user", myObj)
            .then((response) => {
                console.log(response.data.userDetails);
                showUserOnScreen(response.data.userDetails);
                console.log(response);
            })
            .catch(err => {

                document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
                console.log(err)
            })

            nameInput.value ='';
            emailInput.value= '';
            numberInput.value= '';

        }

    }


    function showUserOnScreen(user){
console.log(user)
            const parentNode = document.querySelector('#users');

            const childNode = `<li id='${user.id}'> ${user.name} ${user.email} ${user.number}
                                <button onclick = updateUser('${user.id}','${user.name}','${user.email}','${user.number}')>Edit</button>
                                
                                <button onclick = deleteUser('${user.id}')>Delete</button>
                                </li>`

            parentNode.innerHTML = parentNode.innerHTML +  childNode;

    }


    function deleteUser(userId){
        
        axios.post(`http://localhost:3000/user/delete-user/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId);
        })
        .catch((err) => console.log(err))
    }

    function removeUserFromScreen(userId){

         const parentNode = document.getElementById('users');
         const childNodeToBeDeleted = document.getElementById(userId);

         if(childNodeToBeDeleted){

            parentNode.removeChild(childNodeToBeDeleted);
         }
    }



    function updateUser(userId, name, email, number){
    
            document.getElementById('name').value = name;
            document.getElementById('email').value = email;
            document.getElementById('number').value = number;

        
        deleteUser(userId);

    }