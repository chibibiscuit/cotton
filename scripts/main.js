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

        req.onreadystatechange = function () {
            if (req.readyState == XMLHttpRequest.DONE) {
                data = JSON.parse(req.response);
                console.log(data);

                initImageHash();
            }
        };
        req.send(null);
    }
    

    function initImageHash(){
        imgHash = {};
        var index = 0;
        console.log(data.photoset);
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

    
})(document, window);