

function menuClick(){
    let options = document.getElementById('options')
    console.log(options)
    if(options.style.display === "block"){
        options.style.display = "none";
    }else{
        options.style.display = "block"
    }
}

export default menuClick;