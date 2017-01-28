(function(document, window){
    'use strict';

    var photosetId = '72157626579923453',
        imagesPerPage = 20,
        index = 0;

    window.imgHash = {};

    activate();

    function activate(){
        initEventListeners();
        flickrService.getPhotoset(photosetId, 1, imagesPerPage)
            .then(initImageHash, toast.error);
    }

    function initEventListeners(){
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
        document.getElementById('btn-left').addEventListener('click', prevImage);
        document.getElementById('btn-right').addEventListener('click', nextImage);
        document.getElementById('modal-img-element').addEventListener('click', function(e){ event.stopPropagation() });

        document.addEventListener('keydown', function (e) {
            if (window.currentImage !== null){
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

    function initImageHash(data){        
        data.photoset.photo.forEach(function(image){
            window.imgHash[index] = image;
            document.getElementById('gallery').appendChild(domUtilityService.initImgContainer(image, index));
            index++;
        });
    }

    function prevImage(event){
        var imgUrl;

        if (window.currentImage > 0) {
            window.currentImage--;

            imageUtilityService.loadImage(
                flickrService.getImageUrl(window.imgHash[window.currentImage], 2),
                document.getElementById('modal-img-element')
            );
        } else {
            toast.info('That\'s all we\'ve got! This is the first image.');
        }
        
        if (event){ event.stopPropagation() }
    }

    function nextImage(event){
        if (window.currentImage < (imagesPerPage - 1)) {
            window.currentImage++;

            imageUtilityService.loadImage(
                flickrService.getImageUrl(window.imgHash[window.currentImage], 2),
                document.getElementById('modal-img-element')
            );
        } else {
            toast.info('We\'ve hit bedrock! This is the last image.');
        }

        if (event){ event.stopPropagation() }
    }

    function onModalImgElementClick() {
        if (event){ event.stopPropagation() }
    }

    function closeModal(){
        document.getElementById('modal-backdrop').style.display = 'none';
        document.body.className = '';
        window.currentImage = null;
    }

})(document, window);