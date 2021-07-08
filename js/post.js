// 文章内标题
let directoriesHeaderlist = [...document.querySelectorAll('h1,h2,h3,h4,h5')]
// 目录导航的标题
let direcotries = directoriesHeaderlist.map((v) =>
    document.querySelector('#' + v.id + '-h')
)
// 当前阅览内容所属标题的目录导航标题元素
let currHeadDom = direcotries[0]
// 监听滚动事件
window.addEventListener('scroll', handleScroll)
// 滚动事件
function handleScroll() {
    let scrollTop = document.documentElement.scrollTop
    let len = directoriesHeaderlist.length
    for (let i = len - 1; i >= 0; i--) {
        let curr = directoriesHeaderlist[i]
        // 不用滚到顶部，据顶部200px即判断进入了某一个目录
        if (curr.offsetTop - 200 <= scrollTop) {
            activeLink(curr.id)
            break
        }
    }
}
function onJumpPart(id) {
    setTimeout(() => activeLink(id), 100)
}

function activeLink(id) {
    currHeadDom && currHeadDom.classList.remove('header-active')
    currHeadDom = direcotries.filter((curr) => `${id}-h` == curr.id)[0]
    currHeadDom && currHeadDom.classList.add('header-active')
}
