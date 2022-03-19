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
    handleHeader();
    const details = document.getElementById('details');

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('column', 'center');

    mainDiv.appendChild(createTitle( jsonResponse.original_title));

    mainDiv.appendChild(createBackdrop(jsonResponse.backdrop));

    mainDiv.appendChild(createOverview(jsonResponse.plot_overview));

    details.appendChild(mainDiv);

    document.getElementById('results').style.display = 'none';
}

function handleHeader () {
    document.getElementById('search-title').style.display = 'none';
    document.getElementById('buttons-search').style.display = 'none';
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