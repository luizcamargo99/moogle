const apiEndPointSearch = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=[TEXT_SEARCH]`;

async function searchTitle () {
    const textField = document.getElementById('search-title').value;
    const results = document.getElementById('results')
    results.style.display = 'none';
    results.children = removeChildrenElement(results.children);
    if (textField != "") {
        const response = await fetch(apiEndPointSearch.replace('[TEXT_SEARCH]', textField));
        await validateReturnSearch(response);
    }
}

async function validateReturnSearch(response){
    if (response.status === 200) {
        const jsonResponse = await response.json();
        createListResults(jsonResponse.title_results);
    }
}

function createListResults (listResults) {
    for (let index = 0; index < listResults.length; index++) {
        document.getElementById('results')
        .appendChild(createCardResult(listResults[index]));       
    }

    handleElementsAfterFetch();
}

function createCardResult(result) {
    const card = document.createElement('div');
    card.classList.add('column', 'results');

    const titleResult = document.createElement('a');
    titleResult.innerHTML = `${result.name}`;
    titleResult.addEventListener("click", function () {
        seeMoreTitle(result.id);
    });

    const yearResult = document.createElement('span');
    yearResult.innerHTML = `Year: ${result.year}`;     

    card.appendChild(titleResult);
    card.appendChild(yearResult);
    return card;
}

function handleElementsAfterFetch () {
    const searchScreen = document.getElementById('search-screen');
    searchScreen.classList.remove('column');
    searchScreen.classList.add('row');
    document.getElementById('logo').classList.add('result-logo');

    document.getElementById('results').style.display = 'block';
}
