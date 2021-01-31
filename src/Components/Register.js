

const Register = () => {

    const submit = (e)=> {
        e.preventDefault();
        let email = document.getElementById('email');
        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let password = document.getElementById('password');
        let btn = document.getElementById('register');
        let ip = document.querySelectorAll('input');
        console.log(Array.from(ip))
        sendMail(email,firstName,lastName,password,ip);
    }

    const sendMail = (email,firstName,lastName,password,ip) => {
        let baseUrl = 'http://localhost:3000';
        email = email.value;
        firstName = firstName.value;
        lastName = lastName.value;
        password = password.value;
        fetch(baseUrl + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email,firstName,lastName,password})
        }).then(res => res.json()).then(data => {
            alert(data.message);
            Array.from(ip).forEach(el=>{
            el.value ='';
            })
        }).catch(err => alert(err));
    }
    return (
        <form onSubmit={submit}>
            <div class="container">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="First Name" />
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Last Name" />
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter Password" />
                </div>
            </div>
            <button type="submit" id="register" class="btn btn-primary">Register</button>
        </form>
    )
}

export default Register