(function(document, window){
    'use strict';

    var photosetId = '72157626579923453',
        imagesPerPage = 9,
        page = 1,
        imagesShown,
        index = 0,
        scrollTimeout,
        scrollPos,
        prvScrollPos,
        scrollHeight = document.documentElement.scrollHeight,
        clientHeight = document.documentElement.clientHeight;

    window.imgHash = {};

    activate();

    function activate(){
        initEventListeners();
        flickrService.getPhotoset(photosetId, 1, imagesPerPage)
            .then(initImageHash, toast.error);
    }

    function initEventListeners(){
        document.getElementById('modal-backdrop').addEventListener('click', closeModal);
        document.getElementById('modal-backdrop').addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);

        document.getElementById('btn-left').addEventListener('click', prevImage);
        document.getElementById('btn-right').addEventListener('click', nextImage);
        document.getElementById('modal-img-element').addEventListener('click', function(e){ event.stopPropagation() });

        document.getElementById('btn-load-more').addEventListener('click', loadMore);
        window.addEventListener('scroll', onScroll);
        // window.onscroll = function(e) {
        //     onScroll(e);
        // }

        // document.ontouchmove = function(e) {
        //     onScroll(e);
        // }

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

    function onScroll(){
        console.log('hit it');
        prvScrollPos = scrollPos;

        scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTimeout) {
            window.clearTimeout(scrollTimeout);
        }

        scrollTimeout = window.setTimeout(function (){
            console.log(scrollHeight, scrollPos, clientHeight)
            if (scrollHeight - (scrollPos + clientHeight) < 200) {
                console.log('rock bottom mofo')
            }
        }, 250);
        //todo - settimeout for the scroller?
        console.log(prvScrollPos, scrollPos);
        if (prvScrollPos === scrollPos) { return }  

        
    }

    function loadMore(){
        page++;
        imagesShown = imagesPerPage * page;

        flickrService.getPhotoset(photosetId, 1, imagesShown)
            .then(initImageHash, toast.error);
    }

    function initImageHash(data){
        var index = 0;

        data.photoset.photo.forEach(function(image){
            if (!window.imgHash[index]){
                window.imgHash[index] = image;
                document.getElementById('gallery').appendChild(domUtilityService.initImgLink(image, index));
            }

            index++;
        });

        if (data.photoset.photo.length >= data.photoset.total) {
            document.getElementById('btn-load-more').style.display = 'none';
            document.getElementById('all-loaded').style.display = 'block';
        }
    }

    function prevImage(event){
        var imgUrl;

        if (window.currentImage > 0) {
            window.currentImage--;

            imageUtilityService.loadImage(
                flickrService.getImageUrl(window.imgHash[window.currentImage], 2),
                document.getElementById('modal-img-element')
            ).catch(toast.error);

            document.getElementById('modal-img-title').innerText = window.imgHash[window.currentImage].title;
        } else {
            toast.info('That\'s all we\'ve got! This is the first image.');
        }
        
        if (event){ event.stopPropagation() }
    }

    function nextImage(event){
        console.log(imagesShown);
        if (window.currentImage < (imagesShown - 1)) {
            window.currentImage++;

            imageUtilityService.loadImage(
                flickrService.getImageUrl(window.imgHash[window.currentImage], 2),
                document.getElementById('modal-img-element')
            ).catch(toast.error);

            document.getElementById('modal-img-title').innerText = window.imgHash[window.currentImage].title;
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
        document.getElementById('modal-img-element').src = '';
        document.body.className = '';
        window.currentImage = null;
    }

})(document, window);