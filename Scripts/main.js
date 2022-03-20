function init () { 
    addEventEnterSearchInput();
    validateDarkModeByHour();
}

function validateDarkModeByHour () {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour <= 4) {
        const body = document.getElementsByTagName('body');
        body[0].classList.add('dark-mode');
    }
}

function addEventEnterSearchInput () {
    const search = document.getElementById('search-title');
    search.addEventListener('keydown', function (e) {
        if (e.code === 'Enter') { 
            searchTitle();
        }
    });    
}

function removeChildrenElement (children) {
    for (child of children){
        child.remove();
    }

    if ( children.length > 0) {
        removeChildrenElement(children);
    }

    return children;
}

function reloadScreen () {
    location.reload();
}