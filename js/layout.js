function onScrollTop() {
    window.scrollTo(0, 0)
}

function onScrollBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight)
}
function onHiddenToolBar() {
    console.log('666')
}


function selectMenu(url){
    let encodeUrl = encodeURIComponent(url)
    window.location = url
}

