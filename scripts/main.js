(function(document, window){
    'use strict';

    var req = new XMLHttpRequest(),
        imgHash,
        data, 
        gallery,
        imgContainer,
        imgElement,
        currentImage;

    activate();

    function activate(){
        document.getElementById('modal-backdrop').addEventListener('click', onModalBackdropClick);
        document.getElementById('btn-left').addEventListener('click', onBtnLeftClick);
        document.getElementById('btn-right').addEventListener('click', onBtnRightClick);

        getPhotoset();
    }

    function getPhotoset() {
        req.onreadystatechange = function () {
            //if (req.readyState != 4 || req.status != 200) return;

            //TODO - replace mockdata call once testing externally
            data = getMockData();
            console.log(data);

            initImageHash();
        };

        req.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=795fbda7905c92aa84585d5f0bdd47b2&per_page=10&format=json&nojsoncallback=1&photoset_id=72157626579923453", true);
    }
    

    function initImageHash(){
        imgHash = {};
        var index = 0;
        data.photoset.photo.forEach(function(image){
            // imgHash[image.id] = image;
            imgHash[index] = image;
            document.getElementById('gallery').appendChild(initImgContainer(image, index));
            index++;
        });

        console.log(imgHash);
    }

    function initImgContainer(image, index) {
        var imgContainer = document.createElement('div');

        imgContainer.className = 'img-container';
        imgContainer.appendChild(initImgLink(image, index));

        return imgContainer;
    }

    function initImgLink(image, index){
        var imgLink = document.createElement('a');
        
        imgLink.className = 'img-link';
        imgLink.addEventListener('click', function(){ onImgClick(index) });
        imgLink.appendChild(initImgElement(image));

        return imgLink;
    }

    function initImgElement(image){
        var imgElement = document.createElement('img');

        imgElement.alt = image.title;
        imgElement.title = image.title;
        imgElement.className = 'img-element';
        imgElement.height = '150';
        imgElement.width = '150';
        imgElement.src = getImageUrl(image, true);

        return imgElement;
    }

    function getImageUrl(image, thumbnail){
        return 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + (thumbnail ? '_q' : '') + '.jpg';
    }

    function onImgClick(imgId){
        //todo - repopulate all lightbox info with current image from hash
        //todo - make lightbox visible
        //todo - make backdrop visible
        console.log('imgId', imgId);
        document.getElementById('modal-backdrop').style.display = 'block';
        // document.getElementById('modal').style.display = 'block';
        currentImage = imgId;
        loadImage();
    }

    function onBtnLeftClick(){
        console.log('left');
        currentImage--;
        loadImage();
        event.stopPropagation();
    }

    function onBtnRightClick(){
        console.log('right');
        currentImage++;
        loadImage();
        event.stopPropagation();
    }

    function loadImage(){
        console.log('imageUrl', imgHash[currentImage]);
        document.getElementById('modal-img-element').src = getImageUrl(imgHash[currentImage]);
    }

    function onModalBackdropClick(){
        //Todo - add transitions/fade
        document.getElementById('modal-backdrop').style.display = 'none';
        // document.getElementById('modal').style.display = 'none';
    }

    

    function getMockData(){
        return {
        "photoset": {
            "id": "72157626579923453",
            "primary": "5713357208",
            "owner": "30966612@N02",
            "ownername": "dottie gale",
            "photo": [
            {
                "id": "5713357208",
                "secret": "a164f169c6",
                "server": "3492",
                "farm": 4,
                "title": "49320001",
                "isprimary": "1",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5713357308",
                "secret": "62e7bfd8f1",
                "server": "2364",
                "farm": 3,
                "title": "49320002",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5712796377",
                "secret": "27deb48f69",
                "server": "3622",
                "farm": 4,
                "title": "49320005",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5712796471",
                "secret": "93c26331f4",
                "server": "2215",
                "farm": 3,
                "title": "49320006",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5712796591",
                "secret": "e54e4f24e2",
                "server": "2723",
                "farm": 3,
                "title": "49320007",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5712796761",
                "secret": "1d5675bcca",
                "server": "2026",
                "farm": 3,
                "title": "49320009",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5713357952",
                "secret": "940cf2fb26",
                "server": "2194",
                "farm": 3,
                "title": "49320010",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5713358054",
                "secret": "14f1a2434c",
                "server": "2302",
                "farm": 3,
                "title": "49320014",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5713358170",
                "secret": "d010fb1302",
                "server": "3640",
                "farm": 4,
                "title": "49320011",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },
            {
                "id": "5713358278",
                "secret": "69f0929361",
                "server": "3013",
                "farm": 4,
                "title": "49320013",
                "isprimary": "0",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            }
            ],
            "page": 1,
            "per_page": "10",
            "perpage": "10",
            "pages": 5,
            "total": "47",
            "title": "Thailand Trip - 2010"
        },
        "stat": "ok"
        }
    }

    
})(document, window);