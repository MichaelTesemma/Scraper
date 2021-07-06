const request = require("request");
const cheerio = require("cheerio");

const url = "http://localhost/blog";

request.get(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    //"i" is the number of the element, "el" is the element itself

    let titleUrlList = [];
    links = [
      "http://localhost/blog/post.html",
      "http://localhost/blog/post1.html",
      "http://localhost/blog/post2.html",
      "http://localhost/blog/post3.html",
    ];
    newLink = [];
    console.log(newLink);
    $(".post-preview").each((i, el) => {
      const title = $(el).find(".post-title").text().replace(/\s\s+/g, ""); //".replace" is used to get rid of unnesesary white spaces
      const link = $(el).find("a").attr("href"); //Pulling out the links from the elements
      const date = $(el).find(".post-meta").text().replace(/,/, "").slice(53); //Slicing out 52 characters (the posted by bits), and only displaying the date
      const newUrl = `${url}/${link}`;
      titleUrlList.push(newUrl);
      console.log(`${title} | ${newUrl} | ${date}`);
    });

    // Searching the stored array with a linear search method to avoid redundant scraping by
    //pushing the links that are not mututal in both arrays to the newLink array
    function linearSearch(array, array1, array2) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] != array1[i]) {
          array2.push(array[i]);
        }
      }
      return "All items match";
    }
    console.log(linearSearch(links, titleUrlList, newLink), newLink);

    // Trying to implement a binary search if the array gets too long(gets hung for some reason..). WORK ON IT LATER!!!!!

    function binarySearch(array, n) {
      var lowIndex = 0,
        highIndex = array.length - 1;

      while (lowIndex <= highIndex) {
        var midIndex = Math.floor((highIndex + lowIndex) / 2);
        if (array[midIndex] == n) {
          return midIndex;
        } else if (n > array[midIndex]) {
          lowIndex = midIndex;
        } else {
          highIndex = midIndex;
        }
      }
      return -1;
    }
    console.log("Loading..." + binarySearch(titleUrlList.sort(), links)); // true
  } else
    (error) => {
      throw error;
    };
});
