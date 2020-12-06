let callMeForm = document.querySelector('.call-me-form');
// console.log(callMeForm);
document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let article = document.querySelector('.articles');
    article.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `<div class="col-4">
        <div class="card">
            <img class="card-img-top" src="${post.imageUrl}" alt="${post.title}">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/big-ben.html" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
    article.insertAdjacentHTML('beforeEnd', postHTML);
    
    })

})

callMeForm.addEventListener('submit', function(e){
    e.preventDefault();
    let callmeInp = callMeForm.querySelector('input');
    fetch('http://localhost:3000/callback-requests/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            phoneNumber: callmeInp.value
        })
    }).then((resp) => resp.text())
    .then(() => alert('we will call you back as soon as possible'))
})