const apiEndPointTitleDetails = `https://api.watchmode.com/v1/title/[TITLE_ID]/details/?apiKey=${API_KEY}&append_to_response=sources`;


async function seeMoreTitle (idTitle) {
    const response = await fetch(apiEndPointTitleDetails.replace('[TITLE_ID]', idTitle));
    await validateReturnDetails(response); 
}

async function validateReturnDetails(response) {
    if (response.status === 200) {
        const jsonResponse = await response.json();
        createScreenDetails(jsonResponse);
    }
}

function createScreenDetails(jsonResponse) {
    handleElementsInDetails();

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('column', 'center');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('row', 'center');

    titleDiv.appendChild(createTitle(jsonResponse.original_title));

    titleDiv.appendChild(createStarRating());

    titleDiv.appendChild(createRating(jsonResponse.user_rating));

    mainDiv.appendChild(titleDiv);

    mainDiv.appendChild(createBackdrop(jsonResponse.backdrop));

    mainDiv.appendChild(createOverview(jsonResponse.plot_overview));

    document.getElementById('details').appendChild(mainDiv);
}

function handleElementsInDetails () {
    document.getElementById('search-title').style.display = 'none';
    document.getElementById('buttons-search').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('back-screen').style.display = 'block';
    const details = document.getElementById('details');
    details.children = removeChildrenElement(details.children);
    details.style.display = 'block';
}

function createTitle (titleResponse) {
    const title = document.createElement('span');
    title.innerHTML = titleResponse;
    title.style.fontSize = '2rem';
    return title;
}

function createBackdrop (backdropResponse) {
    const backdrop = document.createElement('img');
    backdrop.src = backdropResponse;
    backdrop.style.width = '50%';
    return backdrop;
}

function createOverview (overviewResponse) {
    const overview = document.createElement('span');
    overview.innerHTML = overviewResponse;
    overview.style.margin = '2rem';
    return overview;
}

function createStarRating () {
    const star = document.createElement('img');
    star.src = './Images/star.png';
    star.style.width = '2rem';
    return star;
}

function createRating (ratingResponse) {
    const rating = document.createElement('span');
    rating.innerHTML = `${ratingResponse}/10`;
    return rating;
}


function backScreen() {
    document.getElementById('search-title').style.display = 'block';
    document.getElementById('buttons-search').style.display = 'block';
    document.getElementById('results').style.display = 'block';
    document.getElementById('details').style.display = 'none';
    document.getElementById('back-screen').style.display = 'none';
}