let articlesBlock = document.querySelector('.articles');
let updateForm = document.querySelector('#update-post-form');
let titleInput = document.querySelector('#update-title');
let textInput = document.querySelector('#update-description');
let id;

articlesBlock.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-edit'))
    {
        id = e.target.parentNode.parentNode.querySelector('.id').value;

        let postInfo = await fetch('http://localhost:3000/posts/' + id)
            .then((resp) => resp.json())
            .then((data) => data);

        titleInput.value = postInfo.title;
        textInput.value = postInfo.text;

        let articleTab = document.getElementById('v-pills-articles');
        articleTab.classList.remove('show');
        articleTab.classList.remove('active');
        let updateTab = document.getElementById('v-pills-update-post');
        updateTab.classList.add('show');
        updateTab.classList.add('active');
    }
})

updateForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetch('http://localhost:3000/posts/' + id,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:titleInput.value,
            text:textInput.value,
            description:textInput.value.substring(0, textInput.value.indexOf('.') +1 )
        })
    }).then((resp) => resp.text())
    .then(() => window.history.go())

})
