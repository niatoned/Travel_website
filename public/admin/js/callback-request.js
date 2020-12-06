async function getRequests(){
    return await fetch('http://localhost:3000/callback-requests')
        .then((response) => response.json())
        .then((data) => data);
}