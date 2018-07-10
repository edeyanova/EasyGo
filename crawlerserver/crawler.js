var utils = require('./utils');
var cheerio = require('cheerio');

function searchURL(body, func) {
  const $ = cheerio.load(body);
    
    var $items = $('#js-list-product');
    $items = [$items[0]];
  
    $items = utils.children($items);
    $items = utils.filter($items, function(elem) {
      return elem.type === 'tag' && elem.attribs.class === 'list-product-item product_click ga_tour_code';
    });
    $items = utils.map($items, function(elem) {
      return elem.attribs['data-href'];
    });
    
    var numberOfUrls = $items.length;
    var processedUrls = 0;
    var descriptions = [];

    for (var i = 0; i < numberOfUrls; i++) {
      utils.crawler($items[i], searchDesc, func);
    }

    function searchDesc(body, func, url) {
      const $ = cheerio.load(body);
      
      var $items = $('.bt_overview_left');
      $items = [$items[0]];
    
      $items = utils.children($items);
      $items = utils.filter($items, function(elem) {
        return elem.type === 'tag' && elem.attribs.class === 'js-show-more-desc';
      });
    
      $items = utils.children($items);
      $items = utils.filter($items, function(elem) {
        return elem.type === 'tag' && elem.attribs.class === 'bt_hightlights';
      });
    
      $items = utils.children($items);
      $items = utils.filter($items, function(elem) {
        return elem.type === 'tag' && elem.name === 'ul';
      });
    
      $items = utils.children($items);
      $items = utils.filter($items, function(elem) {
        return elem.type === 'tag' && elem.name === 'li';
      });
    
      $items = utils.children($items);
      $items = utils.map($items, function(elem) {
        return elem.data;
      });
    
      processedUrls = processedUrls + 1;
      descriptions.push({
        url: url,
        description: $items
      });
    
      if (processedUrls === numberOfUrls)
      {
        func(descriptions);
      }
    }
}

module.exports = function(func) {
  utils.crawler('http://www.tours4fun.com/popular/small-group-tours/', searchURL, func);
}







