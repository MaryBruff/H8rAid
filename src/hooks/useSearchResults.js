import { useState, useEffect } from "react";

const useSearchResults = () => {
  const [initialResults, setInitialResults] = useState({});
  const [page, setPage] = useState([]);
  const [controversies, setControversies] = useState([]);

  // ... (Logic for displaySearchResults)
  async function displaySearchResults(searchTerm) {
    const url = "https://en.wikipedia.org/w/api.php?";
    let params = {
      action: "query",
      list: "search",
      format: "json",
      origin: "*",
      srlimit: 20,
      srsearch: searchTerm,
    };

    await fetch(url + new URLSearchParams(params).toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Sets the state of the initial results to the first result of the search (i.e. Rush Limbaugh)
        setInitialResults(data.query.search[0]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  useEffect(() => {
    // Effect for updating 'page' state
    if (initialResults.pageid) {
      const url = "https://en.wikipedia.org/w/api.php?";
      let params = {
        action: "parse",
        prop: "sections",
        format: "json",
        origin: "*",
        pageid: initialResults.pageid,
      };
      fetch(url + new URLSearchParams(params).toString())
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPage(data.parse.sections);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [initialResults]);

  useEffect(() => {
    // Effect for updating 'controversies' state
    const words = [
      "Controversies",
      "Controversy",
      "Hoax",
      "Criticism",
      "Scandal",
      "Legal Issues",
      "Conspiracy",
      "Arrest",
      "Allegation",
      "Allegations",
      "Dispute",
      "Disputed",
      "Abuse",
      "Criminal",
      "Banned",
      "Theft",
      "Imprisonment",
      "Censorship",
      "Censored",
      "Ban",
      "Affair",
      "Controversial",
      "Rehabilitation",
      "Rehab",
      "Scam",
      "Fraud",
    ];
    // This function will find the sections that contain the words in the words array
    function findMatchingSections(page, words) {
      const lowerCaseWords = words.map((word) => word.toLowerCase());
      return page.filter((section) => {
        const titleLower = section.line.toLowerCase();
        return lowerCaseWords.some((word) => titleLower.includes(word));
      });
    }
    const matchingSections = findMatchingSections(page, words);
    // This function will fetch the data for the matching sections
    if (matchingSections.length > 0) {
      const url = "https://en.wikipedia.org/w/api.php?";
      const fetchPromises = matchingSections.map((section) => {
        let params = {
          action: "parse",
          format: "json",
          origin: "*",
          pageid: initialResults.pageid,
          section: section.index,
        };
        return fetch(url + new URLSearchParams(params).toString())
          .then((response) =>
            response.ok ? response.json() : Promise.reject("Failed to load")
          )
          .catch((error) => console.error("Fetch error:", error));
      });
      // This Promise.all will set the state of controversies to the results of the fetchPromises
      Promise.all(fetchPromises)
        .then((results) => {
          setControversies(results.filter((result) => result != null));
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [page]);

  const triggerSearch = (searchTerm) => {
    // Logic to initiate search
    displaySearchResults(searchTerm);
  };

  return { initialResults, controversies, triggerSearch };
};

export default useSearchResults;
