import { useState } from "react";

export const CreateTicket = () => {

    let initialState = {
        email: '',
        severity: 0,
        description: ''
    };
    let baseURL = 'http://localhost:3001';
    const [ticket, setTicket] = useState(initialState);
    const createTicket = (e) => {
        e.preventDefault();
        fetch(baseURL + '/createTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...ticket  , status:'ACTIVE'})
        }).then(res => res.json()).then((data) => {
            setTicket(initialState);
            return console.log(data);
        });
    }

    const ticketFormation = (e) => {
        if (e.target.id === 'severity') {
            setTicket({ ...ticket, severity: e.target.value });
        } else if (e.target.id === 'description') {
            setTicket({ ...ticket, description: e.target.value });
        }
        else if (e.target.id === 'email') {
            setTicket({ ...ticket, email: e.target.value });
        }
    }
    return (
        <div>
            <h3>Enter Details :</h3>
            <form onSubmit={createTicket}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={ticketFormation} value={ticket.email} />
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="severity">Severity</label>
                    <input type="number" className="form-control" id="severity" placeholder="Enter no (1 to 5)" onChange={ticketFormation} value={ticket.severity} />
                </div>
                <div className="form-group">

                    <textarea style={{ width: '100%' }} id="description" onChange={ticketFormation} value={ticket.description} />
                    <label className="form-check-label" htmlFor="description">Description:</label>
                </div>
                <div className="form-group">

                    </div>
                <button type="submit" className="btn btn-success" onClick={() => console.log(ticket)}>Submit</button>
            </form>
        </div>
    )
}