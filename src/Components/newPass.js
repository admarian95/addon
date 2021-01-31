

const newPass = () => {
    let flag = false;
    const user = window.location.pathname.split('/')[2];
    const verifyTempStringDB = (str, verify, setNewPassword, user) => {
        let tempString = document.getElementById('tempString').value;
        fetch('http://localhost:3000/' + user + '/tempStringVerify', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tempString })
        }).then(res => res.json()).then(data => {
            alert(data.message);
            if (data.message === 'verified') {
                flag = true;
                let div = document.querySelector('.is-inactive');
                div.classList.remove('is-inactive');
                setNewPassword.removeAttribute('disabled');
                verify.setAttribute('disabled', true);
                str.setAttribute('readOnly', true);
            }
        });
    }

    const verifyTempString = () => {
        debugger;
        let str = document.getElementById('tempString');
        let verify = document.getElementById('verify');
        let setNewPassword = document.getElementById('setNewPassword');
        verifyTempStringDB(str, verify, setNewPassword, user);
    }

    const createNewPassword = () => {
        if (flag === true) {
            let password = document.getElementById('email').value;
            console.log(user)
            fetch('http://localhost:3000' + '/createNewPassword', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password, user })
            }).then(res => res.json()).then(data => {
                alert(data.message);
                if (data.message === 'password updated') {
                    window.location.href = 'http://localhost:3001/Login';  // netlify url of login page
                }
            })
        }else{
            alert('Please verify the temp string first !')
        }
    }
    return (
        <div class="container">
            <div class="form-group">
                <label for="tempString">Enter tempString</label>
                <input type="text" class="form-control" id="tempString" placeholder="Enter temp string" />
            </div>
            <div class="form-group is-inactive">
                <label for="email">New Password</label>
                <input type="email" class="form-control" id="email" placeholder="Enter new Password" />
            </div>
            <button type="button" id="verify" class="btn btn-primary" onClick={verifyTempString}>Verify Temp String </button>
            <button type="button" id="setNewPassword" class="btn btn-primary" onClick={createNewPassword} >Set new Password </button>
        </div>
    )
}
export default newPass