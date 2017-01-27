(function(document, window){
    'use strict';

    var imagesPerPage = 10,
        imgHash,
        data, 
        gallery,
        imgContainer,
        imgDownload,
        currentImage = null;

    activate();

    function activate(){
        initEventListeners();
        getPhotoset();
    }

    function initEventListeners(){
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
        document.getElementById('btn-left').addEventListener('click', prevImage);
        document.getElementById('btn-right').addEventListener('click', nextImage);
        document.getElementById('modal-img-element').addEventListener('click', function(e){ event.stopPropagation() });

        document.addEventListener('keydown', function (e) {
            if (currentImage !== null){
                switch(e.keyCode){
                    case 37: //left arrow
                        prevImage();
                        break;
                    case 39: //right arrow
                        nextImage();
                        break;
                    case 27: //escape
                        closeModal();
                        break;
                }
            }
        }, false);
    }

    function getPhotoset() {
        var req = new XMLHttpRequest();

        req.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=795fbda7905c92aa84585d5f0bdd47b2&per_page=10&format=json&nojsoncallback=1&photoset_id=72157626579923453", true);

        req.setRequestHeader('User-Agent','XMLHTTP/1.0');
        req.onreadystatechange = function () {
            if (req.readyState != 4 || req.status != 200) return;

            //TODO - replace mockdata call once testing externally
            data = req.response; //getMockData();
            console.log(data);

            initImageHash();
        };
        req.send(null);
    }
    

    function initImageHash(){
        imgHash = {};
        var index = 0;
        data.photoset.photo.forEach(function(image){
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
        imgDownload = new Image();

        imgElement.className = 'img-element';
        imgElement.height = '150';
        imgElement.width = '150';

        imgDownload.src = getImageUrl(image, true);
        imgDownload.onload = function (){
            imgElement.src = this.src;
            imgElement.alt = image.title;
            imgElement.title = image.title;
            imgElement.style.opacity = 1;
        }

        return imgElement;
    }

    function getImageUrl(image, thumbnail){
        return 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + (thumbnail ? '' : '_b') + '.jpg';
    }

    function onImgClick(imgId){
        document.getElementById('modal-backdrop').style.display = 'block';
        currentImage = imgId;
        loadImage();
    }

    function prevImage(event){
        if (currentImage > 0) {
            currentImage--;
            loadImage();
        } else {
            toast('That\'s all we\'ve got! This is the first image.');
        }
        if (event){
            event.stopPropagation();
        }
    }

    function nextImage(event){
        if (currentImage < (imagesPerPage - 1)) {
            currentImage++;
            loadImage();
        } else {
            toast('We\'ve hit bedrock! This is the last image.');
        };

        if (event){
            event.stopPropagation();
        }
    }

    function loadImage(){
        imgDownload.onload = null;
        var imgElement = document.getElementById('modal-img-element');
        imgDownload = new Image();

        imgElement.src = '';
        imgElement.style.opacity = 0;
        

        imgDownload.src = getImageUrl(imgHash[currentImage]);
        imgDownload.onload = function (){
            imgElement.src = this.src;
            imgElement.style.opacity = 1;
        }
    }

    function onModalImgElementClick() {
        event.stopPropagation();
    }

    function closeModal(){
        document.getElementById('modal-backdrop').style.display = 'none';
        currentImage = null;
    }

    function toast(message){
        var toastElement = document.getElementById('toast');
        var toastDuration = 3000;
        toastElement.innerText = message;
        toastElement.style.opacity = 1;

        setTimeout(function(){
            toastElement.style.opacity = 0;
        }, toastDuration)
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