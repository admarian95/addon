const forgotPassword = () => {

    const verify = ()=> {
         verifyUserandSendMail();
    }
        const verifyUserandSendMail = () => {
            let email = document.getElementById('email').value;
            console.log(email)
            fetch('http://localhost:3000' + '/forgotPwdTempStringCreate'
                , {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                }).then(res => res.json()).then(data => {
                    alert(data.message);
                }).catch(err => {
                    alert(err);
                });
        }
    return (
        <div class="container">
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" />
        </div>
        <button type="submit" id="verify" class="btn btn-primary" onClick={verify}>Verify</button>
    </div>
    )
}
export default forgotPassword