var flickrService = new function(){
    var apiKey = '795fbda7905c92aa84585d5f0bdd47b2';

    var imageTypeHash = {
        1: '',      //medium
        2: '_b',    //full
        3: '_q'     //thumbnail
    }

    this.getPhotoset = function(photosetId, page, imagesPerPage) {
        var promise = new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&_page=' + page + '&per_page=' + imagesPerPage + '&format=json&nojsoncallback=1&photoset_id=' + photosetId, true);

            req.onreadystatechange = function () {
                if (req.readyState == XMLHttpRequest.DONE) {
                    if (req.status == 200){
                        resolve(JSON.parse(req.response));
                    } else {
                        reject(Error('There was a problem retrieving the photoset.'));
                    }
                }
            };

            req.onerror = function() {
                reject(Error('There was a problem retrieving the photoset.'));
            }
            req.send(null);
        });

        return promise;
    }

    this.getImageUrl = function(image, imageType){
        return 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + imageTypeHash[imageType] + '.jpg';
    }
};