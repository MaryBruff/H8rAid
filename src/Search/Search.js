import React, { useState } from 'react';

function wikipediaSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        displaySearchResults(searchInput);
    };

    const displaySearchResults = (searchTerm) => {
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchTerm}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const filteredResults = data.query.search.filter(
                    (item) =>
                        item.title.toLowerCase().includes('controversy') ||
                        item.snippet.toLowerCase().includes('controversy') ||
                        item.title.toLowerCase().includes('abuse') ||
                        item.snippet.toLowerCase().includes('conviction')
                );
                setResults(filteredResults);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Search on Wikipedia"
                />
                <button type="submit">Search</button>
            </form>

            <div id="resultsList">
                {results.length > 0 && (
                    <>
                        <h2>Search Results for {searchInput}</h2>
                        {results.map((item) => (
                            <div className="resultItem" key={item.pageid}>
                                <h3 className="resultTitle">
                                    <a
                                        href={`https://en.wikipedia.org/wiki/${item.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className="resultSnippet">
                                    <a
                                        href={`https://en.wikipedia.org/wiki/${item.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.snippet}
                                    </a>
                                </p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default wikipediaSearch