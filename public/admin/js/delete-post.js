let articleBlock = document.querySelector('.articles');

articleBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-remove'))
    {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        // console.log(id);
        fetch('http://localhost:3000/posts/' + id, {
            method:'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})