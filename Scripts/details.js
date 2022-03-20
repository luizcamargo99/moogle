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
    titleDiv.classList.add('column', 'center');

    titleDiv.appendChild(createTitle(jsonResponseDetails.original_title, 
        jsonResponseDetails.type === 'movie' ? `${jsonResponseDetails.year}`
        : `${jsonResponseDetails.year} - 
        ${jsonResponseDetails.end_year == null ? 'present' : jsonResponseDetails.end_year}` ));
    
    const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('row', 'center');

    ratingDiv.appendChild(createStarRating());

    ratingDiv.appendChild(createRating(jsonResponseDetails.user_rating));
    
    titleDiv.appendChild(ratingDiv);

    mainDiv.appendChild(titleDiv);

    mainDiv.appendChild(createBackdrop(jsonResponseDetails.backdrop));

    mainDiv.appendChild(createOverview(jsonResponseDetails.plot_overview));

    mainDiv.appendChild(createTitleSession('Top Cast'));

    mainDiv.appendChild(createCast(Array.from(jsonReponseCast).filter(x => x.type === 'Cast')
    .sort(function(a, b) {return b.episode_count - a.episode_count}).slice(0, 14)));

    if (jsonResponseDetails.trailer && jsonResponseDetails.trailer_thumbnail) {

        mainDiv.appendChild(createTitleSession('Trailer'));

        mainDiv.appendChild(createTrailer(jsonResponseDetails.trailer, jsonResponseDetails.trailer_thumbnail));
    }

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

function createTitle (titleResponse, year) {
    const title = document.createElement('span');
    title.innerHTML = `${titleResponse} (${year})` ;
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
    rating.innerHTML = `<b>${ratingResponse}</b>/10`;
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

function createTrailer (trailerUrl, trailerImage) {
    const divTrailer = document.createElement('div');
    divTrailer.classList.add('trailer');
    divTrailer.style.cursor = 'pointer';

    const buttonPlay = document.createElement('div');
    buttonPlay.classList.add('play');

    divTrailer.appendChild(buttonPlay);

    const linkTrailer = document.createElement('a');
    linkTrailer.href = trailerUrl;
    linkTrailer.target = 'blank';

    const trailer = document.createElement('img');
    trailer.src = trailerImage;
    trailer.style.opacity = .5;
    trailer.style.cursor = 'pointer';

    linkTrailer.appendChild(trailer)

    divTrailer.appendChild(linkTrailer);

    return divTrailer;
}

function createTitleSession (title) {
    const titleSession = document.createElement('h1');
    titleSession.innerHTML = title;
    return titleSession;
}

function backScreen() {
    document.getElementById('search-title').style.display = 'block';
    document.getElementById('buttons-search').style.display = 'block';
    document.getElementById('results').style.display = 'block';
    document.getElementById('details').style.display = 'none';
    document.getElementById('back-screen').style.display = 'none';
}
