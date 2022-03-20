const apiEndPointTitleDetails = `https://api.watchmode.com/v1/title/[TITLE_ID]/details/?apiKey=${API_KEY}&append_to_response=sources`;
const apiEndPointTitleCast = `https://api.watchmode.com/v1/title/[TITLE_ID]/cast-crew/?apiKey=${API_KEY}`

async function seeMoreTitle (idTitle) {
    const jsonResponseDetails = await getDetails(idTitle);
    const jsonReponseCast = await getCast(idTitle);
    createScreenDetails(jsonResponseDetails, jsonReponseCast);
}

async function getDetails(idTitle) {
    const response = await fetch(apiEndPointTitleDetails.replace('[TITLE_ID]', idTitle));
    return await validateReturnApi(response); 
}

async function getCast(idTitle) {
    const response = await fetch(apiEndPointTitleCast.replace('[TITLE_ID]', idTitle));
    return await validateReturnApi(response);
}

async function validateReturnApi(response) {
    if (response.status === 200)  return await response.json();
}

function createScreenDetails(jsonResponseDetails, jsonReponseCast) {
    handleElementsInDetails();

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('column', 'center');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('row', 'center');

    titleDiv.appendChild(createTitle(jsonResponseDetails.original_title));

    titleDiv.appendChild(createStarRating());

    titleDiv.appendChild(createRating(jsonResponseDetails.user_rating));

    mainDiv.appendChild(titleDiv);

    mainDiv.appendChild(createBackdrop(jsonResponseDetails.backdrop));

    mainDiv.appendChild(createOverview(jsonResponseDetails.plot_overview));

    const titleSession = document.createElement('h1');
    titleSession.innerHTML = 'Top Cast';
    mainDiv.appendChild(titleSession);

    mainDiv.appendChild(createCast(Array.from(jsonReponseCast).filter(x => x.type === 'Cast')
    .sort(function(a, b) {return b.episode_count - a.episode_count}).slice(0, 14)));

    console.log(jsonReponseCast);

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

function createCast (castResponse) {
    const castDiv = document.createElement('div');
    castDiv.classList.add('row', 'center');

    for (let index = 0; index < castResponse.length; index++) {
        const castItem = castResponse[index];
    
        const personDiv = document.createElement('div');
        personDiv.classList.add('column', 'gap-cast');

        const picPerson = document.createElement('img');
        picPerson.src = castItem.headshot_url;
        picPerson.classList.add('pic-cast');
        personDiv.appendChild(picPerson);

        const name = document.createElement('h4');
        name.innerHTML = castItem.full_name;
        personDiv.appendChild(name);

        const namePerson = document.createElement('span');
        namePerson.innerHTML = castItem.role;
        personDiv.appendChild(namePerson);

        castDiv.appendChild(personDiv);        
    }  

    return castDiv;    
}

function backScreen() {
    document.getElementById('search-title').style.display = 'block';
    document.getElementById('buttons-search').style.display = 'block';
    document.getElementById('results').style.display = 'block';
    document.getElementById('details').style.display = 'none';
    document.getElementById('back-screen').style.display = 'none';
}
