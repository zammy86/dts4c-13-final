// we need axios to make HTTP requests
const axios = require('axios');

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
// const ReactJSDOM = require('react-jsdom'); 
// First lets get some search data from News API

// Build the URL we are going request. This will get articles related to Apple and sort them newest first
// let url = ''

// Make the request with axios' get() function
export const getContent = async (url1) => {
   
        axios.get(url1).then(function(r2) {

            // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
            let dom = new JSDOM(r2.data, {
                 url: url1
            });
            // let dom  = ReactJSDOM(r2.data, {
            //     "url" : false
            // })
            // now pass the DOM document into readability to parse
            let article = new Readability(dom.window.document).parse();

            // Done! The article content is in the textContent property
            console.log(article.textContent);
        })

}
