//import {articles_url, country_code, category, _api_key} from '../config/rest_config';
import {articles_url, country_code, _api_key} from '../config/rest_config';
//Get articles from https://newsapi.org/v2/top-headlines
// API REST:

export async function getArticles(category){

  var urlArticles= `${articles_url}?country=${country_code}&category=${category}`;

  try{
      let articles= await fetch(urlArticles, {
        headers: { 'X-API-KEY': _api_key}
      });
      /*
      
      let articles= await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0c95bc288e6c48a8bd5a6c35846c17b2');*/

      let result= await articles.json();
      articles= null;

      return result.articles;
  }
  catch(error){
    throw error;
  }
}