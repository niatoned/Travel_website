let addPostBtn = document.querySelector(".create-post-btn");
let logOutBtn = document.querySelector(".log-out-btn");
document.addEventListener('DOMContentLoaded', async function(){
    addPosts();
    addCallbackRequests();
    addEmails();

})

addPostBtn.addEventListener('click', function(){
    let articleTab = document.getElementById('v-pills-articles');
    articleTab.classList.remove('show');
    articleTab.classList.remove('active');
    let createTab = document.getElementById('v-pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');
})

async function addPosts(){
    let posts = await getPosts();
    let i = 1;
    let article = document.querySelector('.articles');
    article.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    article.insertAdjacentHTML('beforeEnd', postHTML);
    
    })
}

async function addCallbackRequests(){
    let requests = await getRequests();
    let i = 1;
    let requestBlock = document.querySelector('#v-pills-callback');
    requestBlock.innerHTML = '';
    requests.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${request.id}">
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    requestBlock.insertAdjacentHTML('beforeEnd', requestHTML);
    
    })
}

async function addEmails(){
    let emails = await getEmails();
    let i = 1;
    let emailBlock = document.querySelector('#v-pills-mails');
    emailBlock.innerHTML = '';
    emails.forEach((email) => {
        let emailHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${email.id}">
        <div class="name w30">${email.name}</div>
        <div class="email w30">${email.email}</div>
        <div class="date w30">${email.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
        <div class="text w100">${email.text}</div>
    </article>`;
    emailBlock.insertAdjacentHTML('beforeEnd', emailHTML);
    
    })
}

logOutBtn.addEventListener('click', function() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = "/";
})