const apiEndPointSearch = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=[TEXT_SEARCH]`;


async function searchTitle () {
    const textField = document.getElementById('search-title').value;
    const response = await fetch(apiEndPointSearch.replace('[TEXT_SEARCH]', textField));
    await validateReturnSearch(response);
}

async function validateReturnSearch(response){
    if (response.status === 200) {
        const jsonResponse = await response.json();
        createListResults(jsonResponse.title_results);
    }
}

function createListResults (listResults) {
    const results = document.getElementById('results');    
    for (let index = 0; index < listResults.length; index++) {
        const result = listResults[index];
        const card = createCardResult(result); 
        results.appendChild(card);       
    }

    handleElementsAfterFetch();
}

function createCardResult(result) {
    const card = document.createElement('div');
    card.classList.add('column', 'results');

    const titleResult = document.createElement('a');
    const yearResult = document.createElement('span');

    titleResult.innerHTML = `${result.name}`;
    yearResult.innerHTML = `Year: ${result.year}`;
    
    titleResult.addEventListener("click", function () {
        seeMoreTitle(result.id);
    });

    card.appendChild(titleResult);
    card.appendChild(yearResult);
    return card;
}

function handleElementsAfterFetch () {
    document.getElementById('search-screen').classList.remove('column');
    document.getElementById('search-screen').classList.add('row');
    document.getElementById('logo').classList.add('result-logo');
}
