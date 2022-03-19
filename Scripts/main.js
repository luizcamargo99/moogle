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