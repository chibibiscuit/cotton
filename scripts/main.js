(function(document, window){
    'use strict';

    var photosetId = '72157626579923453',
        imagesPerPage = 12,
        page = 0,
        imagesShown,
        totalImages,
        scrollTimeout;

    window.imgHash = {};

    activate();

    function activate(){
        initEventListeners();
        loadPhotosetPage();
    }

    function initEventListeners(){
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
        document.getElementById('btn-left').addEventListener('click', prevImage);
        document.getElementById('btn-right').addEventListener('click', nextImage);
        document.getElementById('modal-img-element').addEventListener('click', function(e){ event.stopPropagation() });

        document.getElementById('modal-backdrop').addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);

        document.getElementById('btn-load-more').addEventListener('click', loadPhotosetPage);

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

    // Load Photos ---
    function loadPhotosetPage(){
        var promise = new Promise(function (resolve, reject) {
            page++;
            imagesShown = imagesPerPage * page;

            flickrService.getPhotoset(photosetId, 1, imagesShown)
                .then(function(data){
                    initImageHash(data);
                    resolve();
                }, toast.error);
        });

        return promise;
    }

    function initImageHash(data){
        var index = 0;

        totalImages = data.photoset.total;

        data.photoset.photo.forEach(function(image){
            if (!window.imgHash[index]){
                window.imgHash[index] = image;
                document.getElementById('gallery').appendChild(domUtilityService.initImgLink(image, index));
            }

            index++;
        });

        if (data.photoset.photo.length >= totalImages) {
            imagesShown = data.photoset.total;

            document.getElementById('btn-load-more').style.display = 'none';
            document.getElementById('all-loaded').style.display = 'block';

            window.removeEventListener('scroll', onScroll);
        }
    }

    // Modal Events ---
    function prevImage(event){
        if (window.currentImage > 0) {
            window.currentImage--;

            imageUtilityService.loadCurrentImageModal();
        } else {
            toast.info('That\'s all we\'ve got! This is the first image.');
        }
        
        if (event){ event.stopPropagation() }
    }

    function nextImage(event){
        if (window.currentImage < (totalImages - 1)) {
            window.currentImage++;

            if (!window.imgHash[window.currentImage]){
                loadPhotosetPage().then(imageUtilityService.loadCurrentImageModal);
            } else {
                imageUtilityService.loadCurrentImageModal();
            }
        } else {
            toast.info('We\'ve hit bedrock! This is the last image.');
        }

        if (event){ event.stopPropagation() }
    }

    function closeModal(){
        document.getElementById('modal-backdrop').style.display = 'none';
        document.getElementById('modal-img-element').src = '';
        document.body.className = '';
        window.currentImage = null;
    }

    // Infinite Scroll ---
    function onLoadMoreClick() {
        document.getElementById('btn-load-more').style.display = 'none';
        window.addEventListener('scroll', onScroll);
        // window.onscroll = function(e) {
        //     onScroll(e);
        // }

        // document.ontouchmove = function(e) {
        //     onScroll(e);
        // }

        loadPhotosetPage();
    }

    function onScroll(){
        var scrollHeight = document.documentElement.scrollHeight,
            clientHeight = document.documentElement.clientHeight,
            scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollHeight - (scrollPos + clientHeight) < 200){
            if (scrollTimeout) {
                window.clearTimeout(scrollTimeout);
            }

            scrollTimeout = window.setTimeout(loadPhotosetPage, 250);
        }
    }

})(document, window);